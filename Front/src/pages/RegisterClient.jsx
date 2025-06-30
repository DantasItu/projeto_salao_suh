import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerClientApi } from "../Api/authServices";
import { api_errors } from "../Api/api_errors";
import InputPhone from "../components/InputPhone";
import "../data/styles/Register.css";
import logo from "../data/icon/logo redondo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

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

  // Remover espaços em branco extras, isso garante que os valores sejam tratados corretamente
  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedConfirmEmail = confirmEmail.trim();
  const trimmedPassword = password.trim();
  const trimmedPhone = phone.trim();
  const trimmedConfirmPhone = confirmPhone.trim();
  const trimmedConfirmPassword = confirmPassword.trim();

  // Função para validar se a senha deve conter pelo menos uma letra maiúscula e um caractere especial
  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
    return hasUppercase && hasSpecialChar;
  };

  // Função para lidar com o envio do formulário, ela verifica se todos os campos estão preenchidos e se os valores coincidem
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
    // Remover caracteres não numéricos do telefone
    const onlyNumber = trimmedPhone.replace(/\D/g, "");

    try {
      // Chamar a função de registro da API com os valores tratados
      await registerClientApi(
        trimmedName,
        trimmedEmail,
        trimmedPassword,
        onlyNumber
      );
    } catch (err) {
      alert(api_errors(err, "Erro ao se conectar na API."));
    }
    // Redirecionar para a página de login após o registro
    navigate("/login");
  };

  // Função para capitalizar cada palavra e deixar a primeira letra maiúscula
  const capitalizeWords = (str) =>
    str.replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <div className="register_body">
      <div className="register_container">
        <span
          onClick={() => navigate(-1)}
          style={{
            cursor: "pointer",
            marginRight: "10px",
            color: "var(--marrom-25)",
            fontSize: "20px",
          }}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </span>

        <img className="login_logo" src={logo} />

        <h2>Preencha todos os dados!</h2>
        <form onSubmit={handleSubmit}>
          <div className="register_input">
            <input
              type="text"
              placeholder="Digita seu Nome"
              value={name}
              onChange={(e) => setName(capitalizeWords(e.target.value))}
            />
          </div>

          <div className="register_input">
            <input
              type="email"
              placeholder="Digita seu Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="register_input">
            <input
              type="email"
              placeholder="Confirme seu Email"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
            />
          </div>
          <div className="register_input_senha">
            <div className="register_input">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="box_login_button"
            >
              {showPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>

          <div className="register_input">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirme sua Senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="register_input">
            <InputPhone
              value={phone}
              onChange={setPhone}
              placeholder="Digite seu Telefone"
            />
          </div>
          <div className="register_input">
            <InputPhone
              value={confirmPhone}
              onChange={setConfirmPhone}
              placeholder="Confirme seu Telefone"
            />
          </div>
          <button type="submit" className="box_login_button">
            Criar conta
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterClient;
