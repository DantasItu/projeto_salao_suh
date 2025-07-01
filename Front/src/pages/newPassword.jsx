import React, { useState } from "react";
import { resetPasswordApi } from "../Api/authServices.js";
import { useLocation, useNavigate } from "react-router-dom";
import { api_errors } from "../Api/api_errors";
import "../data/styles/newPassword.css";

const NewPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Busca a propriedade state do objeto location
  const { email = "", phone = "" } = location.state || {};

  // Função para validar se a senha deve conter pelo menos uma letra maiúscula e um caractere especial

  const newPasswordHandler = async (e) => {
    e.preventDefault();

    const trimmedNewPassword = newPassword.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    // Função para validar se a senha deve conter pelo menos uma letra maiúscula e um caractere especial
    const validatePassword = (password) => {
      const hasUppercase = /[A-Z]/.test(password);
      const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
      return hasUppercase && hasSpecialChar;
    };

    if (!trimmedNewPassword || !trimmedConfirmPassword) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if (trimmedNewPassword !== trimmedConfirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }

    if (!validatePassword(trimmedNewPassword)) {
      alert(
        "A nova senha deve conter pelo menos uma letra maiúscula e um caractere especial."
      );
      return;
    }

    try {
      await resetPasswordApi(email, phone, trimmedNewPassword);
      alert("Senha redefinida com sucesso!");
      navigate("/login");
    } catch (error) {
      alert(api_errors(error, "Erro ao se conectar com a API."));
    }
  };

  return (
    <div className="new-password">
      <div className="new-password-container">
        <form onSubmit={newPasswordHandler}>
          <h2>Digite sua nova senha</h2>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Nova Senha"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "8px 0",
            }}
          >
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="box_login_button"
            >
              {showPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirmar Nova Senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "16px",
            }}
          >
            <button className="box_login_button" type="submit">
              Redefinir Senha
            </button>

            <button
              type="button"
              className="box_login_button"
              onClick={() => navigate("/login")}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
