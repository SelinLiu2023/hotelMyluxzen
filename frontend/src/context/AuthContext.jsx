import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const API_URL = import.meta.env.VITE_SERVER_URL;

    useEffect(()=>{
        console.log("AuthProvider,user", user);
    },[user]);
    //  Funktion, um den aktuellen Benutzer zu prüfen
    const checkUserSession = async () => {
        try {
            const response = await fetch(`${API_URL}/api/auth/me`, {
                method: "GET",
                credentials: "include", // ✅ WICHTIG für Cookies
                cache: "no-store",
                headers: {  
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const userData = await response.json();
                setUser({ ...userData, 
                    isAuthenticated: true,
                    isAdmin: userData.isAdmin || false,
                }); // ✅ Benutzer setzen
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error("Fehler beim Abrufen der Benutzerdaten:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkUserSession();
    }, []);

    //  Logout-Funktion
    const logout = async () => {
        try {
            await fetch(`${API_URL}/api/auth/logout`, {
                method: "POST",
                credentials: "include",
            });
            setUser(null);
        } catch (error) {
            console.error("Fehler beim Logout:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
