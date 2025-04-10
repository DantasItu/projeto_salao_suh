import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const logo =
  "https://scontent.cdninstagram.com/v/t51.2885-19/475590469_9375384509189275_4016142506275002794_n.jpg?stp=cp0_dst-jpg_s110x80_tt6&_nc_cat=101&ccb=1-7&_nc_sid=bf7eb4&_nc_ohc=oS4610fjjysQ7kNvwGt_jiq&_nc_oc=AdmH9kiTNu84gorG_DkUkhnOTj1eUQOTAMkQ6QAD8krplv23ujXDsPcnru1G_mQaeb4&_nc_zt=24&_nc_ht=scontent.cdninstagram.com&oh=00_AfEazWsqnNBb3SGQoXwIws2J1HmvXuomkK6jB0QBekS8Mw&oe=67FCBB56";

const Home = () => {
  return (
    <>
      <div className="header">
        <Link to="/">
          <img className="logo" src={logo} />
        </Link>
        <div className="header__text">
          <h1>Suelen beserra</h1>
          <h3>Cabelereira</h3>
        </div>

        <div className="header_button">
          <Link to="/login" className="header__button_login">
            Login
          </Link>
        </div>
      </div>
      <Navbar />
    </>
  );
};

export default Home;
