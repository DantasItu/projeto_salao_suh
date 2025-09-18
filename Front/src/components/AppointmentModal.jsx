import React from "react";
import Modal from "react-modal";
import { format } from "date-fns";
import TimeSlotGrid from "./TimeSlotGrid";

// Componente para o modal de confirmação de agendamento
const AppointmentModal = ({
  isOpen,
  onRequestClose,
  selectedDate,
  availableTimes,
  selectedTime,
  onTimeSelect,
  onSchedule,
  selectedServices,
  selectedProfessional,
  allServices,
  allUsers,
}) => {
  const professional = allUsers.find(
    (u) => u.id === Number(selectedProfessional)
  );
  const serviceNames = selectedServices
    .map((id) => allServices.find((s) => s.id === Number(id))?.name)
    .join(", ");

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal"
      overlayClassName="overlay"
    >
      <button className="close-modal-button" onClick={onRequestClose}>
        &times;
      </button>
      <h2>Confirmar Agendamento</h2>
      {selectedDate && <p>Data: {format(selectedDate, "dd/MM/yyyy")}</p>}
      <form className="form-modal" onSubmit={onSchedule}>
        <label htmlFor="time-select">Selecione um horário:</label>
        <TimeSlotGrid
          availableTimes={availableTimes}
          selectedTime={selectedTime}
          onTimeSelect={onTimeSelect}
        />

        {selectedServices.length > 0 && (
          <div className="appointment-summary">
            <h4>Resumo do Agendamento</h4>
            <p>
              <strong>Profissional:</strong> {professional?.name}
            </p>
            <p>
              <strong>Serviço(s):</strong> {serviceNames}
            </p>
          </div>
        )}
        <button type="submit" disabled={!selectedTime}>
          Confirmar Agendamento
        </button>
      </form>
    </Modal>
  );
};

export default AppointmentModal;
