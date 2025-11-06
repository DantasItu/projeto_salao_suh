import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import ListService from "../components/ListService.jsx";
import { isAuthenticated, getUserName } from "../utilities/authenticators.js";

// variavel de estado para armazenar o nome do usuário
const Home = () => {
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();

  // Verifica se o usuário está autenticado ao carregar o componente
  useEffect(() => {
    if (isAuthenticated()) {
      setUserName(getUserName());
    }
  }, []);

  // Função para realizar logout
  const Logout = () => {
    localStorage.removeItem("token");
    setUserName(null);
    navigate("/");
  };

  return (
    <>
      <Header userName={userName} onLogout={Logout} />
      <ListService />
    </>
  );
};

export default Home;
