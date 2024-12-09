// src/components/Layout.tsx (o donde tengas tu Layout/Sidebar)
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
        </Section>

        <Section>
          <SectionTitle>Médicos</SectionTitle>
          <SidebarItem to="/medicos">Lista de Médicos</SidebarItem>
        </Section>

        <Section>
          <SectionTitle>Hospitalización</SectionTitle>
          <SidebarItem to="/hospitalizaciones">Lista de Hospitalizaciones</SidebarItem>
          <SidebarItem to="/hospitalizacion/crear">Crear Hospitalización</SidebarItem>
          <SidebarItem to="/hospitalizacion/crear-factura">Crear Hospitalización con Factura</SidebarItem>
          <SidebarItem to="/hospitalizacion/dar-alta">Dar Alta Hospitalización</SidebarItem>
        </Section>

        <Section>
          <SectionTitle>Facturación</SectionTitle>
          <SidebarItem to="/facturas">Lista de Facturas</SidebarItem>
          <SidebarItem to="/pagar-factura">Pagar Factura</SidebarItem>
        </Section>

        <Section>
          <SectionTitle>Consultorios</SectionTitle>
          <SidebarItem to="/consultorios">Lista de Consultorios</SidebarItem>
          <SidebarItem to="/crear-consultorio">Crear Consultorio</SidebarItem>
        </Section>

        <Section>
          <SectionTitle>Atenciones Extras</SectionTitle>
          <SidebarItem to="/medicamentos-aplicados">Registrar Medicamento Aplicado</SidebarItem>
          <SidebarItem to="/alimento-suministrado">Registrar Alimento Suministrado</SidebarItem>
        </Section>

        <Section>
          <SectionTitle>Consultas</SectionTitle>
          <SidebarItem to="/visita-medica">Registrar Visita Médica</SidebarItem>
          <SidebarItem to="/examen-medico">Registrar Examen Médico</SidebarItem>
          <SidebarItem to="/consultas">Consultas</SidebarItem>
        </Section>

        <Section>
          <SectionTitle>Reportes</SectionTitle>
          <SidebarItem to="/habitaciones">Habitaciones Disponibles</SidebarItem>
          <SidebarItem to="/honorarios-medicos">Honorarios Médicos</SidebarItem>
        </Section>
      </Sidebar>
      <Content>
        <Outlet />
      </Content>
    </Container>
  );
};
