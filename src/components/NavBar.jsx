import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <>
      <div className="navBar">
        <Link to="tel:+5515997193510" className="navBar_link">
          <FontAwesomeIcon icon={faPhone} />
          <p className="navBar_link_text">ligar</p>
        </Link>
        <Link
          to="https://www.google.com/maps/place/R.+Zoraide+Arvieri+Bonini,+58+-+Vila+Martins,+Itu+-+SP,+13308-213/@-23.3892919,-47.346775,166m/data=!3m2!1e3!4b1!4m6!3m5!1s0x94cf5c4202627185:0x6d71144883c9bc96!8m2!3d-23.3892931!4d-47.3461313!16s%2Fg%2F11jsjp0yzj?entry=ttu&g_ep=EgoyMDI1MDQwNy4wIKXMDSoASAFQAw%3D%3D"
          className="navBar_link"
          target="_blank"
        >
          <FontAwesomeIcon icon={faMapLocationDot} />
          <p className="navBar_link_text">Local</p>
        </Link>
      </div>
    </>
  );
};

export default Navbar;
