import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Calendario from "./components/Calendario.jsx";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calendario" element={<Calendario />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
