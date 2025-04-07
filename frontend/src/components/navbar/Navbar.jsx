import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavbarToggler from "./NavbarToggler"; // Menu hamburger
import NavbarLinks from "./NavbarLinks"; // Liens du menu
import Logo from "./Logo"; // Logo
import ProfileButton from "./ProfileButton"; // Bouton de profil
import { toggleMenu } from "../../utils/state/navbarSlice"; // Action Redux


const Navbar = () => {
  const dispatch = useDispatch();
  const { isMenuOpen } = useSelector((state) => state.navbar);
  const [scrollingDown, setScrollingDown] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  // Gestion du scroll (cacher la Navbar quand on descend)
  const handleScroll = () => {
    const currentScroll = window.scrollY;

    if (currentScroll > lastScrollTop + 20) {
      setScrollingDown(true);
    } else if (currentScroll < lastScrollTop - 20) {
      setScrollingDown(false);
    }

    setLastScrollTop(currentScroll <= 0 ? 0 : currentScroll);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  const closeMenu = () => {
    if (isMenuOpen) {
      dispatch(toggleMenu()); // Ferme le menu si ouvert
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full p-4 transition-all duration-300 shadow-md ${
        scrollingDown ? "-translate-y-full" : "translate-y-0"
      } bg-white opacity-90 `}
    >
      <nav className="max-w-[100%] sm:max-w-[95%] md:max-w-[80%] mx-auto flex justify-between items-center gap-x-8">

        {/* Logo */}
        <Logo />

        {/* Liens du menu */}
        <NavbarLinks isMenuOpen={isMenuOpen} closeMenu={closeMenu} />

        {/* Bouton Profil & Hamburger */}
        <div className="flex items-center space-x-4">
          <ProfileButton />
          <NavbarToggler />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;