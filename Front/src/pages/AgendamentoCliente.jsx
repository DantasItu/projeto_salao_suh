import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar.jsx";
import logo from "../data/icon/logo redondo.png";
import { isAuthenticated, getUserName } from "../utilities/authenticators.js";
import Calendario from "../components/Calendario.jsx";
import { appointments } from "../data/dataBase/Appointments.js";
import { users } from "../data/dataBase/Users.js";
import "../data/styles/AgendamentoCliente.css";

const AgendamentoCliente = () => {
  // FUNÇÕES DE ESTADOS
  const [userName, setUserName] = useState(null);
  const [appointmentsList, setAppointmentsList] = useState([]);
  const [selectedProfessional, setSelectedProfessional] = useState(null);

  const navigate = useNavigate();

  // Verifica se o usuário está autenticado ao carregar o componente
  useEffect(() => {
    if (isAuthenticated()) {
      setUserName(getUserName());
    }
  }, []);

  // FUNÇÃO DE LOGOUT
  const Logout = () => {
    localStorage.removeItem("token");
    setUserName(null);
    navigate("/");
  };

  const listProfessional = users
    .filter((user) => user.type === "professional")
    .map((prof) => ({
      id: prof.id,
      name: prof.name,
    }));
  console.log(listProfessional);

  // Carregar a lista de agendamentos ao montar o componente sem nome e sem o serviço somente com a data
  useEffect(() => {
    if (!selectedProfessional) {
      setAppointmentsList([]);
      return;
    }
    const filteredAppointments = appointments
      .filter(
        (appointment) =>
          appointment.professionalId === Number(selectedProfessional)
      )
      .map((appointment) => ({
        start: appointment.start,
        end: appointment.end,
        title: "Ocupado",
      }));
    setAppointmentsList(filteredAppointments);
  }, [selectedProfessional]);

  return (
    <>
      <div className="header">
        <Link to="/">
          <img className="logo" src={logo} />
        </Link>
        <div className="header__text">
          <h1>Suelen beserra</h1>
          <h3>Cabelereira</h3>
        </div>

        <div className="header_button">
          {userName ? (
            <div className="header_user">
              <span className="header_user_anuciado">Olá, {userName}</span>
              <button className="header__button_logout" onClick={Logout}>
                Sair
              </button>
            </div>
          ) : (
            <Link to="/login" className="header__button_login">
              Login
            </Link>
          )}
        </div>
      </div>
      <Navbar />

      <div className="container-agendamento">
        <div className="menu-calendario">
          <h2>Selecione um dia e Horario disponivel.</h2>
          <select
            value={selectedProfessional || ""}
            onChange={(e) => setSelectedProfessional(e.target.value)}
          >
            <option value="">Selecione um profissional</option>
            {listProfessional.map((prof) => (
              <option key={prof.id} value={prof.id}>
                {prof.name}
              </option>
            ))}
          </select>
        </div>
        <Calendario appointments={appointmentsList} />
      </div>
    </>
  );
};

export default AgendamentoCliente;
