import { Table, InputText, Label } from "../../../components/ui";
import { ColumnDef } from "@tanstack/react-table";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { getPacientes } from "../../../lib/api";

const ContenedorPagina = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  min-height: 100vh;
  font-family: "Roboto", sans-serif;
`;

const Titulo = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const BarraBusqueda = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const columnas: ColumnDef<any>[] = [
  { accessorKey: "nombreCompleto", header: "Nombre Completo" },
  { accessorKey: "edad", header: "Edad" },
  { accessorKey: "genero", header: "Género" },
  { accessorKey: "telefono", header: "Teléfono" },
  { accessorKey: "email", header: "Email" },
];

const calcularEdad = (fechaNacimiento: string): number => {
  const hoy = new Date();
  const fechaNac = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - fechaNac.getFullYear();
  const mes = hoy.getMonth() - fechaNac.getMonth();

  if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
    edad--;
  }

  return edad;
};

export const Pacientes = () => {
  // Estados
  const [datos, setDatos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const pacientes = await getPacientes();

        const pacientesProcesados = pacientes.map((paciente: any) => ({
          nombreCompleto: `${paciente.Nombre} ${paciente.Apellido}`,
          edad: calcularEdad(paciente.FechaNacimiento),
          genero: paciente.Genero === "M" ? "Masculino" : "Femenino",
          telefono: paciente.Telefono,
          email: paciente.Email,
        }));

        setDatos(pacientesProcesados);
      } catch (error) {
        console.error("Error al obtener pacientes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const datosFiltrados = datos.filter((paciente) =>
    paciente.nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ContenedorPagina>
      <Titulo>Lista de Pacientes</Titulo>
      <BarraBusqueda>
        <Label>Buscar Paciente:</Label>
        <InputText
          placeholder="Escribe un nombre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </BarraBusqueda>
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <Table columnas={columnas} datos={datosFiltrados} />
      )}
    </ContenedorPagina>
  );
};
