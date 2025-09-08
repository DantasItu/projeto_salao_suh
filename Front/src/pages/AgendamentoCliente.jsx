import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar.jsx";
import logo from "../data/icon/logo redondo.png";
import { isAuthenticated, getUserName } from "../utilities/authenticators.js";
import Calendario from "../components/Calendario.jsx";
import "../data/styles/AgendamentoCliente.css";

const AgendamentoCliente = () => {
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      setUserName(getUserName());
    }
  }, []);

  const Logout = () => {
    localStorage.removeItem("token");
    setUserName(null);
    navigate("/");
  };

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
          {userName ? (
            <div className="header_user">
              <span className="header_user_anuciado">Olá, {userName}</span>
              <button className="header__button_logout" onClick={Logout}>
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

      <div className="container-agendamento">
        <div className="menu-calendario">
          <h2>Selecione um dia e Horario disponivel.</h2>
        </div>
        <Calendario />
      </div>
    </>
  );
};

export default AgendamentoCliente;
