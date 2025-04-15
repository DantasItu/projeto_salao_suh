import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { appointments } from "../data/dataBase/Appointments";
import { height } from "@fortawesome/free-brands-svg-icons/fa42Group";
import { months } from "moment/moment";
import "../data/styles/Calendario.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

//\\=============================//\\
//\\ Definições de Localização //\\
// \\=========================//\\
const customFormat = (date, formatStr, options) => {
  return format(date, formatStr, { ...options, locale: ptBR });
};
const localizer = dateFnsLocalizer({
  format: customFormat,
  parse,
  startOfWeek,
  getDay,
  locales: { "pt-BR": ptBR },
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
    <>
      <div className="calendario-container">
        <Calendar
          localizer={localizer}
          events={events}
          selectable
          view={currentView}
          onView={handleViewChange}
          onNavigate={handleNaveChange}
          className="calendario"
          date={currentDate}
          // components={{
          //   toolbar: CustomToolbar,

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
    </>
  );
};

export default Calendario;
