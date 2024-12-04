import React, { useState, useEffect } from "react";
import { Container, FilterContainer, Header } from "./styled";
import { InputText, Table, Button } from "../../../components/ui";
import { getResultadosLaboratorio } from "../../../lib/api";

interface Result {
  ResultadoID: number;
  FechaExamen: string;
  NombreExamen: string;
  Resultados: string;
  Observaciones: string;
  PacienteID: number;
  NombrePaciente: string;
  ApellidoPaciente: string;
}

export const PacienteResultado = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResultados = async () => {
      try {
        const data = await getResultadosLaboratorio();
        setResults(data);
        setError(null);
      } catch (err) {
        console.error("Error al obtener resultados:", err);
        setError("Hubo un error al cargar los resultados.");
      } finally {
        setLoading(false);
      }
    };
    fetchResultados();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filteredResults = results.filter(
      (result) =>
        result.NombreExamen.toLowerCase().includes(term) ||
        result.FechaExamen.includes(term) ||
        result.NombrePaciente.toLowerCase().includes(term) ||
        result.ApellidoPaciente.toLowerCase().includes(term)
    );
    setResults(filteredResults);
  };

  return (
    <Container>
      <Header>Historial de Resultados por Paciente</Header>
      <FilterContainer>
        <InputText
          placeholder="Buscar por nombre del examen, fecha o paciente..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </FilterContainer>
      {loading ? (
        <p>Cargando resultados...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <Table
          columnas={[
            { header: "Fecha del Examen", accessorKey: "FechaExamen" },
            { header: "Nombre del Examen", accessorKey: "NombreExamen" },
            { header: "Paciente", accessorKey: "Paciente" },
            { header: "Resultados", accessorKey: "Resultados" },
            { header: "Observaciones", accessorKey: "Observaciones" },
            { header: "Acciones", accessorKey: "Acciones" },
          ]}
          datos={results.map((result) => ({
            FechaExamen: new Date(result.FechaExamen).toLocaleDateString(),
            NombreExamen: result.NombreExamen,
            Paciente: `${result.NombrePaciente} ${result.ApellidoPaciente}`,
            Resultados: result.Resultados,
            Observaciones: result.Observaciones,
            Acciones: (
              <Button onClick={() => console.log("Ver detalles", result.ResultadoID)}>
                Ver Detalles
              </Button>
            ),
          }))}
        />
      )}
    </Container>
  );
};
