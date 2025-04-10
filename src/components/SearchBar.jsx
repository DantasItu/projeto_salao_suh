import React, { useState } from "react";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Controla o termo de pesquisa

  return (
    <>
      <input
        type="text"
        placeholder="Pesquisar serviços..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </>
  );
};

export default SearchBar;
