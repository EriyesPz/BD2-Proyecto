/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button, InputDate, TextArea, Label, Select } from "../../../components/ui";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./styled";
import { registrarConsultaMedica } from "../../../lib/api";

const patients = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
];

const doctors = [
  { id: "1", name: "Dr. House", available: true },
  { id: "2", name: "Dr. Grey", available: false },
  { id: "3", name: "Dr. Who", available: true },
];

export const ProgramacionConsulta = () => {
  const [selectedPatient, setSelectedPatient] = useState<string>("");
  const [selectedDoctor, setSelectedDoctor] = useState<string>("");
  const [consultationDateTime, setConsultationDateTime] = useState<string>("");
  const [consultationReason, setConsultationReason] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedPatient || !selectedDoctor || !consultationDateTime) {
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }

    try {
      setLoading(true);
      const response = await registrarConsultaMedica({
        pacienteID: parseInt(selectedPatient),
        medicoID: parseInt(selectedDoctor),
        fechaConsulta: consultationDateTime,
        motivoConsulta: consultationReason,
      });
      alert(`Consulta registrada exitosamente. ID de la consulta: ${response.ConsultaID}`);
      handleCancel();
    } catch (error: any) {
      console.error("Error al registrar la consulta:", error.message);
      alert("Ocurrió un error al registrar la consulta.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
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
              onChange={(value) => setSelectedPatient(value)}
              placeholder="Seleccionar paciente"
            />
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
              onChange={(value) => setSelectedDoctor(value)}
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
          <Button type="button" onClick={handleCancel} disabled={loading}>
            Cancelar
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Guardar"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
