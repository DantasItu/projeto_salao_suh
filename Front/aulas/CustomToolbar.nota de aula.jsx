import React from "react";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { useState } from "react";

const CustomToolbar = (props) => {
  const { label, onNavigate, onView, view, date } = props;

  // Define o rótulo para cada aba
  let toolbarLabel = "";
  // Exibe o mês e o ano
  if (view === "month") {
    toolbarLabel = `${format(date, "MMMM  yyyy", {
      locale: ptBR,
    })}`;
  }
  // Exibe a semana
  else if (view === "week") {
    toolbarLabel = `Semana de ${format(date, "dd 'de' MMMM 'de' yyyy", {
      locale: ptBR,
    })}`;
  }
  // Exibe a data completa
  else if (view === "day") {
    toolbarLabel = format(date, "EEEE, dd 'de' MMMM 'de' yyyy", {
      locale: ptBR,
    });
  }
  // Exibe "Agenda" para a aba de agenda
  else if (view === "agenda") {
    toolbarLabel = `Agenda do mês de ${format(date, "MMMM", {
      locale: ptBR,
    })}`;
  }

  return (
    <>
      <div className=".rbc-toolbar">
        <div className="toobar-nav-buton">
          <button
            onClick={() => onNavigate("TODAY")}
            className="toolbar-button"
          >
            hoje
          </button>
          <button onClick={() => onNavigate("PREV")} className="toolbar-button">
            Anterior
          </button>
          <button onClick={() => onNavigate("NEXT")} className="toolbar-button">
            proximo
          </button>
        </div>

        <span className="toolbar-label">{toolbarLabel}</span>

        <div className="toobar-view-button">
          <button onClick={() => onView("month")} className="toolbar-button">
            Mês
          </button>
          <button onClick={() => onView("week")} className="toolbar-button">
            Semana
          </button>
          <button onClick={() => onView("day")} className="toolbar-button">
            Dia
          </button>
          <button
            onClick={() => onView("agenda")}
            className="rbc-toolbar-button"
          >
            Agenda
          </button>
        </div>
      </div>
    </>
  );
};

export default CustomToolbar;
