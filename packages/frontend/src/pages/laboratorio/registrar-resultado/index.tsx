import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Button, InputText, InputDate, TextArea, Label, Select } from "../../../components/ui";

type ExamResult = {
  patient: string;
  examType: string;
  examDate: string;
  results: string;
  attachments: FileList | null;
  observations: string;
};

const patients = ["Juan Pérez", "María García", "Carlos López", "Ana Martínez"];
const examTypes = [
  "Hemograma",
  "Glucosa en sangre",
  "Perfil lipídico",
  "Radiografía de tórax",
  "Electrocardiograma",
];

const Card = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: "Roboto", sans-serif;
`;

const CardHeader = styled.div`
  margin-bottom: 16px;
`;

const CardTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
`;

const CardContent = styled.div`
  margin-bottom: 16px;

  > div {
    margin-bottom: 12px;
  }
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`;

export const ExamenResultado = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExamResult>();
  const [selectedPatient, setSelectedPatient] = useState("");
  const [selectedExamType, setSelectedExamType] = useState("");
  const [examDate, setExamDate] = useState("");

  const onSubmit = (data: ExamResult) => {
    console.log({ ...data, examDate });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registro de Resultados de Exámenes</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <div>
            <Label htmlFor="patient">Paciente</Label>
            <Select
              options={patients.map((patient) => ({
                value: patient,
                label: patient,
              }))}
              onChange={(value) => setSelectedPatient(value)}
              placeholder="Seleccionar paciente"
            />
            <InputText
              id="patient"
              {...register("patient", { required: true })}
              value={selectedPatient}
              onChange={(e) => setSelectedPatient(e.target.value)}
              placeholder="O escriba el nombre del paciente"
            />
            {errors.patient && (
              <span style={{ color: "red" }}>Este campo es requerido</span>
            )}
          </div>

          <div>
            <Label htmlFor="examType">Examen Realizado</Label>
            <Select
              options={examTypes.map((examType) => ({
                value: examType,
                label: examType,
              }))}
              onChange={(value) => setSelectedExamType(value)}
              placeholder="Seleccionar examen"
            />
            {errors.examType && (
              <span style={{ color: "red" }}>Este campo es requerido</span>
            )}
          </div>

          <div>
            <Label htmlFor="examDate">Fecha del Examen</Label>
            <InputDate
              value={examDate}
              onChange={(value) => setExamDate(value)}
            />
            {errors.examDate && (
              <span style={{ color: "red" }}>Este campo es requerido</span>
            )}
          </div>

          <div>
            <Label htmlFor="results">Resultados</Label>
            <TextArea
              id="results"
              {...register("results", { required: true })}
              placeholder="Ingrese los resultados del examen"
            />
            {errors.results && (
              <span style={{ color: "red" }}>Este campo es requerido</span>
            )}
          </div>

          <div>
            <Label htmlFor="attachments">Adjuntar Documentos</Label>
            <InputText
              id="attachments"
              type="file"
              {...register("attachments")}
              multiple
            />
          </div>

          <div>
            <Label htmlFor="observations">Observaciones</Label>
            <TextArea
              id="observations"
              {...register("observations")}
              placeholder="Ingrese observaciones adicionales"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="button">Cancelar</Button>
          <Button type="submit">Guardar</Button>
        </CardFooter>
      </form>
    </Card>
  );
};
