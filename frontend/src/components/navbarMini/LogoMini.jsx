//zahra
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/imgHome/logo.png";

const LogoMini = () => {
  return (
    <Link to="/">
      <img
        src={logo}
        alt="MyLuXZeN"
        className="w-34 sm:w-34 md:w-34 cursor-pointer"
      />
    </Link>
  );
};

export default LogoMini;
