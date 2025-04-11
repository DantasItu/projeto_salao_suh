import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";

import BigAgenda from "./components/BigAgenda.jsx";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/bigagenda" element={<BigAgenda />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
