import React from "react";

// Componente para o resumo dos serviços selecionados
const SelectedServicesSummary = ({
  selectedServices,
  allServices,
  servicesConfirmed,
  onConfirm,
  onEdit,
}) => {
  if (selectedServices.length === 0) {
    return null;
  }

  return (
    <div className="selected-services-summary">
      <h4>Serviços Selecionados</h4>
      <ul>
        {selectedServices.map((id) => {
          const service = allServices.find((s) => s.id === Number(id));
          return <li key={id}>{service?.name}</li>;
        })}
      </ul>
      <button
        onClick={servicesConfirmed ? onEdit : onConfirm}
        className="confirm-services-button"
      >
        {servicesConfirmed ? "Alterar Serviços" : "Confirmar e Ver Agenda"}
      </button>
    </div>
  );
};

export default SelectedServicesSummary;
