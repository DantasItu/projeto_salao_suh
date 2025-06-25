import React from "react";

const ImputPhone = () => {
  // Função para formatar o telefone conforme o usuário digita
  const formatPhone = (value) => {
    const cleaned = value.replace(/\D/g, ""); // Remove tudo que não for número
    let formatted = cleaned; // Inicializa a variável formatada

    if (cleaned.length <= 2) {
      formatted = cleaned; // Apenas DDD
    } else if (cleaned.length <= 6) {
      // DDD + início do número
      formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    } else if (cleaned.length <= 10) {
      // DDD + parte do número + traço
      formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(
        2,
        6
      )}-${cleaned.slice(6)}`;
    } else {
      // DDD + número completo (até 11 dígitos)
      formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(
        2,
        7
      )}-${cleaned.slice(7, 11)}`;
    }
    return formatted; // Retorna o telefone formatado
  };

  // Função chamada ao alterar o campo de telefone
  const handlePhoneChange = (e) => {
    const value = e.target.value; // Pega o valor digitado
    setPhone(formatPhone(value)); // Atualiza o estado já formatando
  };

  return (
    <div>
      <label>
        Telefone:
        <input
          type="text" // Campo de texto
          value={phone} // Valor controlado pelo estado phone
          onChange={handlePhoneChange} // Chama a função ao digitar
          maxLength={15} // Limita o tamanho do campo
        />
      </label>
    </div>
  );
};

export default ImputPhone;
