import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerCientApi } from "../Api/authServices";
import { api_errors } from "../Api/api_errors";

const RegisterClient = () => {
  const [phone, setPhone] = useState("");
  const [confirmPhone, setConfirmPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedConfirmEmail = confirmEmail.trim();
  const trimmedPassword = password.trim();
  const trimmedPhone = phone.trim();
  const trimmedConfirmPhone = confirmPhone.trim();
  const trimmedConfirmPassword = confirmPassword.trim();

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

  // manipuladores de eventos para formatação
  // para o campo de telefone e confirmação de telefone
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(formatPhone(value));
  };

  const handleConfirmPhoneChange = (e) => {
    const value = e.target.value;
    setConfirmPhone(formatPhone(value));
  };

  const validatePassword = (password) => {
    // Pelo menos uma letra maiúscula e um caractere especial
    const hasUppercase = /[A-Z]/.test(password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
    return hasUppercase && hasSpecialChar;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!trimmedName || !trimmedEmail || !trimmedPassword || !trimmedPhone) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if (trimmedEmail !== trimmedConfirmEmail) {
      alert("Os e-mails não coincidem.");
      return;
    }

    if (trimmedPassword !== trimmedConfirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }

    if (trimmedPhone !== trimmedConfirmPhone) {
      alert("Os telefones não coincidem.");
      return;
    }

    if (!validatePassword(password)) {
      alert(
        "A senha deve conter pelo menos uma letra maiúscula e um caractere especial."
      );
      return;
    }

    const onlyNumber = trimmedPhone.replace(/\D/g, "");

    try {
      await registerCientApi(
        trimmedName,
        trimmedEmail,
        trimmedPassword,
        onlyNumber
      );
      alert("Cadastro realizado com sucesso!");
    } catch (err) {
      alert(api_errors(err, "Erro ao se conectar na API."));
    }
    navigate("/login");
  };

  // Função para capitalizar cada palavra
  const capitalizeWords = (str) =>
    str.replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <div className="register-client">
      <div className="register-client_container">
        <h2>Preencha todos os dados!</h2>
        <form onSubmit={handleSubmit}>
          <div className="register-client_input">
            Nome:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(capitalizeWords(e.target.value))}
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
            Confirme seu Email:
            <input
              type="email"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
            />
          </div>

          <div className="register-client_input">
            Senha:
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Ocultar senha" : "Mostrar senha"}
          </button>

          <div className="register-client_input">
            Confirme sua Senha:
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
          <div className="register-client_input">
            Confirme seuTelefone:
            <input
              type="text"
              value={confirmPhone}
              onChange={handleConfirmPhoneChange}
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
