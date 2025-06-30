import React from "react";
import { verifyUserInfoApi } from "../Api/authServices";
import { api_errors } from "../Api/api_errors";
import { useNavigate } from "react-router-dom";
import InputPhone from "../components/InputPhone";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");

  const handleVerifyUser = async (e) => {
    e.preventDefault();
    setError("");

    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();

    try {
      await verifyUserInfoApi(email, phone);
      navigate("/resetPasswordForm", {
        state: { email: trimmedEmail, phone: trimmedPhone },
      });
    } catch (err) {
      alert(api_errors(err, "Erro ao verificar usuário na API."));
    }
  };

  return (
    <div>
      <h2>Digita seus dados.</h2>
    </div>
  );
};

export default ResetPassword;
