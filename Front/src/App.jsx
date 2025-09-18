import React from "react";
import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";
import Home from "./pages/home";
import LoginPage from "./pages/Login.jsx";
import Calendario from "./components/Calendario.jsx";
import ProtectPages from "./pages/ProtectPages.jsx";
import RegisterClient from "./pages/RegisterClient.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import NewPassword from "./pages/newPassword.jsx";
import ListaDeAgendamentos from "./pages/ListaDeAgendamentos.jsx";
import AgendamentoCliente from "./pages/AgendamentoCliente.jsx";

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
              <ProtectPages allowedTypes={["admin", null]}>
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
            path="/forgotPassword"
            element={
              <ProtectPages
                allowedTypes={[null]}
                redirects={{ admin: "/", cliente: "/", profissional: "/" }}
              >
                <ForgotPassword />
              </ProtectPages>
            }
          />

          <Route
            path="/newPassword"
            element={
              <ProtectPages
                allowedTypes={[null]}
                redirects={{ admin: "/", cliente: "/", profissional: "/" }}
              >
                <NewPassword />
              </ProtectPages>
            }
          />
          <Route path="*" element={<h1>404 - Not Found</h1>} />
          <Route
            path="/agendamento"
            element={
              <ProtectPages
                allowedTypes={[null, "cliente", "admin"]}
                // redirects={{ admin: "/", profissional: "/" }}
              >
                <AgendamentoCliente />
              </ProtectPages>
            }
          />
          <Route
            path="/listAgenda"
            element={
              <ProtectPages
                allowedTypes={[null, "cliente", "admin", "profissional"]}
                // redirects={{ admin: "/", profissional: "/" }}
              >
                <ListaDeAgendamentos />
              </ProtectPages>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
