import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { BiUser, BiEnvelope, BiLock, BiShow, BiHide } from "react-icons/bi";
import loginImage from "../assets/imageNaheeda/login-image.jpg"; 
import NavbarMini from "../components/navbarMini/NavbarMini";
import createErrorHandler from "../components/User/ErrorHandler";
import { jwtDecode } from "jwt-decode";

const AuthPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {user, setUser, loading } = useContext(AuthContext);

    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [vorname, setVorname] = useState("");
    const [nachname, setNachname] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [passwordError, setPasswordError] = useState("");
    const errorHandler = createErrorHandler(setErrors);
    const API_URL = import.meta.env.VITE_SERVER_URL;

    
    useEffect(() => {
      const queryParams = new URLSearchParams(location.search);
      const initial = queryParams.get("register") === "true";
      setIsRegister(initial);
    }, [location.search]);


  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const error = query.get("error");
  
    if (error === "google_failed" || error === "access_denied") {
      setErrors({ general: "Die Anmeldung mit Google wurde abgebrochen oder ist fehlgeschlagen." });
  
      // WICHTIG: Session/Cookie killen auf dem Server UND Zustand zurücksetzen
      fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      }).finally(() => {
        setUser(null); // frontend-Zustand zurücksetzen
        navigate("/auth?register=false");
      });
    }
  }, [location.search]);


    
    const resetForm = () => {
        setVorname("");
        setNachname("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setErrors({});
    };

    const handleAuth = async (e) => {
        e.preventDefault();
        setErrors({});
        if (user?.isAuthenticated) {
            setErrors({ general: "Bitte melden sich ab, um ein anderes Konto zu verwenden." });
            return;
        }
        if (!email || !password || (isRegister && (!vorname || !nachname))) {
            setErrors({ general: "Bitte fülle alle erforderlichen Felder aus." });
            return;
        }
    
        if (isRegister && password !== confirmPassword) {
            setErrors({ confirmPassword: "Passwörter stimmen nicht überein." });
            return;
        }

        const endpoint = isRegister 
        ? `${API_URL}/api/auth/register`
        : `${API_URL}/api/auth/login`;
    
            const bodyData = isRegister
            ? { vorname, nachname, email, password }
            : { email, password };

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(bodyData),
            });

            const data = await response.json();
            if (!response.ok) {
                if (data.errors) {
                  // z. B. { email: "Ungültig", password: "Zu kurz" }
                  errorHandler(data);
                } else if (data.message) {
                  // z. B. "Diese E-Mail-Adresse wird bereits verwendet."
                  setErrors({ general: data.message });
                } else {
                  setErrors({ general: "Unbekannter Fehler. Bitte erneut versuchen." });
                }
                return;
              }

            if (isRegister) {
                //  Registrierung war erfolgreich, setze alle Eingaben auf leer!
                setVorname("");
                setNachname("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");

                // Wechsel zur Login-Seite, aber Benutzer muss selbst die Daten eingeben
                navigate("/auth?register=false");
            } else {
                setUser({
                    ...data,
                    isAuthenticated: true,  // ✅ Sicherstellen, dass der Benutzer als eingeloggt gilt
                    isAdmin: data.isAdmin || false,  // ✅ Falls `isAdmin` fehlt, setze `false`
                });
        
                  //  Admins gehen ins Admin-Dashboard, normale User zur normalen Startseite
            navigate(data.isAdmin ? "/admin" : "/");
            }
        } catch (error) {
            console.error("Fehler bei der Authentifizierung:", error);
            setErrors({ general: "Serverfehler, bitte später erneut versuchen." });
        }
    };
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center text-[#116769]">
          <p className="text-xl">Authentifizierung wird geprüft...</p>
        </div>
      );
    }
    
    return (
        <div className="min-h-screen overflow-y-auto lg:overflow-hidden flex flex-col">
          <NavbarMini />
    
          <div className="flex flex-col lg:flex-row flex-1">

            {/* Bild (nur auf großen Screens) */}
            <div className="hidden lg:flex w-1/2 min-h-full">
              <img
                src={loginImage}
                alt="Login"
                className="w-full h-full object-cover object-center md:object-[25%_50%]"
              />
            </div>
    
            {/* Formularbereich */}
            <div className={`w-full lg:w-1/2 px-6 py-10 flex justify-center ${isRegister ? "mt-10" : "mt-30"}`}>


              <div className="w-full max-w-[450px]">
                <h1
                  className="text-4xl font-semibold text-[#0e5756] text-center mb-16"
                  style={{ fontFamily: "Merriweather, serif" }}
                >
                  {isRegister ? "Willkommen" : "Willkommen zurück!"}
                </h1>
    
                <form onSubmit={handleAuth} className="flex flex-col space-y-6">
                  {isRegister && (
                    <>
                      <InputField
                        icon={<BiUser />}
                        value={vorname}
                        onChange={setVorname}
                        placeholder="Vorname"
                        error={errors.vorname}
                      />
                      <InputField
                        icon={<BiUser />}
                        value={nachname}
                        onChange={setNachname}
                        placeholder="Nachname"
                        error={errors.nachname}
                      />
                    </>
                  )}
    
                  <InputField
                    icon={<BiEnvelope />}
                    value={email}
                    onChange={setEmail}
                    placeholder="Email"
                    error={errors.email}
                  />
    
                  <PasswordField
                    value={password}
                    setValue={setPassword}
                    show={showPassword}
                    setShow={setShowPassword}
                    placeholder="Passwort"
                    error={errors.password}
                  />
    
                  {isRegister && (
                    <PasswordField
                      value={confirmPassword}
                      setValue={setConfirmPassword}
                      show={showConfirmPassword}
                      setShow={setShowConfirmPassword}
                      placeholder="Passwort bestätigen"
                      error={errors.confirmPassword}
                    />
                  )}
    
                  {errors.general && (
                    <p className="text-[#9C785E] text-sm">{errors.general}</p>
                  )}
    
                  <button
                    type="submit"
                    className="bg-[#116769] text-white py-2.5 px-6 mt-8 rounded-full hover:bg-[#0e5756] transition shadow-md"
                  >
                    {isRegister ? "Registrieren" : "Einloggen"}
                  </button>
                </form>
    
                <div className="text-center mt-10">
                  <button
                    onClick={() => {
                      resetForm();
                      navigate(`/auth?register=${!isRegister}`);
                    }}
                    className="text-[#0e5756] font-medium hover:text-[#116769] transition"
                  >
                    {isRegister ? (
                      <>
                        Bereits ein Konto?{" "}
                        <span className="font-bold underline">Hier einloggen</span>
                      </>
                    ) : (
                      <>
                        Noch kein Konto?{" "}
                        <span className="font-bold underline">
                          Hier registrieren
                        </span>
                      </>
                    )}
                  </button>
                </div>
    
          {/* Google-Anmeldung */}
          {!isRegister && (
  <div className="text-center mt-10">
    <button
      onClick={() => {
        if (user?.isAuthenticated) {
          setErrors({
            general: "Bitte melden sich ab, um ein anderes Google-Konto zu verwenden.",
          });
        } else {
          window.location.href = `${API_URL}/api/auth/logout-and-google`;

        }
      }}
      className="inline-flex items-center justify-center space-x-4 px-6 py-2 border border-gray-300 rounded-full hover:shadow-lg transition-all duration-200 bg-white hover:bg-gray-100"
    >
      <img
        src="https://developers.google.com/identity/images/g-logo.png"
        alt="Google Logo"
        className="w-5 h-5"
      />
      <span className="text-[#116769] font-medium">Mit Google anmelden</span>
    </button>
  </div>
)}

          </div>
        </div>
      </div>
    </div>
  );
};
    
    const InputField = ({ icon, value, onChange, placeholder, error }) => (
      <>
        <div className="relative flex items-center border-b border-gray-400">
          <div className="absolute left-2 text-gray-500">{icon}</div>
          <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full text-gray-600 pl-8 py-3 bg-transparent focus:outline-none"
          />
        </div>
        {error && <p className="text-[#9C785E] text-sm">{error}</p>}
      </>
    );
    
    const PasswordField = ({
      value,
      setValue,
      show,
      setShow,
      placeholder,
      error,
    }) => (
      <>
        <div className="relative flex items-center border-b border-gray-400">
          <BiLock className="absolute left-2 text-gray-500" size={20} />
          <input
            type={show ? "text" : "password"}
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full text-gray-600 pl-8 py-3 bg-transparent focus:outline-none"
          />
          <button
            type="button"
            className="absolute right-2 text-gray-500"
            onClick={() => setShow(!show)}
          >
            {show ? <BiHide size={20} /> : <BiShow size={20} />}
          </button>
        </div>
        {error && <p className="text-[#9C785E] text-sm">{error}</p>}
      </>
    );
  
    
    export default AuthPage;