import React from "react";
import { verifyUserInfoApi } from "../Api/authServices";
import { api_errors } from "../Api/api_errors";
import { useNavigate } from "react-router-dom";
import InputPhone from "../components/InputPhone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import "../data/styles/ForgotPassword.css";

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
    <div className="forgot-password">
      <div className="forgot-password-container">
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
        <h2>Digite seus dados</h2>
        <form className="forgot-password-form" onSubmit={handleVerifyUser}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="forgot-password-input"
          />
          <InputPhone
            value={phone}
            onChange={setPhone}
            placeholder="Telefone"
            className="forgot-password-input"
          />
          <button className="forgot-password-button" type="submit">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
