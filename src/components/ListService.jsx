import React, { useState } from "react";
import { servicesArray } from "../data/dataBase/Services";
import SearchBar from "./SearchBar.jsx";

const ListService = () => {
  const [visibleServices, setVisibleServices] = useState(5); // Controla quantos serviços são exibidos

  return (
    <>
      <div className="listService_container">
        <h1 className="listService_title">Serviços</h1>
        <div className="listService_searchBar">
          <SearchBar />
        </div>
      </div>
    </>
  );
};

export default ListService;
