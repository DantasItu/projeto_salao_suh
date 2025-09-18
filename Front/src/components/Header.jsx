import React from "react";
import { Link } from "react-router-dom";
import logo from "../data/icon/logo redondo.png";
import Navbar from "./NavBar.jsx";

// Componente de cabeçalho reutilizável
const Header = ({ userName, onLogout }) => {
  return (
    <>
      <div className="header">
        <Link to="/">
          <img className="logo" src={logo} alt="Logo Salão Suelen Beserra" />
        </Link>
        <div className="header__text">
          <h1>Suelen Beserra</h1>
          <h3>Cabelereira</h3>
        </div>
        <div className="header_button">
          {userName ? (
            <div className="header_user">
              <span className="header_user_anuciado">Olá, {userName}</span>
              <button className="header__button_logout" onClick={onLogout}>
                Sair
              </button>
            </div>
          ) : (
            <Link to="/login" className="header__button_login">
              Login
            </Link>
          )}
        </div>
      </div>
      <Navbar />
    </>
  );
};

export default Header;
