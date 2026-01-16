import React, { useState } from "react";
import Header from "../components/Header.jsx";
import Funcionarios from "../components/dashboard_components/Funcionarios.jsx";
import Clientes from "../components/dashboard_components/Clientes.jsx";
import Servicos from "../components/dashboard_components/Servicos.jsx";
import Agendamentos from "../components/dashboard_components/Agendamentos.jsx";
import Relatorios from "../components/dashboard_components/Relatorios.jsx";

const Dashboard = () => {
  // Função para abrir e fechar as seções
  const [activeSection, setActiveSection] = useState(null);

  const abrirFecharRender = (setNameSection) => {
    if (activeSection === setNameSection) {
      setActiveSection(null);
    } else {
      setActiveSection(setNameSection);
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case "funcionarios":
        return <Funcionarios />;
      case "clientes":
        return <Clientes />;
      case "servicos":
        return <Servicos />;
      case "agendamentos":
        return <Agendamentos />;
      case "relatorios":
        return <Relatorios />;
      default:
        return <div>Selecione uma opção no menu.</div>;
    }
  };

  return (
    <>
      <header>
        <Header showNavbar={false} />
        <h1>Bem vindo ao Painel de Controle</h1>
      </header>
      <main>
        {/* navBar da Dashboard */}
        <section>
          <ul>
            <li>
              <button onClick={() => abrirFecharRender("funcionarios")}>
                Funcionarios
              </button>
            </li>
            <li>
              <button onClick={() => abrirFecharRender("clientes")}>
                Clientes
              </button>
            </li>
            <li>
              <button onClick={() => abrirFecharRender("servicos")}>
                Serviços
              </button>
            </li>
            <li>
              <button onClick={() => abrirFecharRender("agendamentos")}>
                Agendamentos
              </button>
            </li>
            <li>
              <button onClick={() => abrirFecharRender("relatorios")}>
                Relatórios
              </button>
            </li>
          </ul>
          {/* Show conteudo dos buttons */}
        </section>
        <section>{renderSection()}</section>
      </main>
    </>
  );
};

export default Dashboard;
