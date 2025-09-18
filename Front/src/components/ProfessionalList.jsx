import React from "react";

// Componente para exibir a lista de profissionais
const ProfessionalList = ({
  professionals,
  selectedProfessional,
  onSelectProfessional,
}) => {
  return (
    <div className="professional-list-container">
      {professionals.map((prof) => (
        <div
          key={prof.id}
          className={`professional-item-card ${
            selectedProfessional === String(prof.id) ? "selected-item" : ""
          }`}
          onClick={() => onSelectProfessional(String(prof.id))}
        >
          <img
            src={prof.image}
            alt={prof.name}
            className="professional-item-card_image"
          />
          <p className="professional-item-card_name">{prof.name}</p>
          <p className="professional-item-card_role">{prof.role}</p>
        </div>
      ))}
    </div>
  );
};

export default ProfessionalList;
