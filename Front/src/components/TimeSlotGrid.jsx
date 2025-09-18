import React from "react";

// Componente para a grade de horários disponíveis
const TimeSlotGrid = ({ availableTimes, selectedTime, onTimeSelect }) => {
  return (
    <div className="available-times-grid">
      {availableTimes.length > 0 ? (
        availableTimes.map((time) => (
          <button
            key={time}
            type="button"
            className={`time-slot-button ${
              selectedTime === time ? "selected" : ""
            }`}
            onClick={() => onTimeSelect(time)}
          >
            {time}
          </button>
        ))
      ) : (
        <p>Nenhum horário disponível para este dia/serviço.</p>
      )}
    </div>
  );
};

export default TimeSlotGrid;
