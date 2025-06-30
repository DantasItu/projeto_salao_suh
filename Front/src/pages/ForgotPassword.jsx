import React from "react";
import { verifyUserInfoApi } from "../Api/authServices";
import { api_errors } from "../Api/api_errors";
import { useNavigate } from "react-router-dom";
import InputPhone from "../components/InputPhone";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");

  const handleVerifyUser = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    const onlyNumber = trimmedPhone.replace(/\D/g, "");

    try {
      await verifyUserInfoApi(trimmedEmail, onlyNumber);

      navigate("/newPassword", {
        state: { email: trimmedEmail, phone: onlyNumber },
      });
    } catch (err) {
      alert(api_errors(err, "Erro ao verificar usuário na API."));
    }
  };

  return (
    <div className="reset-password">
      <div className="reset-password-container">
        <h2>Digite seus dados.</h2>
        <form onSubmit={handleVerifyUser}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputPhone
            value={phone}
            onChange={setPhone}
            placeholder="Telefone"
          />
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
