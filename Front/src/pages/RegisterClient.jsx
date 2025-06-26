import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerClientApi } from "../Api/authServices";
import { api_errors } from "../Api/api_errors";
import InputPhone from "../components/InputPhone";

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
            <InputPhone value={phone} onChange={setPhone} />
          </div>
          <div className="register-client_input">
            Confirme seu Telefone:
            <InputPhone value={confirmPhone} onChange={setConfirmPhone} />
          </div>
          <button type="submit">Criar conta</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterClient;
