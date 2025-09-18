import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { isAuthenticated, getUserName } from "../utilities/authenticators.js";
import { appointments as mockAppointments } from "../data/dataBase/Appointments.js";
import { users } from "../data/dataBase/Users.js";
import { servicesArray as allServices } from "../data/dataBase/Services.js";
import "../data/styles/MeusAgendamentos.css";

const MeusAgendamentos = () => {
  const [userAppointments, setUserAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }

    const currentUserName = getUserName();

    const currentUser = users.find((user) => user.name === currentUserName);

    if (!currentUser) {
      return;
    }

    const currentUserId = currentUser.id;
    const currentUserType = currentUser.type;

    const storedAppointments = localStorage.getItem("myAppointments");
    let allAppointments = mockAppointments;

    if (storedAppointments) {
      const parsedAppointments = JSON.parse(storedAppointments).map((appt) => ({
        ...appt,
        start: new Date(appt.start),
        end: new Date(appt.end),
      }));
      allAppointments = [...mockAppointments, ...parsedAppointments];
    }

    let filteredAppointments = [];

    if (currentUserType === "professional") {
      filteredAppointments = allAppointments.filter(
        (appt) => appt.professionalId === currentUserId
      );
    } else {
      filteredAppointments = allAppointments.filter(
        (appt) => appt.clientId === currentUserId
      );
    }

    const enrichedAppointments = filteredAppointments.map((appt) => {
      const serviceIds = Array.isArray(appt.serviceId)
        ? appt.serviceId
        : [appt.serviceId];
      const services = serviceIds
        .map((id) => allServices.find((s) => s.id === id)?.name)
        .join(", ");

      const otherParty =
        currentUserType === "professional"
          ? users.find((u) => u.id === appt.clientId)
          : users.find((u) => u.id === appt.professionalId);

      return { ...appt, title: otherParty?.name || "Desconhecido", services };
    });

    enrichedAppointments.sort((a, b) => new Date(b.start) - new Date(a.start));
    setUserAppointments(enrichedAppointments);
  }, [navigate]);

  return (
    <>
      <div className="meus-agendamentos-container">
        <h2>Meus Agendamentos</h2>
        {userAppointments.length > 0 ? (
          <ul className="appointment-list">
            {userAppointments.map((appt) => (
              <li key={appt.id} className="appointment-card">
                <div className="appointment-card-header">
                  <h3>{appt.title}</h3>
                  <span className="appointment-date">
                    {format(new Date(appt.start), "dd/MM/yyyy", {
                      locale: ptBR,
                    })}
                  </span>
                </div>
                <div className="appointment-card-body">
                  <p>
                    <strong>Serviço(s):</strong> {appt.services}
                  </p>
                  <p>
                    <strong>Horário:</strong>{" "}
                    {format(new Date(appt.start), "HH:mm")} -{" "}
                    {format(new Date(appt.end), "HH:mm")}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-appointments-message">
            Você ainda não possui agendamentos.
          </p>
        )}
      </div>
    </>
  );
};

export default MeusAgendamentos;
