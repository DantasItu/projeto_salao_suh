import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  getUserID,
  getUserType,
  isAuthenticated,
} from "../utilities/authenticators.js";
import {
  getAppointments,
  getProficionais,
  getServices,
  getUsers,
} from "../Api/authServices.js";
import "../data/styles/MeusAgendamentos.css";

const MeusAgendamentos = () => {
  const [userAppointments, setUserAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }

    let isMounted = true;

    const loadAppointments = async () => {
      try {
        const [appointments, clients, professionals, services] =
          await Promise.all([
            getAppointments(),
            getUsers(),
            getProficionais(),
            getServices(),
          ]);

        const currentUserId = getUserID();
        const isProfessional = ["professional", "profissional"].includes(
          getUserType(),
        );
        const people = isProfessional ? clients : professionals;
        const filteredAppointments = appointments.filter((appointment) =>
          String(
            isProfessional
              ? appointment.professionalId?._id ?? appointment.professionalId
              : appointment.clientId?._id ?? appointment.clientId,
          ) === String(currentUserId),
        );

        const enrichedAppointments = filteredAppointments.map((appointment) => {
          const serviceIds = Array.isArray(appointment.serviceId)
            ? appointment.serviceId
            : [appointment.serviceId];
          const serviceNames = serviceIds
            .map((service) => {
              const serviceId = String(service?._id ?? service);
              return services.find((item) => item.id === serviceId)?.name;
            })
            .filter(Boolean)
            .join(", ");
          const otherPartyId = isProfessional
            ? appointment.clientId
            : appointment.professionalId;
          const otherParty = people.find(
            (person) =>
              person.id === String(otherPartyId?._id ?? otherPartyId),
          );

          return {
            ...appointment,
            title: otherParty?.name || appointment.title || "Desconhecido",
            services: serviceNames || "Serviço não identificado",
          };
        });

        enrichedAppointments.sort(
          (a, b) => new Date(b.start) - new Date(a.start),
        );
        if (isMounted) setUserAppointments(enrichedAppointments);
      } catch (error) {
        console.error("Erro ao carregar seus agendamentos:", error);
        if (isMounted) {
          alert("Não foi possível carregar seus agendamentos. Tente novamente.");
        }
      }
    };

    loadAppointments();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  return (
    <>
      <div className="meus-agendamentos-container">
        <h2>Meus Agendamentos</h2>
        {userAppointments.length > 0 ? (
          <ul className="appointment-list">
            {userAppointments.map((appt) => (
              <li key={appt._id} className="appointment-card">
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
        <br />
        <br />

        <button
          className="botao_criar_agendamento"
          onClick={() => navigate("/agendamento")}
        >
          Novo Agendamento
        </button>
      </div>
    </>
  );
};

export default MeusAgendamentos;
