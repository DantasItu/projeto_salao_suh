import React, { useState } from "react";
import SearchBar from "./SearchBar.jsx";
import { servicesArray } from "../data/dataBase/Services.js";
import ItemList from "./ItemList.jsx";

const ListService = () => {
  const [visibleServices, setVisibleServices] = useState(5); // Controla quantos serviços são exibidos

  return (
    <>
      <div className="listService_container">
        <h1 className="listService_title">Serviços</h1>
        <div className="listService_searchBar">
          <SearchBar
            searchBarItem={servicesArray}
            divStyle="listService_searchBar_input"
          />
        </div>
        <ItemList itemsArrays={servicesArray} />
      </div>
    </>
  );
};

export default ListService;
