import React, { useState, useCallback } from "react";

const RegisterClient = () => {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // logica para formatação do telefone
  const formatPhone = (value) => {
    //  remove todos os caracteres não numéricos
    const cleaned = ("" + value).replace(/\D/g, "");
    // aplicar formatação em cascata
    // começa formatando o DDD
    let formatted = cleaned.replace(/^(\d{2})/, "($1) ");
    // Adicionar o hifen para telefones com 11 digitos
    formatted = formatted.replace(/(\d{2})(\d{5})/, "$1-$2");
    // Adicionar o hifen para telefones com 10 digitos
    formatted = formatted.replace(/(\d{2})(\d{4})/, "$1-$2");
    // Garante que o último hífen seja aplicado corretamente ao final dos 8 ou 9 dígitos
    // Esta regex é mais "gulosa" e pega o último grupo de 4 dígitos
    formatted = formatted.replace(/(\d{4,5})-(\d{4})$/, "$1-$2");
  };
  return <div>Register</div>;
};

export default RegisterClient;
