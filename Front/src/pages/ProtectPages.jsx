import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, getUserType } from "../utilities/authenticators.js";

// controle para proteger as rotas do front
const ProtectPages = ({ allowedTypes, redirects = {}, children }) => {
  try {
    const auth = isAuthenticated();
    // Se estiver autenticado, mas o tipo não for autorizado → manda pra login ou para qual foi determinado no App
    const userType = auth ? getUserType() : null;
    if (!allowedTypes.includes(userType)) {
      const redirectTo = redirects[userType] || "/login";
      return <Navigate to={redirectTo} replace />;
    }
    //  Tudp certo → mostra a página protegida
    return children;
  } catch (err) {
    console.error("Erro no ProtectPages:", err);
  }
};

export default ProtectPages;
