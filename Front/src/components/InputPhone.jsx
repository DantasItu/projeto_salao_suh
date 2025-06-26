import React from "react";

//  Função para formatar o número de telefone
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

// componente de entrada de telefoneque formata o número enquanto o usuário digita
const InputPhone = ({ value, onChange, ...props }) => {
  const handleChange = (e) => {
    const formattedValue = formatPhone(e.target.value);
    onChange(formattedValue);
  };
  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      {...props}
      maxLength={15}
    />
  );
};
export default InputPhone;
