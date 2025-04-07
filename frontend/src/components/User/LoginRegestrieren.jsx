import { useState, useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { FaUserCircle } from "react-icons/fa"; 
import { HiOutlineMenu } from "react-icons/hi"; 

const LoginRegestrieren = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // ✅ Navigation mit Timeout (Verhindert Blockierung)
    const handleNavigation = (path) => {
        console.log("Navigiere zu:", path);
        setMenuOpen(false);
        setTimeout(() => navigate(path), 150); // 🔥 150ms Verzögerung für sicheres Schließen
    };

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center space-x-2 p-2 border border-gray-300 rounded-full shadow-sm hover:shadow-md transition"
            >
                <HiOutlineMenu className="w-5 h-5 text-gray-600" />
                {user ? (
                    <div className="w-8 h-8 flex items-center justify-center bg-[#116769] text-white font-semibold rounded-full">
                          {user.vorname ? user.vorname.charAt(0).toUpperCase() : "?"}
                    </div>
                ) : (
                    <FaUserCircle className="w-8 h-8 text-gray-600" />
                )}
            </button>

            {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <ul className="py-2 text-gray-800">
                        {user ? (
                            <>
                                <li>
                                    <button 
                                       onClick={() => handleNavigation("/account-booking?view=account")}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                    >
                                        Konto
                                    </button>
                                </li>
                                <li>
                                    <button 
                                       onClick={() => handleNavigation("/account-booking?view=booking")}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                    >
                                        Buchung
                                    </button>
                                </li>
                                <li>
                                    <button
                                          onClick={() => {
                                            logout();  // ✅ Logout nur aufrufen
                                            navigate("/auth?register=false");
                                            setMenuOpen(false);
                                        }}
                                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                                    >
                                        Abmelden
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <button
                                        onClick={() => handleNavigation("/auth?register=true")}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                    >
                                        Registrieren
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => handleNavigation("/auth?register=false")}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                    >
                                        Einloggen
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default LoginRegestrieren;
