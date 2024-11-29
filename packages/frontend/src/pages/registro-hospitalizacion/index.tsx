import React, { useState } from "react";
import styled from "styled-components";
import { Button, InputDate, InputText, Label, Select } from "../../components/ui";

const pacientes = [
  { id: 1, nombre: "Juan Pérez" },
  { id: 2, nombre: "María García" },
  { id: 3, nombre: "Carlos López" },
];

const habitaciones = [
  { id: 1, numero: "101", tipo: "Individual", precio: 100, disponible: true },
  { id: 2, numero: "102", tipo: "Doble", precio: 150, disponible: true },
  { id: 3, numero: "103", tipo: "Suite", precio: 200, disponible: false },
];

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Roboto", sans-serif;
`;

const FormTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`;

const FormSection = styled.div`
  margin-bottom: 16px;
`;

const RoomInfo = styled.div`
  font-size: 14px;
  color: #555;
  margin-top: 8px;
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

export const FormularioHospitalizacion = () => {
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState("");
  const [habitacionSeleccionada, setHabitacionSeleccionada] = useState("");
  const [fechaIngreso, setFechaIngreso] = useState(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 10);
  });
  const [diagnostico, setDiagnostico] = useState("");

  const habitacionInfo = habitaciones.find(
    (h) => h.id.toString() === habitacionSeleccionada
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulario enviado", {
      pacienteSeleccionado,
      habitacionSeleccionada,
      fechaIngreso,
      diagnostico,
    });
  };

  return (
    <FormContainer>
      <FormTitle>Registro de Hospitalización</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormSection>
          <Label>Paciente</Label>
          <Select
            options={pacientes.map((paciente) => ({
              value: paciente.id.toString(),
              label: paciente.nombre,
            }))}
            placeholder="Seleccione un paciente"
            onChange={(value) => setPacienteSeleccionado(value)}
          />
          <Button type="button" style={{ marginTop: "10px" }}>
            Registrar Nuevo Paciente
          </Button>
        </FormSection>
        <FormSection>
          <Label>Habitación</Label>
          <Select
            options={habitaciones.map((habitacion) => ({
              value: habitacion.id.toString(),
              label: `${habitacion.numero} - ${habitacion.tipo} ${
                habitacion.disponible ? "" : "(No disponible)"
              }`,
              disabled: !habitacion.disponible,
            }))}
            placeholder="Seleccione una habitación"
            onChange={(value) => setHabitacionSeleccionada(value)}
          />
          {habitacionInfo && (
            <RoomInfo>
              Precio por día: ${habitacionInfo.precio} - Tipo: {habitacionInfo.tipo}
            </RoomInfo>
          )}
        </FormSection>
        <FormSection>
          <Label>Fecha de Ingreso</Label>
          <InputDate
            value={fechaIngreso}
            onChange={(value) => setFechaIngreso(value)}
          />
        </FormSection>
        <FormSection>
          <Label>Diagnóstico</Label>
          <InputText
            placeholder="Ingrese el diagnóstico del paciente"
            value={diagnostico}
            onChange={(e) => setDiagnostico(e.target.value)}
          />
        </FormSection>
        <FormActions>
          <Button type="button">
            Cancelar
          </Button>
          <Button type="submit">Guardar</Button>
        </FormActions>
      </form>
    </FormContainer>
  );
}
