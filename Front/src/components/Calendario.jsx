import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, set } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { appointments } from "../data/dataBase/Appointments";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../data/styles/Calendario.css";

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
  }, [appointments]); // execulta sempre que ouver alterações no banco de dados

  //              ----//--------      //

  //\\============================//\\
  //\\   Container de Funções   //\\
  // \\=========================//\\
  const [events, setEvents] = useState([...appointments]); // arquivos inicias
  const [currentView, setCurrentView] = useState("month"); // view atual do calendário
  const [currentDate, setCurrentDate] = useState(new Date()); // data atual do calendário
  const [selectedDate, setSelectedDate] = useState(null); // data selecionada no calendário

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

  // qundo clicar em um dia do calendario
  const handleSelectSlot = (slotInfo) => {
    setSelectedDate(slotInfo.start); // Atualiza a data selecionada
    console.log("Data selecionada:", slotInfo.start);
  };

  // retorno do que sera ixibido no calendario
  return (
    <>
      <div className="calendario-container">
        <Calendar
          localizer={localizer}
          events={events}
          view={currentView}
          onView={handleViewChange}
          onNavigate={handleNaveChange}
          className="calendario"
          date={currentDate}
          selectable={true}
          onSelectSlot={handleSelectSlot}
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
