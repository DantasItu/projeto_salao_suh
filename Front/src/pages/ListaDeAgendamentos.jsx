import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import MeusAgendamentos from "../components/MeusAgendamentos";
import { isAuthenticated, getUserName } from "../utilities/authenticators.js";

const ListaDeAgendamentos = () => {
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      setUserName(getUserName());
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserName(null);
    navigate("/");
  };

  return (
    <>
      <Header userName={userName} onLogout={handleLogout} />
      <MeusAgendamentos />
    </>
  );
};

export default ListaDeAgendamentos;
