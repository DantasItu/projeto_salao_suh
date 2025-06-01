import React, { useState } from "react";
import { loginApi } from "../Api/authServices.js";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import logo from "../data/icon/logo redondo.png";
import "../data/styles/login.css";

const Login = () => {
  // funções de status
  const [login, setlogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const statusLogin = async (e) => {
    e.preventDefault();
    try {
      const { token } = await loginApi(login, password);
      localStorage.setItem("token", token);

      const decoded = jwtDecode(token);
      const type = decoded.type;

      navigate(
        type === "admin"
          ? "/admin"
          : type === "cliente"
          ? "/cliente"
          : type === "profissional"
          ? "/profissional"
          : "/"
      );
    } catch (err) {
      alert(`Login inválido!`);
    }
  };

  return (
    <>
      <div className="body_login">
        <div className="login">
          <form className="caixa_login" onSubmit={statusLogin}>
            <img className="login_logo" src={logo} />
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

export default Login;
