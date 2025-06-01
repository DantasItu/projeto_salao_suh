import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import LoginPage from "./pages/Login.jsx";
import Calendario from "./components/Calendario.jsx";
import ProtectPages from "./pages/ProtectPages.jsx";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectPages
                allowedTypes={[null, "cliente"]}
                redirects={{ admin: "/calendario" }}
              >
                <Home />
              </ProtectPages>
            }
          />
          <Route
            path="/calendario"
            element={
              <ProtectPages allowedTypes={["admin"]}>
                <Calendario />
              </ProtectPages>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectPages
                allowedTypes={[null]}
                redirects={{ admin: "/", cliente: "/", profissional: "/" }}
              >
                <LoginPage />
              </ProtectPages>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
