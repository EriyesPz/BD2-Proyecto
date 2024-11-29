import React, { useState } from "react";
import styled from "styled-components";
import { Button, Table } from "../../components/ui";

// Datos de ejemplo
const patient = {
  fullName: "Juan Pérez",
  age: "45 años",
  ssn: "123-45-6789",
  contact: "+1 234 567 8900",
};

const roomInfo = {
  roomNumber: "301",
  roomType: "Individual",
  characteristics:
    "<features><wifi>Yes</wifi><tv>Yes</tv><bathroom>Private</bathroom></features>",
};

const medications = [
  { date: "2023-06-01 08:00", medication: "Paracetamol", dose: "500mg", administeredBy: "Enfermera Ana" },
  { date: "2023-06-01 14:00", medication: "Ibuprofeno", dose: "400mg", administeredBy: "Enfermero Carlos" },
];

const exams = [
  { date: "2023-06-01 10:00", exam: "Radiografía de Tórax", result: "Normal", performedBy: "Dr. Rodríguez" },
  { date: "2023-06-02 11:30", exam: "Análisis de Sangre", result: "Pendiente", performedBy: "Dra. Gómez" },
];

const visits = [
  { date: "2023-06-01 09:00", doctor: "Dr. Martínez", notes: "Paciente estable, continuar tratamiento" },
  { date: "2023-06-02 10:00", doctor: "Dra. López", notes: "Mejora notable, considerar alta en 2 días" },
];

const costSummary = {
  estancia: 5000,
  otrosServicios: [
    { name: "Medicamentos", cost: 1500 },
    { name: "Exámenes", cost: 2000 },
    { name: "Otros", cost: 500 },
  ],
};

// Función para parsear XML
const parseXML = (xml: string) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xml, "text/xml");
  const features = xmlDoc.getElementsByTagName("features")[0];
  return Array.from(features.children)
    .map((child) => `${child.tagName}: ${child.textContent}`)
    .join(", ");
};

// Estilización con styled-components
const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: "Roboto", sans-serif;
`;

const Header = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Card = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 12px;
`;

const Content = styled.dl`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 8px;
  font-size: 14px;
`;

const TabsContainer = styled.div`
  margin-top: 20px;
`;

const TabList = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

const TabButton = styled.button<{ active: boolean }>`
  padding: 8px 16px;
  background: ${({ active }) => (active ? "#007bff" : "#f5f5f5")};
  color: ${({ active }) => (active ? "#fff" : "#333")};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: "Roboto", sans-serif;

  &:hover {
    background: ${({ active }) => (active ? "#0056b3" : "#e0e0e0")};
  }
`;

const TabContent = styled.div`
  margin-top: 20px;
`;

const ActionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

export const HospitalizationDetalle = () => {
  const [activeTab, setActiveTab] = useState("medications");

  const totalCost =
    costSummary.estancia +
    costSummary.otrosServicios.reduce((sum, service) => sum + service.cost, 0);

  return (
    <Container>
      <Header>Detalles de Hospitalización</Header>
      <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "1fr 1fr" }}>
        <Card>
          <Title>Información del Paciente</Title>
          <Content>
            <dt>Nombre Completo:</dt>
            <dd>{patient.fullName}</dd>
            <dt>Edad:</dt>
            <dd>{patient.age}</dd>
            <dt>Número de Seguro Social:</dt>
            <dd>{patient.ssn}</dd>
            <dt>Contacto:</dt>
            <dd>{patient.contact}</dd>
          </Content>
        </Card>

        <Card>
          <Title>Información de la Habitación</Title>
          <Content>
            <dt>Número de Habitación:</dt>
            <dd>{roomInfo.roomNumber}</dd>
            <dt>Tipo de Habitación:</dt>
            <dd>{roomInfo.roomType}</dd>
            <dt>Características:</dt>
            <dd>{parseXML(roomInfo.characteristics)}</dd>
          </Content>
        </Card>
      </div>
      <TabsContainer>
        <TabList>
          <TabButton active={activeTab === "medications"} onClick={() => setActiveTab("medications")}>
            Medicamentos Administrados
          </TabButton>
          <TabButton active={activeTab === "exams"} onClick={() => setActiveTab("exams")}>
            Exámenes Realizados
          </TabButton>
          <TabButton active={activeTab === "visits"} onClick={() => setActiveTab("visits")}>
            Visitas Médicas
          </TabButton>
        </TabList>
        <TabContent>
          {activeTab === "medications" && (
            <Table
              columnas={[
                { header: "Fecha y Hora", accessorKey: "date" },
                { header: "Medicamento", accessorKey: "medication" },
                { header: "Dosis", accessorKey: "dose" },
                { header: "Administrado por", accessorKey: "administeredBy" },
              ]}
              datos={medications}
            />
          )}
          {activeTab === "exams" && (
            <Table
              columnas={[
                { header: "Fecha y Hora", accessorKey: "date" },
                { header: "Examen", accessorKey: "exam" },
                { header: "Resultado", accessorKey: "result" },
                { header: "Realizado por", accessorKey: "performedBy" },
              ]}
              datos={exams}
            />
          )}
          {activeTab === "visits" && (
            <Table
              columnas={[
                { header: "Fecha y Hora", accessorKey: "date" },
                { header: "Médico", accessorKey: "doctor" },
                { header: "Notas", accessorKey: "notes" },
              ]}
              datos={visits}
            />
          )}
        </TabContent>
      </TabsContainer>
      <Card>
        <Title>Costos Acumulados</Title>
        <Content>
          <dt>Costo de Estancia:</dt>
          <dd>${costSummary.estancia.toFixed(2)}</dd>
          {costSummary.otrosServicios.map((service, index) => (
            <React.Fragment key={index}>
              <dt>{service.name}:</dt>
              <dd>${service.cost.toFixed(2)}</dd>
            </React.Fragment>
          ))}
          <dt>Total Acumulado:</dt>
          <dd className="font-bold">${totalCost.toFixed(2)}</dd>
        </Content>
      </Card>
      <ActionsContainer>
        <Button>Registrar Atención o Servicio</Button>
        <Button>Generar Factura</Button>
        <Button>Dar de Alta al Paciente</Button>
      </ActionsContainer>
    </Container>
  );
}
