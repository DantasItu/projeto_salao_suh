import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, getUserType } from "../utilities/authenticators.js";

const ProtectPages = ({ allowedTypes, children }) => {
  try {
    // Se não estiver autenticado ou expirado → manda pra tela de login

    if (!isAuthenticated()) {
      return <Navigate to="/login" />;
    }
    // Se estiver autenticado, mas o tipo não for autorizado → manda pra home
    const userType = getUserType();
    if (!allowedTypes.includes(userType)) {
      return <Navigate to="/" />;
    }
    //  Tudp certo → mostra a página protegida
    return children;
  } catch (err) {
    console.error("Erro no ProtectPages:", err);
  }
};

export default ProtectPages;
