import React, { useState } from "react";
import { servicesArray } from "../data/dataBase/Services";

const ListService = () => {
  const [visibleServices, setVisibleServices] = useState(5); // Controla quantos serviços são exibidos
  const [searchTerm, setSearchTerm] = useState(""); // Controla o termo de pesquisa

  // Filtra os serviços com base no termo de pesquisa
  const filteredServices = servicesArray.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Exibe apenas os serviços visíveis
  const displayedServices = filteredServices.slice(0, visibleServices);

  return (
    <div className="listService">
      <input
        type="text"
        placeholder="Pesquisar serviços..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {displayedServices.map((service) => (
          <li key={service.id}>
            <h3>{service.name}</h3>
            <p>{service.description}</p>
            <p>Preço: R${service.price.toFixed(2)}</p>
          </li>
        ))}
      </ul>
      {visibleServices < filteredServices.length && (
        <button onClick={() => setVisibleServices(visibleServices + 5)}>
          Mostrar mais
        </button>
      )}
      {visibleServices > 5 && (
        <button onClick={() => setVisibleServices(visibleServices - 5)}>
          Mostrar menos
        </button>
      )}
    </div>
  );
};

export default ListService;
