import React from "react";
import { useSelector, useDispatch } from "react-redux";
import NavbarToggler from "../navbar/NavbarToggler";
import NavbarLinks from "../navbar/NavbarLinks";
import LogoMini from "./LogoMini";
import ProfileButton from "../navbar/ProfileButton";
import { toggleMenu } from "../../utils/state/navbarSlice";

const MiniNavbar = () => {
  const dispatch = useDispatch();
  const { isMenuOpen } = useSelector((state) => state.navbar);

  const closeMenu = () => {
    if (isMenuOpen) {
      dispatch(toggleMenu());
    }
  };

  return (
    <header className="relative top-0 left-0 z-[999] w-full h-35 p-2 shadow-md bg-white">
    <nav className="w-full mx-auto flex justify-between items-center relative gap-x-4">

      {/* Logo Mini */}
      <LogoMini />
  
      {/* Liens du menu */}
      <NavbarLinks isMenuOpen={isMenuOpen} closeMenu={closeMenu} />
  
      {/* Profil & Hamburger */}
      <div className="flex items-center space-x-4">
        <ProfileButton />
        <NavbarToggler />
      </div>
    </nav>
  </header>
  
  );
};

export default MiniNavbar;
