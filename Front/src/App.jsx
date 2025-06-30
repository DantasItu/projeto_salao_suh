import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import LoginPage from "./pages/Login.jsx";
import Calendario from "./components/Calendario.jsx";
import ProtectPages from "./pages/ProtectPages.jsx";
import RegisterClient from "./pages/RegisterClient.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectPages
                allowedTypes={[null, "cliente", "admin"]}
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
            path="/registerClient"
            element={
              <ProtectPages
                allowedTypes={[null]}
                redirects={{ admin: "/", cliente: "/", profissional: "/" }}
              >
                <RegisterClient />
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
          <Route
            path="/resetPassword"
            element={
              <ProtectPages
                allowedTypes={[null]}
                redirects={{ admin: "/", cliente: "/", profissional: "/" }}
              >
                <ResetPassword />
              </ProtectPages>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
