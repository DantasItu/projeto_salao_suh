import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./BigAgenda.css";

const locales = {
  "pt-BR": ptBR,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const BigAgenda = () => {
  const [events, setEvents] = useState([
    {
      title: "Reunião de equipe",
      start: new Date(2025, 3, 11, 10, 0), // 11 de abril de 2025, 10:00
      end: new Date(2025, 3, 11, 10, 30), // 11 de abril de 2025, 11:00
    },
    {
      title: "Consulta médica",
      start: new Date(2025, 3, 12, 14, 0), // 12 de abril de 2025, 14:00
      end: new Date(2025, 3, 12, 15, 0), // 12 de abril de 2025, 15:00
    },
  ]);

  const [currentView, setCurrentView] = useState("month"); // Estado para a visualização atual
  const [currentDate, setCurrentDate] = useState(new Date()); // Estado para a data atual
  const [showModal, setShowModal] = useState(false); // Controla a exibição do modal
  const [availableTimes, setAvailableTimes] = useState([]); // Horários disponíveis
  const [selectedSlot, setSelectedSlot] = useState(null); // Slot selecionado
  const [newEventTitle, setNewEventTitle] = useState(""); // Título do novo evento
  const [selectedTime, setSelectedTime] = useState(null); // Horário selecionado
  const [eventDuration, setEventDuration] = useState(30); // Duração do evento
  const [eventDurationHours, setEventDurationHours] = useState(0); // Duração em horas
  const [eventDurationMinutes, setEventDurationMinutes] = useState(30); // Duração em minutos

  const handleViewChange = (view) => {
    setCurrentView(view);
    console.log(`Visualização alterada para: ${view}`);
  };

  const handleNavigate = (date, view) => {
    setCurrentDate(new Date(date)); // Atualiza a data atual
    console.log(`Navegou para a data: ${date}, na visualização: ${view}`);
  };

  const calculateAvailableTimes = (date) => {
    const startOfDay = new Date(date.setHours(8, 0, 0, 0)); // Início do dia às 08:00
    const endOfDay = new Date(date.setHours(18, 0, 0, 0)); // Fim do dia às 18:00
    const interval = 30; // Intervalo de 30 minutos
    const times = [];

    for (
      let time = startOfDay;
      time <= endOfDay;
      time = new Date(time.getTime() + interval * 60000)
    ) {
      times.push(new Date(time));
    }

    // Filtra horários ocupados
    return times.filter((time) => {
      return !events.some(
        (event) =>
          event.start <= time &&
          time < event.end &&
          event.start.toDateString() === time.toDateString()
      );
    });
  };

  const handleSelectSlot = ({ start }) => {
    if (currentView === "month" || currentView === "week") {
      // Verifica se a visualização atual é "month"
      setSelectedSlot(start); // Define o slot selecionado
      const times = calculateAvailableTimes(start);
      setAvailableTimes(times); // Define os horários disponíveis
      setShowModal(true); // Exibe o modal
    }
  };

  const handleAddEvent = () => {
    if (selectedSlot && newEventTitle && selectedTime) {
      const startEvent = selectedTime;
      const durationInMilliseconds =
        eventDurationHours * 60 * 60 * 1000 + eventDurationMinutes * 60 * 1000;
      const endEvent = new Date(startEvent.getTime() + durationInMilliseconds); // Calcula o horário de término

      // Verifica se o evento se sobrepõe a outros eventos
      const hasConflict = events.some(
        (event) =>
          (startEvent >= event.start && startEvent < event.end) || // Início do novo evento está dentro de outro evento
          (endEvent > event.start && endEvent <= event.end) || // Fim do novo evento está dentro de outro evento
          (startEvent <= event.start && endEvent >= event.end) // Novo evento engloba outro evento
      );

      if (hasConflict) {
        alert("O evento se sobrepõe a outro evento existente.");
        return;
      }

      // Adiciona o evento ao estado
      setEvents((prevEvents) => [
        ...prevEvents,
        { title: newEventTitle, start: startEvent, end: endEvent },
      ]);

      // Recalcula os horários disponíveis
      const updatedTimes = calculateAvailableTimes(selectedSlot);
      setAvailableTimes(updatedTimes);

      // Reseta os campos
      setNewEventTitle("");
      setSelectedTime(null);
      setEventDurationHours(0);
      setEventDurationMinutes(30);

      // Fecha o modal após garantir que o estado foi atualizado
      setShowModal(false);
    } else {
      alert("Por favor, preencha todos os campos corretamente.");
    }
  };

  return (
    <div className="big-agenda-container">
      <h1 className="big-agenda-title">Minha Agenda</h1>
      <p className="big-agenda-info">Visualização atual: {currentView}</p>
      <p className="big-agenda-info">
        Data atual: {currentDate.toLocaleDateString("pt-BR")}
      </p>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        className="big-agenda-calendar"
        selectable
        onSelectSlot={handleSelectSlot}
        onView={handleViewChange}
        onNavigate={handleNavigate}
        view={currentView}
        date={currentDate}
        messages={{
          next: "Próximo",
          previous: "Anterior",
          today: "Hoje",
          month: "Mês",
          week: "Semana",
          day: "Dia",
          agenda: "Agenda",
          noEventsInRange: "Nenhum evento neste período.",
        }}
      />

      {showModal && (
        <div className="big-agenda-modal">
          <h3>Selecione um horário disponível</h3>
          <div>
            {availableTimes.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`big-agenda-time-button ${
                  selectedTime === time ? "selected" : ""
                }`}
              >
                {format(time, "HH:mm")}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={newEventTitle}
            onChange={(e) => setNewEventTitle(e.target.value)}
            placeholder="Digite o título do evento"
            className="big-agenda-input"
          />
          <div>
            <label>
              Duração (Horas):
              <input
                type="number"
                value={eventDurationHours}
                onChange={(e) => setEventDurationHours(Number(e.target.value))}
                className="big-agenda-input"
              />
            </label>
          </div>
          <div>
            <label>
              Duração (Minutos):
              <input
                type="number"
                value={eventDurationMinutes}
                onChange={(e) =>
                  setEventDurationMinutes(Number(e.target.value))
                }
                className="big-agenda-input"
              />
            </label>
          </div>
          <button
            onClick={handleAddEvent}
            className="big-agenda-modal-button add"
          >
            Adicionar Evento
          </button>
          <button
            onClick={() => setShowModal(false)}
            className="big-agenda-modal-button cancel"
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
};

export default BigAgenda;
