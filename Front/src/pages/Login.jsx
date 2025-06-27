import React, { useState } from "react";
import { loginApi } from "../Api/authServices.js";
import { Link, useNavigate } from "react-router-dom";
import logo from "../data/icon/logo redondo.png";
import { getUserType } from "../utilities/authenticators.js";
import { api_errors } from "../Api/api_errors.js";
import "../data/styles/login.css";

// pagina e logica de login do front
const LoginPage = () => {
  // funções de estado para armazenar os valores de login e senha
  const [login, setlogin] = useState("");
  const [password, setPassword] = useState("");

  // Hook do React Router para navegação
  const navigate = useNavigate();

  const statusLogin = async (e) => {
    e.preventDefault();

    // Função para capitalizar cada palavra e deixar a primeira letra maiúscula
    const capitalizeWords = (str) =>
      str.replace(/\b\w/g, (char) => char.toUpperCase());

    // Verifica se é um email ou nome
    let trimmedLogin;
    if (login.includes("@")) {
      trimmedLogin = login.trim().toLowerCase();
    } else {
      trimmedLogin = capitalizeWords(login.trim().toLowerCase());
    }

    try {
      const { token } = await loginApi(trimmedLogin, password);
      localStorage.setItem("token", token);

      const type = getUserType();

      navigate(
        type === "admin"
          ? "/"
          : type === "cliente"
          ? "/"
          : type === "profissional"
          ? "/"
          : "/"
      );
    } catch (err) {
      alert(api_errors(err, "Erro ao fazer login."));
    }
  };

  return (
    <>
      <div className="body_login" onSubmit={statusLogin}>
        <div className="login">
          <form className="caixa_login">
            <Link to="/">
              <img className="login_logo" src={logo} />
            </Link>
            <div className="login_anuciado">
              <h2>Bem Vindo!</h2>
              <p>Faça seu Login.</p>
            </div>
            <input
              className="box_login_imput"
              type="text"
              placeholder="Digite seu email ou Seu nome..."
              value={login}
              onChange={(e) => setlogin(e.target.value)}
            />
            <input
              className="box_login_imput"
              type="password"
              placeholder="Digite sua senha..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="button_container">
              <Link to="/registerClient" className="box_createAccount_button">
                {" "}
                Criar Conta{" "}
              </Link>
              <button className="box_login_button" type="submit">
                {" "}
                Entrar{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
