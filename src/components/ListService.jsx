import React, { useState } from "react";
import SearchBar from "./SearchBar.jsx";
import { servicesArray } from "../data/dataBase/Services.js";
import ItemList from "./ItemList.jsx";

const ListService = () => {
  const [items, setItems] = useState(5); // Controla quantos serviços são exibidos

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
        <ItemList
          itemsArrays={servicesArray}
          divStyle="listService_singleItem"
          items={items}
        />
      </div>
      <div className="listService__navItems">
        <p
          className="listService__see-more"
          onClick={() => {
            setItems(items + 5);
          }}
        >
          Ver Mais
        </p>
        {items > 5 && (
          <p
            className="listService__see-less"
            onClick={() => {
              setItems(items - 5);
            }}
          >
            Vermenos
          </p>
        )}
      </div>
    </>
  );
};

export default ListService;
