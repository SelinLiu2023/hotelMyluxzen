//zahra Logo

import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/imgHome/logo.png";

const Logo = () => {
  return (
    <Link to="/">
      <img
        src={logo}
        alt="MyLuXZeN"
        className="w-32 sm:w-40 md:w-48 cursor-pointer"
      />
    </Link>
  );
};

export default Logo;



