
//zahra NavbarLinks
import React, { useEffect, useRef } from "react";
import { Link as ScrollLink } from "react-scroll";
import { NavLink } from "react-router-dom";

const links = [
  { link: "Home", path: "/", type: "router" },
  { link: "Buchen", path: "/booking", type: "router" },
  { link: "Galerie", path: "/gallerie", type: "router" },
  { link: "Unsere Villen", path: "/HausBeschreibung", type: "router" },
  { link: "Aktivitäten", path: "/activities", type: "router" },
  { link: "Reviews", path: "/reviews", type: "router" },
  { link: "Über Uns", path: "/about", type: "router" },
  { link: "agb", path: "/Agreement", type: "router" },
  
];

const NavbarLinks = ({ isMenuOpen, closeMenu }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu(); // Ferme le menu si on clique en dehors
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen, closeMenu]);

  return (
    <ul
    ref={menuRef}
    className={`${
      isMenuOpen ? "flex" : "hidden"
    } flex-col items-center absolute top-full left-0 right-0 bg-white p-4 gap-4 sm:bg-cyan/30 backdrop-blur-lg z-10 w-full
    lg:static lg:flex lg:flex-row lg:gap-8 lg:bg-transparent lg:text-white font-body sm:w-full py-4 sm:text-xl lg:text-base text-center justify-center mx-auto`}
  >
      {links.map((link, index) => (
        <li key={index} className="group navbar-link">
          {link.type === "scroll" ? (
            <ScrollLink
              to={link.section}
              spy={true}
              smooth={true}
              duration={500}
              offset={-130}
              
              onClick={closeMenu} // Ferme le menu après clic sur un lien
            >
              {link.link}
            </ScrollLink>
          ) : (
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `cursor-pointer transition-all duration-500 ${
                  isActive ? "text-cyan font-bold" : "hover:text-cyan"
                }`
              }
              onClick={closeMenu} // Ferme le menu après clic sur un lien
            >
              {link.link}
            </NavLink>
          )}
          <div className="mx-auto w-0 group-hover:w-full h-[1px] transition-all duration-500"></div>
        </li>
      ))}
    </ul>
  );
};

export default NavbarLinks;



