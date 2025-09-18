import React from "react";
import SingleItem from "./SingleItem";

// Componente para exibir a lista de serviços
const ServiceList = ({
  services,
  selectedServices,
  onServiceToggle,
  disabled,
}) => {
  if (services.length === 0) {
    return <p>Nenhum serviço disponível para este profissional.</p>;
  }

  return (
    <div className={`service-list-container ${disabled ? "disabled" : ""}`}>
      {services.map((service) => (
        <SingleItem
          key={service.id}
          {...service}
          divStyle="service-item-card"
          view_button={false}
          onClick={() => onServiceToggle(service.id)}
          isSelected={selectedServices.includes(String(service.id))}
        />
      ))}
    </div>
  );
};

export default ServiceList;
