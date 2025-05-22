import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/NavBar.jsx";
import ListService from "../components/ListService.jsx";
import logo from "../data/icon/logo redondo.png";

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
      <ListService />
    </>
  );
};

export default Home;
