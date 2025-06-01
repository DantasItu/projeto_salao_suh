import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/Login.jsx";
import Calendario from "./components/Calendario.jsx";
import ProtectPages from "./pages/ProtectPages.jsx";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/calendario"
            element={
              <ProtectPages allowedTypes={["admin"]}>
                <Calendario />
              </ProtectPages>
            }
          />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
