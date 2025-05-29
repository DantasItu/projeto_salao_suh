import React, { useState } from "react";
import SingleItem from "./SingleItem";

const SearchBar = ({ searchBarItem, divStyle, text, view_button }) => {
  const [searchTerm, setSearchTerm] = useState(""); // Controla o termo de pesquisa

  // Filtra os itens com base no termo de pesquisa
  const filteredItems = searchBarItem.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <input
        className={divStyle}
        style={{ position: "relative", width: "200px" }}
        type="text"
        placeholder={text}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <br />
      <br />
      <ul>
        {searchTerm && ( // Exibe a lista apenas se houver texto na barra de pesquisa
          <ul className={`${divStyle}_result`}>
            {filteredItems.map((currObj) => (
              <li key={currObj.id}>
                <SingleItem
                  {...currObj}
                  divStyle={"listService_singleItem"}
                  view_button={view_button}
                />
              </li>
            ))}
          </ul>
        )}
      </ul>
    </>
  );
};

export default SearchBar;
