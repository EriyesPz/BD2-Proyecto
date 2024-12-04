import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ActionsContainer,
  Card,
  Container,
  Content,
  Header,
  TabButton,
  TabContent,
  TabList,
  TabsContainer,
  Title,
} from "./styled";
import { Button, Table } from "../../../components/ui";
import { getHospitalizacionPorID } from "../../../lib/api";

export const HospitalizationDetalle = () => {
  const { id } = useParams<{ id: string }>();
  const [hospitalizacion, setHospitalizacion] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("medications");

  useEffect(() => {
    const fetchData = async () => {
      if (!id || isNaN(Number(id))) {
        setError("El ID de hospitalización no es válido.");
        setLoading(false);
        return;
      }

      try {
        const data = await getHospitalizacionPorID(Number(id));
        setHospitalizacion(data);
      } catch (err) {
        console.error("Error al cargar los datos de hospitalización:", err);
        setError("Hubo un problema al cargar los detalles de la hospitalización.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const parseXML = (xml: string) => {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xml, "text/xml");
      const features = xmlDoc.getElementsByTagName("features")[0];
      if (!features) return "Sin características disponibles.";
      return Array.from(features.children)
        .map((child) => `${child.tagName}: ${child.textContent}`)
        .join(", ");
    } catch {
      return "Error al parsear las características.";
    }
  };

  if (loading) {
    return <Container>Cargando información de la hospitalización...</Container>;
  }

  if (error) {
    return <Container>{error}</Container>;
  }

  if (!hospitalizacion) {
    return <Container>No se encontró información para esta hospitalización.</Container>;
  }

  return (
    <Container>
      <Header>Detalles de Hospitalización</Header>
      <div
        style={{ display: "grid", gap: "20px", gridTemplateColumns: "1fr 1fr" }}
      >
        <Card>
          <Title>Información del Paciente</Title>
          <Content>
            <dt>Nombre Completo:</dt>
            <dd>{hospitalizacion.NombrePaciente}</dd>
            <dt>Edad:</dt>
            <dd>{hospitalizacion.EdadPaciente} años</dd>
            <dt>Número de Seguro Social:</dt>
            <dd>{hospitalizacion.NumeroSeguroSocial}</dd>
            <dt>Contacto:</dt>
            <dd>{hospitalizacion.Contacto}</dd>
          </Content>
        </Card>

        <Card>
          <Title>Información de la Habitación</Title>
          <Content>
            <dt>Número de Habitación:</dt>
            <dd>{hospitalizacion.NumeroHabitacion}</dd>
            <dt>Tipo de Habitación:</dt>
            <dd>{hospitalizacion.TipoHabitacion}</dd>
            <dt>Características:</dt>
            <dd>{parseXML(hospitalizacion.Caracteristicas)}</dd>
          </Content>
        </Card>
      </div>
      <TabsContainer>
        <TabList>
          <TabButton
            active={activeTab === "medications"}
            onClick={() => setActiveTab("medications")}
          >
            Medicamentos Administrados
          </TabButton>
          <TabButton
            active={activeTab === "exams"}
            onClick={() => setActiveTab("exams")}
          >
            Exámenes Realizados
          </TabButton>
          <TabButton
            active={activeTab === "visits"}
            onClick={() => setActiveTab("visits")}
          >
            Visitas Médicas
          </TabButton>
        </TabList>
        <TabContent>
          {activeTab === "medications" && (
            <p>Datos de medicamentos administrados.</p>
          )}
          {activeTab === "exams" && <p>Datos de exámenes realizados.</p>}
          {activeTab === "visits" && <p>Datos de visitas médicas.</p>}
        </TabContent>
      </TabsContainer>
      <ActionsContainer>
        <Button>Registrar Atención o Servicio</Button>
        <Button>Generar Factura</Button>
        <Button>Dar de Alta al Paciente</Button>
      </ActionsContainer>
    </Container>
  );
};
