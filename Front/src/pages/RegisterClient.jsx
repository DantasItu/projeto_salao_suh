import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerCientApi } from "../Api/authServices";
import { api_errors } from "../Api/api_errors";

const RegisterClient = () => {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // lógica para formatação do telefone
  const formatPhone = (value) => {
    const cleaned = value.replace(/\D/g, "");
    let formatted = cleaned;

    if (cleaned.length <= 2) {
      formatted = cleaned;
    } else if (cleaned.length <= 6) {
      formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    } else if (cleaned.length <= 10) {
      formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(
        2,
        6
      )}-${cleaned.slice(6)}`;
    } else {
      formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(
        2,
        7
      )}-${cleaned.slice(7, 11)}`;
    }
    return formatted;
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(formatPhone(value));
  };

  const validatePassword = (password) => {
    // Pelo menos uma letra maiúscula e um caractere especial
    const hasUppercase = /[A-Z]/.test(password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
    return hasUppercase && hasSpecialChar;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica se todos os campos estão preenchidos
    if (!name || !email || !password || !phone) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if (!validatePassword(password)) {
      alert(
        "A senha deve conter pelo menos uma letra maiúscula e um caractere especial."
      );
      return;
    }
    try {
      await registerCientApi(name, email, password, phone);
      alert("Cadastro realizado com sucesso!");
    } catch (err) {
      alert(api_errors(err, "Erro ao criar login."));
    }
    navigate("/login");
  };

  return (
    <div className="register-client">
      <div className="regiater-client_container">
        <h2>Crie sua Conta!</h2>
        <form onSubmit={handleSubmit}>
          <div className="register-client_input">
            Nome:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="register-client_input">
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="register-client_input">
            Senha:
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="register-client_input">
            Telefone:
            <input
              type="text"
              value={phone}
              onChange={handlePhoneChange}
              maxLength={15}
            />
          </div>
          <button type="submit">Criar conta</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterClient;
