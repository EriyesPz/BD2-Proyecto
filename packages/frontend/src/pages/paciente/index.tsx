import React, { useState } from "react";
import { Table, Button, InputText, InputDate, Label, Select } from "../../components/ui";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  font-family: "Roboto", sans-serif;
`;

const Card = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 16px;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 8px;
  margin-bottom: 16px;
`;

const CardTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #333;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Tabs = styled.div`
  display: flex;
  flex-direction: column;
`;

const TabsList = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

const TabsTrigger = styled(Button)<{ active?: boolean }>`
  background-color: ${({ active }) => (active ? "#007bff" : "#f5f5f5")};
  color: ${({ active }) => (active ? "#fff" : "#333")};
  border: 1px solid #ddd;
  cursor: pointer;

  &:hover {
    background-color: ${({ active }) => (active ? "#0056b3" : "#e9ecef")};
  }
`;

const TabsContent = styled.div<{ visible?: boolean }>`
  display: ${({ visible }) => (visible ? "block" : "none")};
`;

export const PerfilPaciente = () => {
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("consultas");

  const paciente = {
    nombre: "Juan Pérez",
    edad: 35,
    genero: "Masculino",
    direccion: "Calle Principal 123, Ciudad",
    telefono: "555-1234",
    email: "juan.perez@email.com",
  };

  const historialMedico = {
    consultas: [
      {
        fecha: "2023-05-15",
        medico: "Dra. García",
        motivo: "Dolor de cabeza",
        diagnostico: "Migraña",
      },
      {
        fecha: "2023-03-10",
        medico: "Dr. Rodríguez",
        motivo: "Dolor abdominal",
        diagnostico: "Gastritis",
      },
    ],
    hospitalizaciones: [
      { fecha: "2022-11-20", motivo: "Apendicitis", duracion: "3 días" },
    ],
    examenes: [
      { fecha: "2023-04-01", examen: "Análisis de sangre", resultados: "Ver resultados" },
      { fecha: "2023-02-15", examen: "Radiografía de tórax", resultados: "Ver imagen" },
    ],
    prescripciones: [
      { fecha: "2023-05-15", medicamento: "Ibuprofeno", dosificacion: "400mg cada 8 horas" },
      { fecha: "2023-03-10", medicamento: "Omeprazol", dosificacion: "20mg una vez al día" },
    ],
  };

  const seguroMedico = {
    aseguradora: "Seguros Salud S.A.",
    numeroPoliza: "POL-12345",
    tipoCobertura: "Plan Completo",
    fechaVencimiento: "2023-12-31",
  };

  return (
    <Container>
      {/* Información Personal */}
      <Card>
        <CardHeader>
          <CardTitle>Información Personal</CardTitle>
          <Button onClick={() => setEditMode(!editMode)}>
            {editMode ? "Guardar" : "Editar Información"}
          </Button>
        </CardHeader>
        <div>
          {editMode ? (
            <form>
              <Grid>
                {Object.entries(paciente).map(([key, value]) => (
                  <div key={key}>
                    <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                    <InputText id={key} defaultValue={value} />
                  </div>
                ))}
              </Grid>
            </form>
          ) : (
            <Grid>
              {Object.entries(paciente).map(([key, value]) => (
                <p key={key}>
                  <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                </p>
              ))}
            </Grid>
          )}
        </div>
      </Card>

      {/* Historial Médico */}
      <Card>
        <CardHeader>
          <CardTitle>Historial Médico</CardTitle>
        </CardHeader>
        <Tabs>
          <TabsList>
            <TabsTrigger
              active={activeTab === "consultas"}
              onClick={() => setActiveTab("consultas")}
            >
              Consultas
            </TabsTrigger>
            <TabsTrigger
              active={activeTab === "hospitalizaciones"}
              onClick={() => setActiveTab("hospitalizaciones")}
            >
              Hospitalizaciones
            </TabsTrigger>
            <TabsTrigger
              active={activeTab === "examenes"}
              onClick={() => setActiveTab("examenes")}
            >
              Exámenes
            </TabsTrigger>
            <TabsTrigger
              active={activeTab === "prescripciones"}
              onClick={() => setActiveTab("prescripciones")}
            >
              Prescripciones
            </TabsTrigger>
          </TabsList>
          <TabsContent visible={activeTab === "consultas"}>
            <Table
                columnas={[
                { header: "Fecha", accessorKey: "fecha" },
                { header: "Médico", accessorKey: "medico" },
                { header: "Motivo", accessorKey: "motivo" },
                { header: "Diagnóstico", accessorKey: "diagnostico" },
                ]}
                datos={historialMedico.consultas}
            />
            </TabsContent>
        </Tabs>
      </Card>
    </Container>
  );
}
