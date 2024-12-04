// components/Layout.tsx
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  height: 100vh;
  font-family: "Roboto", sans-serif;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #2c3e50;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  border-right: 1px solid #34495e;
`;

const Section = styled.div`
  margin-bottom: 16px;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  border-bottom: 1px solid #34495e;
  padding-bottom: 4px;
  text-transform: uppercase;
`;

const SidebarItem = styled(NavLink)`
  color: white;
  text-decoration: none;
  padding: 10px 12px;
  border-radius: 4px;
  display: block;
  font-size: 14px;
  &:hover {
    background-color: #34495e;
  }
  &.active {
    background-color: #16a085;
    font-weight: bold;
  }
`;

const Content = styled.div`
  flex-grow: 1;
  padding: 20px;
  background-color: #ecf0f1;
  overflow-y: auto;
`;

export const Layout: React.FC = () => {
  return (
    <Container>
      <Sidebar>
        <Section>
          <SectionTitle>Pacientes</SectionTitle>
          <SidebarItem to="/pacientes">Lista de Pacientes</SidebarItem>
          <SidebarItem to="/registrar-paciente">Registrar Paciente</SidebarItem>
          <SidebarItem to="/paciente">Perfil de Paciente</SidebarItem>
        </Section>

        <Section>
          <SectionTitle>Doctores</SectionTitle>
          <SidebarItem to="/doctores">Lista de Doctores</SidebarItem>
          <SidebarItem to="/registrar-doctor">Registrar Doctor</SidebarItem>
          <SidebarItem to="/doctor">Perfil de Doctor</SidebarItem>
        </Section>

        <Section>
          <SectionTitle>Hospitalización</SectionTitle>
          <SidebarItem to="/hospitalizacion">Lista de Hospitalizaciones</SidebarItem>
          <SidebarItem to="/detalle-hospitalizacion">Detalle Hospitalización</SidebarItem>
          <SidebarItem to="/registrar-hospitalizacion">Registrar Hospitalización</SidebarItem>
        </Section>

        <Section>
          <SectionTitle>Facturación</SectionTitle>
          <SidebarItem to="/facturas">Lista de Facturas</SidebarItem>
          <SidebarItem to="/factura">Detalle de Factura</SidebarItem>
          <SidebarItem to="/pago">Registro de Pago</SidebarItem>
        </Section>

        <Section>
          <SectionTitle>Farmacia</SectionTitle>
          <SidebarItem to="/medicamentos">Lista de Medicamentos</SidebarItem>
          <SidebarItem to="/registrar-medicamento">Registrar Medicamento</SidebarItem>
        </Section>

        <Section>
          <SectionTitle>Laboratorio</SectionTitle>
          <SidebarItem to="/examenes">Lista de Exámenes</SidebarItem>
          <SidebarItem to="/paciente-resultados">Resultados de Pacientes</SidebarItem>
          <SidebarItem to="/registrar-resultado">Registrar Resultado</SidebarItem>
        </Section>

        <Section>
          <SectionTitle>Consultas</SectionTitle>
          <SidebarItem to="/agendar-consulta">Agenda de Consultas</SidebarItem>
          <SidebarItem to="/programar-consulta">Programar Consulta</SidebarItem>
          <SidebarItem to="/registrar-consulta">Registrar Consulta</SidebarItem>
        </Section>

        <Section>
          <SectionTitle>Reportes</SectionTitle>
          <SidebarItem to="/honorarios-medicos">Honorarios Médicos</SidebarItem>
          <SidebarItem to="/inventario-medicamentos">Inventario de Medicamentos</SidebarItem>
        </Section>
      </Sidebar>
      <Content>
        <Outlet />
      </Content>
    </Container>
  );
};
