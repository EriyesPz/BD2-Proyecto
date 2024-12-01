import { useState } from "react";
import styled from "styled-components";
import { Button, InputDate, TextArea, Label, Select } from "../../../components/ui";

// Datos simulados de pacientes y doctores
const patients = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
];

const doctors = [
  { id: "1", name: "Dr. House", available: true },
  { id: "2", name: "Dr. Grey", available: false },
  { id: "3", name: "Dr. Who", available: true },
];

const Card = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: "Roboto", sans-serif;
`;

const CardHeader = styled.div`
  margin-bottom: 16px;
  border-bottom: 1px solid #ddd;
`;

const CardTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

const CardContent = styled.div`
  margin-bottom: 16px;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`;

export const ProgramacionConsulta = () => {
  const [selectedPatient, setSelectedPatient] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [consultationDateTime, setConsultationDateTime] = useState("");
  const [consultationReason, setConsultationReason] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Consulta programada:", {
      selectedPatient,
      selectedDoctor,
      consultationDateTime,
      consultationReason,
    });
  };

  const handleCancel = () => {
    console.log("Programación cancelada");
    setSelectedPatient("");
    setSelectedDoctor("");
    setConsultationDateTime("");
    setConsultationReason("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Programación de Consulta</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div>
            <Label>Paciente</Label>
            <Select
              options={patients.map((patient) => ({
                value: patient.id,
                label: patient.name,
              }))}
              onChange={setSelectedPatient}
              placeholder="Seleccionar paciente"
            />
            <Button type="button" style={{ marginTop: "8px" }}>
              Registrar Nuevo Paciente
            </Button>
          </div>

          <div>
            <Label>Médico</Label>
            <Select
              options={doctors
                .filter((doctor) => doctor.available)
                .map((doctor) => ({
                  value: doctor.id,
                  label: doctor.name,
                }))}
              onChange={setSelectedDoctor}
              placeholder="Seleccionar médico"
            />
          </div>

          <div>
            <Label>Fecha y Hora de la Consulta</Label>
            <InputDate
              value={consultationDateTime}
              onChange={setConsultationDateTime}
            />
          </div>

          <div>
            <Label>Motivo de la Consulta</Label>
            <TextArea
              value={consultationReason}
              onChange={(e) => setConsultationReason(e.target.value)}
              placeholder="Ingrese el motivo de la consulta"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="button" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button type="submit">Guardar</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
