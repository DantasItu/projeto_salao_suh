import React, { useState } from "react";
import { loginApi } from "../Api/authServices.js";
import { Link, useNavigate } from "react-router-dom";
import logo from "../data/icon/logo redondo.png";
import { getUserType } from "../utilities/authenticators.js";
import { api_errors } from "../Api/api_errors.js";
import "../data/styles/login.css";

// pagina e logica de login do front
const LoginPage = () => {
  // funções de status
  const [login, setlogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const statusLogin = async (e) => {
    e.preventDefault();
    try {
      const { token } = await loginApi(login, password);
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
            <button className="box_login_button" type="submit">
              {" "}
              Entrar{" "}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
