//Naheeda
import {User} from "../models/userSchema.js";
import { Booking } from "../models/bookingSchema.js";
import { generateToken } from "../utils/generateToken.js";
import passport from "passport";


//  Hilfsfunktionen zur Validierung
const formatAndValidateName = (name, field) => {
    name = name.trim();

    // Erlaubt Buchstaben (inkl. Umlaute), Leerzeichen & Bindestriche
    const regex = /^[A-Za-zÄÖÜäöüß\s-]+$/;

    if (!regex.test(name)) {
        throw {
            field,
            message: `${field === "vorname" ? "Vorname" : "Nachname"} darf nur Buchstaben, Leerzeichen oder Bindestriche enthalten.`,
        };
    }

    // Formatieren: Ersten Buchstaben groß, Rest klein (aber z. B. "Ali ibn Abi Talib" bleibt so)
    return name
        .split(" ")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join(" ");
};

const isValidPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regex.test(password)) {
        throw { field: "password", message: "Passwort muss mindestens 8 Zeichen lang sein und mindestens einen Großbuchstaben, einen Kleinbuchstaben, eine Zahl und ein Sonderzeichen enthalten." };
    }
};


const isValidPhoneNumber = (phoneNumber) => {
    const regex = /^\d{6,15}$/;
    if (!regex.test(phoneNumber)) {
        throw { field: "telefonnummer", message: "Ungültige Telefonnummer." };
    }
};

const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
        throw { field: "email", message: "Ungültige E-Mail-Adresse." };
    }
};

// Benutzer registrieren
const registerUser = async (req, res, next) => {
    try {
        let { vorname, nachname, email, password } = req.body;

        // Überprüfen, ob alle Felder ausgefüllt sind
        if (!vorname || !nachname || !email || !password) {
            return next(new Error("Alle Felder (Vorname, Nachname, E-Mail, Passwort) sind erforderlich."));
        }

        // Namen formatieren und validieren
      //  NEU
         vorname = formatAndValidateName(vorname, "vorname");
         nachname = formatAndValidateName(nachname, "nachname");

        isValidEmail(email);
        isValidPassword(password);

        // Prüfen, ob der Benutzer bereits existiert
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Diese E-Mail-Adresse wird bereits verwendet." });
        }

        // Neuen Benutzer erstellen
        const user = await User.create({ vorname, nachname, email, password });

        if (user) {
            // Token generieren
            const token = generateToken(user._id);

            // Cookie setzen
            res.cookie("jwt", token, { 
                httpOnly: true,
               // secure: process.env.NODE_ENV === "production",
                secure: true,
                sameSite: "strict",
                maxAge: 30 * 24 * 60 * 60 * 1000 // 30 Tage
            });

            // Erfolgreiche Registrierung
            return res.status(201).json({
                _id: user.id,
                vorname: user.vorname,
                nachname: user.nachname,
                email: user.email,
                token: token
            });
        }

        // Falls `user` aus irgendeinem Grund `null` oder `undefined` ist (was selten passiert)
        return res.status(500).json({ message: "Fehler beim Erstellen des Benutzers. Bitte später erneut versuchen." });

    } catch (error) {
        next(error);
    }
};


//  Benutzer Login
const authUser = async (req, res, next) => {
    console.log(" Eingehende Login-Daten:", req.body); // Debugging
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            console.log(" Fehlende Daten beim Login:", req.body);
            return res.status(400).json({ message: "Bitte E-Mail und Passwort eingeben." });
        }

        const user = await User.findOne({ email });

        if (!user || !(await user.matchPassword(password))) {
            return res.status(400).json({ message: "E-Mail oder Passwort ist falsch." });
        }
        const token = generateToken(user._id);
        res.cookie("jwt", token, {
        httpOnly: true, 
        // secure: process.env.NODE_ENV === "production", 
        secure:true,
        sameSite: "strict",
         maxAge: 30 * 24 * 60 * 60 * 1000
         });
         res.status(201).json({ 
            _id: user.id, 
            vorname: user.vorname, 
            nachname: user.nachname, 
            email: user.email,
            telefonnummer: user.telefonnummer,
            landesvorwahl: user.landesvorwahl,
            address: user.address,
            isAdmin: user.isAdmin,
            token: token
        });
    } catch (error) {
        next(error);
    }
};

// Benutzer Logout
const logoutUser = (req, res, next) => {
    try {
        res.cookie("jwt", "", { 
            httpOnly: true, 
            expires: new Date(0) 
        });
        res.json({ message: "Logout erfolgreich" });
    } catch (error) {
        next(error);
    }
};
//  Benutzerprofil abrufen
const getUserProfile = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Nicht autorisiert" });
        }
        res.json({
            _id: req.user._id,
            vorname: req.user.vorname,
            nachname: req.user.nachname,
            email: req.user.email,
            telefonnummer: req.user.telefonnummer,
            landesvorwahl: req.user.landesvorwahl,
            address: req.user.address,
            isAdmin: req.user.isAdmin,
        });
    } catch (error) {
        next(error);
    }
};


// Benutzerprofil aktualisieren
const updateUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            console.log(" Benutzer nicht gefunden!");
            return res.status(404).json({ message: "Benutzer nicht gefunden" });
        }
    

 
        const validationErrors = {};

        try {
            if (req.body.vorname) {
                req.body.vorname = formatAndValidateName(req.body.vorname, "vorname");
            }
        } catch (err) {
            validationErrors[err.field] = err.message;
        }

        try {
            if (req.body.nachname) {
                req.body.nachname = formatAndValidateName(req.body.nachname, "nachname");
            }
        } catch (err) {
            validationErrors[err.field] = err.message;
        }

        try {
            if (req.body.telefonnummer) {
                isValidPhoneNumber(req.body.telefonnummer);
            }
        } catch (err) {
            validationErrors[err.field] = err.message;
        }

        if (Object.keys(validationErrors).length > 0) {
            return res.status(400).json({ errors: validationErrors });
        }

        Object.assign(user, req.body);
        const updatedUser = await user.save();
        res.json({ message: "Profil aktualisiert.", user: updatedUser });
    } catch (error) {
        next(error);
    }
};

//  Alle Buchungen des eingeloggten Nutzers abrufen
const getUserBookings = async (req, res, next) => {
    try {
        if (!req.user || !req.user.email) {
            return res.status(401).json({ message: "Nicht autorisiert! Bitte erneut einloggen." });
        }

        console.log("📡 Suche Buchungen für:", req.user.email); // Debugging-Log

        const bookings = await Booking.find({ email: req.user.email });

        if (!bookings.length) {
            return res.status(200).json([]); //  Leeres Array statt Fehler senden
        }

        res.status(200).json(bookings);
    } catch (error) {
        console.error(" Fehler beim Abrufen der Buchungen:", error.message);
        res.status(500).json({ message: "Interner Serverfehler beim Laden der Buchungen" });
    }
};

//  Buchung stornieren
const cancelUserBooking = async (req, res, next) => {
    try {
        const { bookingNumber } = req.params;
        const booking = await Booking.findOne({ bookingNumber });

        if (!booking) {
            return res.status(404).json({ message: "Buchung nicht gefunden." });
        }
       // Überprüfung: Gehört die Buchung dem eingeloggten Nutzer?
       if (booking.email !== req.user.email) {
        return res.status(403).json({ message: "Du kannst nur deine eigenen Buchungen stornieren!" });
    }

        booking.status = "Canceled";
        await booking.save();

        res.status(200).json({ message: "Buchung storniert.", booking });
    } catch (error) {
        next(error);
    }
};

const adminCheck = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next(); //  Admin erlaubt
    } else {
        res.status(403).json({ message: " Zugriff verweigert. Nur für Admins." });
    }
};

// Google Auth starten
export const googleAuth = passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account" // 👈 Zwingt Google zur Kontenauswahl!
});

// Google Callback
export const googleCallback = (req, res, next) => {
    passport.authenticate("google", async (err, user, info) => {
      if (err || !user) {
        console.log("❌ Google Auth fehlgeschlagen oder abgebrochen.");
        return res.redirect("http://localhost:5173/auth?register=false&error=google_failed");
      }
  
      req.login(user, (loginErr) => {
        if (loginErr) {
          return res.redirect("http://localhost:5173/auth?register=false&error=google_failed");
        }
  
        const token = generateToken(user._id);
        res.cookie("jwt", token, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });
  
        return res.redirect("http://localhost:5173");
      });
    })(req, res, next);
  };
  


export const googleAuthSuccess = (req, res) => {
    try {
        if (!req.user) {
            // Authentifizierung fehlgeschlagen oder abgebrochen
            return res.redirect("http://localhost:5173/auth?register=false&error=google_failed");
        }

        const token = generateToken(req.user._id);
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        res.redirect("http://localhost:5173");
    } catch (error) {
        res.redirect("http://localhost:5173/auth?register=false&error=google_error");
    }
};

const logoutAndRedirectToGoogle = (req, res) => {
    res.clearCookie("jwt", {
        httpOnly: true,
        secure: true,
        sameSite: "strict"
    });

    // Danach zur Google-Auth weiterleiten
    res.redirect("/api/auth/google?prompt=select_account");
};




export { registerUser, authUser, logoutUser, getUserProfile, updateUserProfile, getUserBookings, cancelUserBooking, adminCheck,  logoutAndRedirectToGoogle  };
