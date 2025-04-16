import React, { useState } from "react";
import SingleItem from "./SingleItem";

const SearchBar = ({ searchBarItem, divStyle, text }) => {
  const [searchTerm, setSearchTerm] = useState(""); // Controla o termo de pesquisa

  // Filtra os itens com base no termo de pesquisa
  const filteredItems = searchBarItem.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <input
        className={divStyle}
        type="text"
        placeholder={text}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <br />
      <br />
      <ul>
        {searchTerm && ( // Exibe a lista apenas se houver texto na barra de pesquisa
          <ul>
            {filteredItems.map((currObj) => (
              <li key={currObj.id}>
                <SingleItem {...currObj} />
              </li>
            ))}
          </ul>
        )}
      </ul>
    </>
  );
};

export default SearchBar;
