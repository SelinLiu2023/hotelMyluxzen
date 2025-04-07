//zahra

import { GiHamburgerMenu } from "react-icons/gi"; // Hamburger icon
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../../utils/state/navbarSlice"; // Utilisation du chemin relatif

const NavbarToggler = () => {
  const dispatch = useDispatch();
  const { isMenuOpen } = useSelector((state) => state.navbar);

  const setToggleMenu = () => {
    dispatch(toggleMenu()); // Déclenche l'action Redux pour basculer l'état du menu
  };

  return (
    <button
      className={`lg:hidden text-2xl p-3 border rounded-full 
                  transition-all duration-300 ease-in-out
                  transform hover:scale-110 hover:bg-[#064236]/20 
                  active:scale-95
                  ${isMenuOpen ? "text-[#064236] bg-[#064236]/20" : "text-[#064236]"}`}
      onClick={setToggleMenu}
    >
      <GiHamburgerMenu />
    </button>
  );
};

export default NavbarToggler;
