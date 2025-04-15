import React, { useState, useEffect } from "react"; // Importa React e os hooks useState e useEffect
import { Calendar, dateFnsLocalizer } from "react-big-calendar"; // Importa o componente de calendário
import { format, parse, startOfWeek, getDay } from "date-fns"; // Funções para manipulação de datas
import ptBR from "date-fns/locale/pt-BR"; // Localização em português do Brasil
import { appointments } from "../src/data/dataBase/Appointments"; // Importa os agendamentos do banco de dados
import "react-big-calendar/lib/css/react-big-calendar.css"; // Estilos do calendário

// Configura o localizador de datas para o calendário
const locales = { "pt-BR": ptBR };
const localizer = dateFnsLocalizer({
  format, // Função para formatar datas
  parse, // Função para analisar strings de datas
  startOfWeek, // Define o início da semana
  getDay, // Obtém o dia da semana
  locales, // Localização configurada
});

const BigAgenda = () => {
  // ==========================
  // Estados do componente
  // ==========================
  const [events, setEvents] = useState([...appointments]); // Inicializa os eventos com os dados do banco de dados
  const [currentView, setCurrentView] = useState("month"); // Estado para a visualização atual (mês, semana, etc.)
  const [currentDate, setCurrentDate] = useState(new Date()); // Estado para a data atual
  const [showModal, setShowModal] = useState(false); // Controla a exibição do modal
  const [availableTimes, setAvailableTimes] = useState([]); // Horários disponíveis para agendamento
  const [selectedSlot, setSelectedSlot] = useState(null); // Slot selecionado no calendário
  const [newEventTitle, setNewEventTitle] = useState(""); // Título do novo evento
  const [selectedTime, setSelectedTime] = useState(null); // Horário selecionado no modal
  const [eventDurationHours, setEventDurationHours] = useState(); // Duração do evento em horas
  const [eventDurationMinutes, setEventDurationMinutes] = useState(0); // Duração do evento em minutos

  // ==========================
  // Atualiza os eventos quando o array appointments muda
  // ==========================
  useEffect(() => {
    setEvents([...appointments]); // Sincroniza os eventos com o array appointments
  }, [appointments]); // Executa sempre que o array appointments mudar

  // ==========================
  // Funções auxiliares
  // ==========================
  // Atualiza a visualização atual do calendário
  const handleViewChange = (view) => {
    setCurrentView(view); // Define a nova visualização
    console.log(`Visualização alterada para: ${view}`); // Log para depuração
  };

  // Atualiza a data atual ao navegar no calendário
  const handleNavigate = (date) => {
    setCurrentDate(new Date(date)); // Define a nova data
    console.log(`Navegou para a data: ${date}`); // Log para depuração
  };

  // Calcula horários disponíveis para agendamento
  const calculateAvailableTimes = (date) => {
    const startOfDay = new Date(date.setHours(8, 0, 0, 0)); // Início do dia às 08:00
    const endOfDay = new Date(date.setHours(18, 0, 0, 0)); // Fim do dia às 18:00
    const interval = 30; // Intervalo de 30 minutos
    const times = [];

    // Gera horários disponíveis no intervalo de 30 minutos
    for (
      let time = startOfDay;
      time <= endOfDay;
      time = new Date(time.getTime() + interval * 60000)
    ) {
      times.push(new Date(time));
    }

    // Filtra horários que já estão ocupados
    return times.filter((time) => {
      return !events.some(
        (event) =>
          event.start <= time &&
          time < event.end &&
          event.start.toDateString() === time.toDateString()
      );
    });
  };

  // Quando um slot é selecionado, calcula horários disponíveis e exibe o modal
  const handleSelectSlot = ({ start }) => {
    setSelectedSlot(start); // Define o slot selecionado
    const times = calculateAvailableTimes(start); // Calcula horários disponíveis
    setAvailableTimes(times); // Atualiza os horários disponíveis
    setShowModal(true); // Exibe o modal
  };

  // Adiciona um novo evento ao calendário
  const handleAddEvent = () => {
    if (selectedSlot && newEventTitle && selectedTime) {
      const startEvent = selectedTime; // Define o início do evento
      const durationInMilliseconds =
        eventDurationHours * 60 * 60 * 1000 + eventDurationMinutes * 60 * 1000; // Calcula a duração do evento
      const endEvent = new Date(startEvent.getTime() + durationInMilliseconds); // Define o fim do evento

      // Verifica se o novo evento conflita com eventos existentes
      const hasConflict = events.some(
        (event) =>
          (startEvent >= event.start && startEvent < event.end) || // Início do evento conflita
          (endEvent > event.start && endEvent <= event.end) || // Fim do evento conflita
          (startEvent <= event.start && endEvent >= event.end) // Evento engloba outro evento
      );

      if (hasConflict) {
        alert("O evento se sobrepõe a outro evento existente."); // Alerta de conflito
        return;
      }

      // Adiciona o novo evento ao estado
      setEvents((prevEvents) => [
        ...prevEvents,
        { title: newEventTitle, start: startEvent, end: endEvent },
      ]);

      // Fecha o modal
      setShowModal(false);
    } else {
      alert("Por favor, preencha todos os campos corretamente."); // Alerta de erro
    }
  };

  // ==========================
  // Renderização do componente
  // ==========================
  return (
    <div className="big-agenda-container" style={{ height: 800 }}>
      <h1 className="big-agenda-title">Minha Agenda</h1>
      <Calendar
        localizer={localizer} // Configuração de localização
        events={events} // Lista de eventos
        startAccessor="start" // Define o início do evento
        endAccessor="end" // Define o fim do evento
        className="big-agenda-calendar" // Classe CSS para estilização
        selectable // Permite selecionar slots no calendário
        onSelectSlot={handleSelectSlot} // Ação ao selecionar um slot
        onView={handleViewChange} // Ação ao mudar a visualização
        onNavigate={handleNavigate} // Ação ao navegar no calendário
        view={currentView} // Define a visualização atual
        date={currentDate} // Define a data atual
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

      {showModal && ( // Renderiza o modal apenas se showModal for true
        <div className="big-agenda-modal">
          {" "}
          {/* Container principal do modal */}
          <h3>Selecione um horário disponível</h3> {/* Título do modal */}
          {/* Lista de horários disponíveis */}
          <div>
            {availableTimes.map(
              (
                time // Mapeia os horários disponíveis para criar botões
              ) => (
                <button
                  key={time} // Define uma chave única para cada botão
                  onClick={() => setSelectedTime(time)} // Define o horário selecionado ao clicar no botão
                  className={`big-agenda-time-button ${
                    selectedTime === time ? "selected" : "" // Aplica a classe "selected" se o horário for o selecionado
                  }`}
                >
                  {format(time, "HH:mm")}{" "}
                  {/* Exibe o horário formatado no botão */}
                </button>
              )
            )}
          </div>
          {/* Campo de entrada para o título do evento */}
          <input
            type="text"
            value={newEventTitle} // Valor atual do título do evento
            onChange={(e) => setNewEventTitle(e.target.value)} // Atualiza o título ao digitar
            placeholder="Digite o título do evento" // Placeholder do campo
            className="big-agenda-input" // Classe CSS para estilização
          />
          {/* Campo para definir a duração em horas */}
          <div>
            <label>
              Duração (Horas):
              <input
                type="number"
                value={eventDurationHours} // Valor atual da duração em horas
                onChange={(e) => setEventDurationHours(Number(e.target.value))} // Atualiza a duração ao digitar
                className="big-agenda-input" // Classe CSS para estilização
              />
            </label>
          </div>
          {/* Campo para definir a duração em minutos */}
          <div>
            <label>
              Duração (Minutos):
              <input
                type="number"
                value={eventDurationMinutes} // Valor atual da duração em minutos
                onChange={
                  (e) => setEventDurationMinutes(Number(e.target.value)) // Atualiza a duração ao digitar
                }
                className="big-agenda-input" // Classe CSS para estilização
              />
            </label>
          </div>
          {/* Botão para adicionar o evento */}
          <button
            onClick={handleAddEvent} // Chama a função handleAddEvent ao clicar
            className="big-agenda-modal-button add" // Classe CSS para estilização
          >
            Adicionar Evento
          </button>
          {/* Botão para cancelar e fechar o modal */}
          <button
            onClick={() => setShowModal(false)} // Fecha o modal ao clicar
            className="big-agenda-modal-button cancel" // Classe CSS para estilização
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
};

export default BigAgenda; // Exporta o componente
