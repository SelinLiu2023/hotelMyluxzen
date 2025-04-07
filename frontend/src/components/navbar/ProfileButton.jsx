//zahra

import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { FaUserCircle, FaTachometerAlt, FaSignInAlt, FaSignOutAlt, FaUserPlus, FaCalendarCheck } from "react-icons/fa";

const ProfileButton = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Fonction pour naviguer et fermer le menu proprement
  const handleNavigation = (path) => {
    setIsMenuOpen(false);
    setTimeout(() => navigate(path), 150);
  };

  return (
    <div className="relative">
      {/* Bouton Profil avec animation hover */}
      <button
        ref={buttonRef}
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className="button button-secondary flex items-center justify-center w-13 h-13
                   rounded-full md:rounded-4xl transition-all px-1 cursor-pointer
                   hover:scale-110 hover:rotate-6 active:scale-95"
      >
        {user ? (
          <div className="w-8 h-8 flex items-center justify-center bg-[#116769] text-white font-semibold rounded-full ">
            {user.vorname ? user.vorname.charAt(0).toUpperCase() : "?"}
          </div>
        ) : (
          <FaUserCircle size={28} className="text-current" />
        )}
      </button>

      {/* Menu déroulant */}
      {isMenuOpen && (
        <div ref={menuRef} className="absolute top-full right-0 w-48 bg-white p-4 shadow-lg mt-2 rounded-md">
          <ul>
            {user ? (
              <>
                <li className="py-2 px-4 flex items-center space-x-2 text-[#116869] hover:bg-[#1168692b] cursor-pointer">
                  <FaTachometerAlt />
                  <button onClick={() => handleNavigation("/account-booking?view=account")}>
                    Konto
                  </button>
                </li>
                <li className="py-2 px-4 flex items-center space-x-2 text-[#116869] hover:bg-[#1168692b] cursor-pointer">
                  <FaCalendarCheck />
                  <button onClick={() => handleNavigation("/account-booking?view=booking")}>
                    Buchung
                  </button>
                </li>
                <li className="py-2 px-4 flex items-center space-x-2 cursor-pointer text-[#b58d6e] hover:bg-[#1168692b]">
                  <FaSignOutAlt />
                  <button
                    onClick={() => {
                      logout();
                      navigate("/auth?register=false");
                      setIsMenuOpen(false);
                    }}
                  >
                    Abmelden
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="py-2 px-4 flex items-center space-x-2 text-[#116869] hover:bg-[#1168692b] cursor-pointer">
                  <FaUserPlus />
                  <button onClick={() => handleNavigation("/auth?register=true")}>
                    Registrieren
                  </button>
                </li>
                <li className="py-2 px-4 flex items-center space-x-2 text-[#116869] hover:bg-[#1168692b] cursor-pointerr">
                  <FaSignInAlt />
                  <button onClick={() => handleNavigation("/auth?register=false")}>
                    Einlogen
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

export default ProfileButton;

