//Naheeda
import jwt from "jsonwebtoken";
import {User} from "../models/userSchema.js";

/**
 *  Token generieren (JWT)
 * @param {string} id - Benutzer-ID
 * @returns {string} - JWT Token
 */
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

/**
 *  Authentifizierungsmiddleware (Protect Route)
 */
const protect = async (req, res, next) => {
    let token;

    try {
        //  1. Token aus Header (Bearer Token) holen
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1]; // Token extrahieren
        }

        //  2. Falls kein Header-Token → Versuche Cookie-Token
        if (!token && req.cookies.jwt) {
            token = req.cookies.jwt;
        }

        //  3. Falls kein Token → Nutzer nicht authentifiziert
        if (!token) {
            req.user = null;
            return next();
        }

        //  4. Token validieren und Benutzer abrufen
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            console.log(" Kein Benutzer gefunden!");
            return res.status(401).json({ message: "Nicht autorisiert, Benutzer existiert nicht" });
        }

        req.user = user;
        console.log(" Authentifiziert:", req.user.email);
        next();
    } catch (error) {
        console.log(" Fehler bei Token-Überprüfung:", error.message);
        res.status(401).json({ message: "Nicht autorisiert, ungültiges Token" });
    }
};

export { generateToken, protect };
