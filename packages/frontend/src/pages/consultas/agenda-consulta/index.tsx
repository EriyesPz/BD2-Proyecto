import React, { useState } from "react";
import styled from "styled-components";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Button, InputText, Label, Select } from "../../../components/ui";

const doctors = ["Dr. Juan Pérez", "Dra. María López", "Dr. Carlos Martínez"];
const specialties = ["Cardiología", "Dermatología", "Pediatría"];
const mockEvents = [
  {
    id: "1",
    title: "Consulta: Juan Pérez",
    start: "2024-11-28T10:00:00",
    end: "2024-11-28T11:00:00",
    extendedProps: {
      patient: "Juan Pérez",
      doctor: "Dr. Juan Pérez",
      reason: "Chequeo General",
    },
  },
  {
    id: "2",
    title: "Consulta: Ana Martínez",
    start: "2024-11-29T12:00:00",
    end: "2024-11-29T13:00:00",
    extendedProps: {
      patient: "Ana Martínez",
      doctor: "Dra. María López",
      reason: "Dermatitis",
    },
  },
];

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Roboto", sans-serif;
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
`;

const CalendarContainer = styled.div`
  margin-top: 20px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

export const AgendaConsulta = () => {
  const [events, setEvents] = useState(mockEvents);
  const [filters, setFilters] = useState({
    doctor: "",
    specialty: "",
    patient: "",
  });
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleEventClick = (info: any) => {
    setSelectedEvent(info.event.extendedProps);
    setModalOpen(true);
  };

  const handleDateClick = (info: any) => {
    alert(`Espacio libre seleccionado en: ${info.dateStr}`);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredEvents = events.filter((event) => {
    const matchesDoctor = filters.doctor
      ? event.extendedProps.doctor === filters.doctor
      : true;
    const matchesSpecialty = filters.specialty
      ? specialties.includes(filters.specialty)
      : true;
    const matchesPatient = filters.patient
      ? event.extendedProps.patient
          .toLowerCase()
          .includes(filters.patient.toLowerCase())
      : true;

    return matchesDoctor && matchesSpecialty && matchesPatient;
  });

  const closeModal = () => setModalOpen(false);

  return (
    <Container>
      <h1 className="text-2xl font-bold">Agenda de Consultas</h1>
      <FiltersContainer>
        <div>
          <Label>Por Médico</Label>
          <Select
            options={doctors.map((doctor) => ({
              value: doctor,
              label: doctor,
            }))}
            placeholder="Seleccionar médico"
            onChange={(value) => setFilters({ ...filters, doctor: value })}
          />
        </div>
        <div>
          <Label>Por Especialidad</Label>
          <Select
            options={specialties.map((specialty) => ({
              value: specialty,
              label: specialty,
            }))}
            placeholder="Seleccionar especialidad"
            onChange={(value) => setFilters({ ...filters, specialty: value })}
          />
        </div>
        <div>
          <Label>Por Paciente</Label>
          <InputText
            name="patient"
            placeholder="Buscar por paciente"
            onChange={handleFilterChange}
          />
        </div>
      </FiltersContainer>
      <CalendarContainer>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={filteredEvents}
          eventClick={handleEventClick}
          dateClick={handleDateClick}
        />
      </CalendarContainer>
      {isModalOpen && selectedEvent && (
        <ModalOverlay>
          <Modal>
            <h2>Detalles de la Consulta</h2>
            <p>
              <strong>Paciente:</strong> {selectedEvent.patient}
            </p>
            <p>
              <strong>Médico:</strong> {selectedEvent.doctor}
            </p>
            <p>
              <strong>Motivo:</strong> {selectedEvent.reason}
            </p>
            <ButtonGroup>
              <Button onClick={closeModal}>Cerrar</Button>
            </ButtonGroup>
          </Modal>
        </ModalOverlay>
      )}
    </Container>
  );
};
