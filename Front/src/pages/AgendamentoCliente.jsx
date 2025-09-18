import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  addMinutes,
  format,
  set,
  isBefore,
  isSameDay,
  startOfDay,
} from "date-fns";
import {
  isAuthenticated,
  getUserName,
  getUserID,
} from "../utilities/authenticators.js";
import Calendario from "../components/Calendario.jsx";
import Modal from "react-modal";
import { appointments } from "../data/dataBase/Appointments.js";
import { users } from "../data/dataBase/Users.js";
import { servicesArray as Services } from "../data/dataBase/Services.js";
import Header from "../components/Header.jsx";
import ProfessionalList from "../components/ProfessionalList.jsx";
import ServiceList from "../components/ServiceList.jsx";
import SelectedServicesSummary from "../components/SelectedServicesSummary.jsx";
import AppointmentModal from "../components/AppointmentModal.jsx";
import "../data/styles/AgendamentoCliente.css";

// Define o elemento raiz da aplicação para o Modal, melhorando a acessibilidade.
Modal.setAppElement("#root");

const AgendamentoCliente = () => {
  // =================================================================
  // GERENCIAMENTO DE ESTADOS (STATES)
  // =================================================================
  const [userName, setUserName] = useState(null); // Armazena o nome do usuário logado.
  const [selectedProfessional, setSelectedProfessional] = useState(null); // Armazena o ID do profissional selecionado.
  const [selectedServices, setSelectedServices] = useState([]); // Armazena os IDs dos serviços selecionados.
  const [modalIsOpen, setModalIsOpen] = useState(false); // Controla a visibilidade do modal de agendamento.
  const [servicesConfirmed, setServicesConfirmed] = useState(false); // Controla se a seleção de serviços foi confirmada.
  const [appointmentsList, setAppointmentsList] = useState([]); // Armazena a lista de agendamentos a ser exibida no calendário.
  const [selectedDate, setSelectedDate] = useState(null); // Armazena a data que o usuário clica no calendário.
  const [allAppointments, setAllAppointments] = useState([]); // Armazena TODOS os agendamentos (do mock e os novos).
  const [availableTimes, setAvailableTimes] = useState([]); // Armazena os horários disponíveis calculados para o dia/serviço.
  const [selectedTime, setSelectedTime] = useState(""); // Armazena o horário que o usuário seleciona no modal.

  const navigate = useNavigate();

  // =================================================================
  // EFEITOS COLATERAIS (USEEFFECT)
  // =================================================================

  // Efeito para verificar a autenticação do usuário ao carregar o componente.
  useEffect(() => {
    if (isAuthenticated()) {
      setUserName(getUserName());
    }
  }, []);

  // Efeito para carregar os agendamentos do localStorage ou do arquivo de mock na primeira vez.
  useEffect(() => {
    // Tenta carregar os agendamentos do localStorage.
    const storedAppointments = localStorage.getItem("myAppointments");
    let initialAppointments;

    if (storedAppointments) {
      // Se encontrou, converte de JSON, garantindo que as datas sejam objetos Date.
      initialAppointments = JSON.parse(storedAppointments).map((appt) => ({
        ...appt,
        start: new Date(appt.start),
        end: new Date(appt.end),
      }));
    } else {
      // Se não, usa a lista inicial do arquivo de mock.
      initialAppointments = appointments; // from import
    }
    setAllAppointments(initialAppointments);
  }, []);

  // Efeito para resetar o serviço selecionado sempre que o profissional for alterado.
  // Isso evita que um serviço de um profissional antigo permaneça selecionado.
  useEffect(() => {
    setSelectedServices([]);
    setServicesConfirmed(false);
  }, [selectedProfessional]);

  // Efeito para carregar e filtrar os agendamentos do profissional selecionado.
  // Os agendamentos de outros clientes são exibidos como "Horário Ocupado".
  useEffect(() => {
    // Se nenhum profissional estiver selecionado, limpa a lista de agendamentos.
    if (!selectedProfessional) {
      setAppointmentsList([]);
      return;
    }

    // Filtra os agendamentos do mock 'appointments' para o profissional selecionado.
    const filteredAppointments = allAppointments
      .filter(
        (appointment) =>
          appointment.professionalId === Number(selectedProfessional)
      )
      .map((appointment) => ({
        start: appointment.start,
        end: appointment.end,
        // Se o agendamento pertence ao usuário logado, mostra o nome dele, senão, mostra um texto genérico.
        title:
          appointment.title === getUserName()
            ? getUserName()
            : "Horário Ocupado",
      }));
    setAppointmentsList(filteredAppointments);
  }, [selectedProfessional, userName, allAppointments]);

  // Efeito para calcular os horários disponíveis quando uma data e um serviço são selecionados.
  useEffect(() => {
    // Se não houver data ou os serviços não estiverem confirmados, limpa a lista de horários.
    if (!selectedDate || !servicesConfirmed || selectedServices.length === 0) {
      setAvailableTimes([]);
      return;
    }

    // Calcula a duração total e o status de bloqueio de todos os serviços selecionados
    const { totalDuration, isBlocking } = selectedServices.reduce(
      (acc, serviceId) => {
        const service = Services.find((s) => s.id === Number(serviceId));
        if (service) {
          acc.totalDuration += service.duration;
          // Se qualquer um dos serviços for bloqueante, o agendamento inteiro é bloqueante.
          if (service.isBlocking !== false) {
            acc.isBlocking = true;
          }
        }
        return acc;
      },
      { totalDuration: 0, isBlocking: false }
    );

    if (totalDuration === 0) {
      setAvailableTimes([]);
      return;
    }

    const serviceDuration = totalDuration;
    const isCurrentServiceBlocking = isBlocking;

    // Define o horário de funcionamento do salão (ex: 9:00 às 18:00).
    const workDayStart = set(selectedDate, {
      hours: 9,
      minutes: 0,
      seconds: 0,
    });
    const workDayEnd = set(selectedDate, { hours: 18, minutes: 0, seconds: 0 });

    // Filtra os agendamentos existentes para o profissional e a data selecionada.
    const professionalAppointmentsOnDate = allAppointments.filter(
      (appt) =>
        appt.professionalId === Number(selectedProfessional) &&
        isSameDay(appt.start, selectedDate)
    );

    const times = []; // Array para armazenar os horários disponíveis.
    let slotStart = workDayStart; // Inicia a verificação a partir do início do expediente.

    // Define o tempo mínimo para agendamento no dia atual (agora + 30 minutos)
    const now = new Date();
    const minAllowedStartTimeForToday = addMinutes(now, 30);

    // Itera sobre o dia de trabalho em intervalos para encontrar horários vagos.
    while (isBefore(slotStart, workDayEnd)) {
      const slotEnd = addMinutes(slotStart, serviceDuration);

      // REGRA: Para o dia atual, só permite agendar com 30 minutos de antecedência.
      if (
        isSameDay(slotStart, now) &&
        isBefore(slotStart, minAllowedStartTimeForToday)
      ) {
        slotStart = addMinutes(slotStart, 15); // Avança para o próximo intervalo.
        continue; // Pula este slot, pois é muito cedo para agendar.
      }

      // Verifica se o slot atual (slotStart, slotEnd) se sobrepõe com algum agendamento existente.
      const overlappingAppointments = professionalAppointmentsOnDate.filter(
        (appt) => isBefore(slotStart, appt.end) && isBefore(appt.start, slotEnd)
      );

      let isOccupied = false;
      if (overlappingAppointments.length > 0) {
        // Se o grupo de serviços que queremos agendar for bloqueante, qualquer sobreposição torna o horário ocupado.
        if (isCurrentServiceBlocking) {
          isOccupied = true;
        } else {
          // Se nosso grupo NÃO for bloqueante, o horário só estará ocupado se sobrepor um agendamento existente QUE SEJA bloqueante.
          isOccupied = overlappingAppointments.some((appt) => {
            const appointmentServiceIds = Array.isArray(appt.serviceId)
              ? appt.serviceId
              : [appt.serviceId];
            return appointmentServiceIds.some((id) => {
              const service = Services.find((s) => s.id === id);
              return service ? service.isBlocking !== false : true;
            });
          });
        }
      }
      // Se o slot não estiver ocupado, adiciona à lista de horários disponíveis.
      if (!isOccupied) {
        times.push(format(slotStart, "HH:mm"));
      }

      // Avança para o próximo possível início de slot (a cada 15 minutos).
      slotStart = addMinutes(slotStart, 15);
    }
    setAvailableTimes(times);
  }, [selectedDate, selectedServices, selectedProfessional, servicesConfirmed]);

  // =================================================================
  // FUNÇÕES DE MANIPULAÇÃO DE EVENTOS (HANDLERS)
  // =================================================================

  // Função para fazer logout do usuário.
  const Logout = () => {
    localStorage.removeItem("token");
    setUserName(null);
    navigate("/");
  };

  // Função para lidar com a seleção de um dia no calendário.
  const handleSelectSlot = (slotInfo) => {
    // Validação: Exige que profissional e serviço sejam selecionados primeiro.
    if (!selectedProfessional || !servicesConfirmed) {
      alert(
        "Por favor, selecione um profissional e um serviço antes de escolher uma data."
      );
      return;
    }
    // Validação: Impede agendamentos em datas passadas.
    if (isBefore(slotInfo.start, startOfDay(new Date()))) {
      alert("Não é possível agendar em datas passadas.");
      return;
    }
    // Se as validações passarem, define a data selecionada e abre o modal.
    setSelectedDate(slotInfo.start);
    setModalIsOpen(true);
  };

  // Função para criar o agendamento ao confirmar no modal.
  const handleScheduleAppointment = (e) => {
    e.preventDefault(); // Impede o recarregamento da página.

    // Validação: Exige que um horário seja selecionado.
    if (!selectedTime) {
      alert("Por favor, selecione um horário.");
      return;
    }

    // Obtém os dados do usuário logado a partir do token.
    const currentUserId = getUserID();
    const currentUserName = getUserName();

    // Validação: Verifica se os dados do usuário são válidos.
    if (!currentUserId || !currentUserName) {
      alert(
        "Erro: Informações de usuário inválidas. Por favor, faça login novamente."
      );
      navigate("/login");
      return;
    }

    // Encontra os objetos completos de serviço e profissional.
    const selectedServiceObjects = selectedServices.map((id) =>
      Services.find((s) => s.id === Number(id))
    );
    const serviceNames = selectedServiceObjects.map((s) => s.name).join(", ");
    const totalDuration = selectedServiceObjects.reduce(
      (sum, s) => sum + s.duration,
      0
    );

    const professional = users.find(
      (u) => u.id === Number(selectedProfessional)
    );

    // Constrói as datas de início e fim do agendamento.
    const [hours, minutes] = selectedTime.split(":").map(Number);
    const startTime = set(selectedDate, { hours, minutes });
    const endTime = addMinutes(startTime, totalDuration);

    // Cria o novo objeto de agendamento.
    const newAppointment = {
      id: allAppointments.length + 1, // Geração de ID simples para o mock.
      title: currentUserName,
      description: `${serviceNames} - Profissional: ${professional.name}`,
      serviceId: selectedServices.map(Number), // Salva um array de IDs
      clientId: currentUserId,
      professionalId: professional.id, // Usando o ID numérico do mock
      start: startTime,
      end: endTime,
    };

    // 1. Cria a nova lista completa de agendamentos
    const updatedAppointments = [...allAppointments, newAppointment];

    // 2. Atualiza o estado que armazena todos os agendamentos
    setAllAppointments(updatedAppointments);

    // 3. Salva a lista atualizada no localStorage para que os dados persistam.
    localStorage.setItem("myAppointments", JSON.stringify(updatedAppointments));

    // Exibe uma mensagem de sucesso.
    alert(
      `Agendamento confirmado para ${currentUserName}!\nServiço: ${serviceNames}\nProfissional: ${
        professional.name
      }\nData: ${format(startTime, "dd/MM/yyyy")} às ${format(
        startTime,
        "HH:mm"
      )}`
    );

    // A lista do calendário (appointmentsList) será atualizada automaticamente
    // pelo useEffect que observa mudanças em 'allAppointments'.
    // setAppointmentsList([...appointmentsList, newAppointment]); // Esta linha não é mais necessária.

    // Reseta os estados do modal e da seleção.
    setModalIsOpen(false);
    setSelectedTime("");
    setSelectedDate(null);
  };

  // Função para adicionar ou remover um serviço da lista de selecionados.
  const handleServiceToggle = (serviceId) => {
    // Se a seleção de serviços já foi confirmada, o usuário deve clicar em "Alterar Serviços" primeiro.
    if (servicesConfirmed) {
      alert(
        'Para alterar os serviços, clique em "Alterar Serviços" abaixo da lista.'
      );
      return;
    }

    const idStr = String(serviceId);
    setSelectedServices((prev) =>
      prev.includes(idStr)
        ? prev.filter((id) => id !== idStr)
        : // TODO: Adicionar lógica para não permitir adicionar serviços não-bloqueantes se um bloqueante já foi selecionado e vice-versa.
          [...prev, idStr]
    );
  };

  // Função para confirmar a seleção de serviços e mostrar o calendário.
  const handleConfirmServices = () => {
    if (selectedServices.length > 0) {
      setServicesConfirmed(true);
    } else {
      alert("Por favor, selecione pelo menos um serviço.");
    }
  };

  // =================================================================
  // DADOS PARA RENDERIZAÇÃO
  // =================================================================

  // Lista de profissionais filtrada do mock 'users'.
  const listProfessional = useMemo(
    () =>
      users
        .filter((user) => user.type === "professional")
        .map((prof) => ({
          id: prof.id,
          name: prof.name,
          role: prof.role,
          image: prof.image,
        })),
    [] // A lista de usuários é estática, então o array de dependências está vazio.
  );

  // Lista de serviços filtrada com base no profissional selecionado.
  const listServices = useMemo(
    () =>
      Services.filter((service) =>
        service.professionalId.includes(Number(selectedProfessional))
      ),
    [selectedProfessional]
  );

  // =================================================================
  // RENDERIZAÇÃO DO COMPONENTE (JSX)
  // =================================================================
  return (
    <>
      <Header userName={userName} onLogout={Logout} />

      {/* Container principal do agendamento */}
      <div className="container-agendamento">
        {/* Menus de seleção de profissional e serviço */}
        <div className="menu-calendario">
          <h2>Selecione um Profissional.</h2>
          <br />
          <ProfessionalList
            professionals={listProfessional}
            selectedProfessional={selectedProfessional}
            onSelectProfessional={setSelectedProfessional}
          />
          <br />
          <br />
          {selectedProfessional && (
            <>
              <h2>Selecione um ou mais Serviços.</h2>
              <ServiceList
                services={listServices}
                selectedServices={selectedServices}
                onServiceToggle={handleServiceToggle}
                disabled={servicesConfirmed}
              />
              <SelectedServicesSummary
                selectedServices={selectedServices}
                allServices={Services}
                servicesConfirmed={servicesConfirmed}
                onConfirm={handleConfirmServices}
                onEdit={() => setServicesConfirmed(false)}
              />
            </>
          )}
        </div>
        {/* Componente do Calendário */}
        {selectedProfessional && servicesConfirmed && (
          <Calendario
            appointments={appointmentsList}
            onSelectSlot={handleSelectSlot}
          />
        )}
      </div>

      {/* Modal para confirmação do agendamento */}
      <AppointmentModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        selectedDate={selectedDate}
        availableTimes={availableTimes}
        selectedTime={selectedTime}
        onTimeSelect={setSelectedTime}
        onSchedule={handleScheduleAppointment}
        selectedServices={selectedServices}
        selectedProfessional={selectedProfessional}
        allServices={Services}
        allUsers={users}
      />
    </>
  );
};

export default AgendamentoCliente;
