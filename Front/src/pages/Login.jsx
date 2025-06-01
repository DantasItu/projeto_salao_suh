import React, { useState } from "react";
import { loginApi } from "../Api/authServices.js";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

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
      alert("login inválido");
      console.error(err);
    }
  };

  return (
    <>
      <div className="login">
        <form className="caixa_login" onSubmit={statusLogin}>
          <input
            type="text"
            placeholder="Digite seu email ou Seu nome..."
            value={login}
            onChange={(e) => setlogin(e.target.value)}
          />
          <input
            type="password"
            placeholder="Digite sua senha..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit"> Entrar </button>
        </form>
      </div>
    </>
  );
};

export default Login;
