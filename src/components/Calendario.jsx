import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { appointments } from "../data/dataBase/Appointments";
import { height } from "@fortawesome/free-brands-svg-icons/fa42Group";
import { months } from "moment/moment";

//\\=============================//\\
//\\ Definições de Localização //\\
// \\=========================//\\
const locales = { "pt-BR": ptBR };
const localizer = dateFnsLocalizer({
  format, // Função para formatar datas
  parse, // Função para analisar strings de datas
  startOfWeek, // Define o início da semana
  getDay, // Obtém o dia da semana
  locales, // Localização configurada
});

const Calendario = () => {
  useEffect(() => {
    setEvents([...appointments]);
  }, [appointments]); // execulta sempre que ouver alterações no bando de dados

  //              ----//--------      //

  //\\============================//\\
  //\\   Container de Funções   //\\
  // \\=========================//\\
  const [events, setEvents] = useState([...appointments]); // arquivos inicias
  const [currentView, setCurrentView] = useState("month"); // view atual do calendário
  const [currentDate, setCurrentDate] = useState(new Date()); // data atual do calendário

  //\\==================================//\\
  //\\ Container de Funções Auxiliares //\\
  // \\===============================//\\

  //   Função para lidar com a mudança de visualização do calendário
  const handleViewChange = (view) => {
    setCurrentView(view); // Atualiza a view atual
  };
  const handleNaveChange = (date) => {
    setCurrentDate(date); // Atualiza a data atual
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Calendar
        localizer={localizer}
        events={events}
        selectable
        view={currentView}
        style={{ height: 800, width: "80%", margin: 10 }}
        onView={handleViewChange}
        onNavigate={handleNaveChange}
        date={currentDate}
        messages={{
          next: "Proximo",
          previous: "Anterior",
          today: "Hoje",
          month: "Mês",
          week: "Semana",
          day: "Dia",
          noEventsInRange: "Não há eventos neste periodo",
          allDay: "Dia todo",
          date: "Data",
          time: "Hora",
          event: "Evento",
          showMore: (total) => `mais ${total} eventos`,
          agenda: "Agenda",
          view: "Visualização",
          allEvents: "Todos os eventos",
          allDayEvent: "Evento de dia todo",
          delete: "Deletar",
        }}
      />
    </div>
  );
};

export default Calendario;
