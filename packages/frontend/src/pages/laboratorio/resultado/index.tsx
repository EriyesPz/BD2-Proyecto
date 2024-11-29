import React, { useState } from "react";
import styled from "styled-components";
import { InputText, Table, Button } from "../../../components/ui";

interface Result {
  id: number;
  date: string;
  examName: string;
  resultLink: string;
  observations: string;
}

const mockResults: Result[] = [
  {
    id: 1,
    date: "2023-11-15",
    examName: "Hemograma Completo",
    resultLink: "/results/hemograma-2023-11-15.pdf",
    observations: "Valores normales",
  },
  {
    id: 2,
    date: "2023-10-30",
    examName: "Perfil Lipídico",
    resultLink: "/results/lipidico-2023-10-30.pdf",
    observations: "Colesterol ligeramente elevado",
  },
  {
    id: 3,
    date: "2023-09-22",
    examName: "Glucosa en Ayunas",
    resultLink: "/results/glucosa-2023-09-22.pdf",
    observations: "Dentro del rango normal",
  },
];

// Estilización con styled-components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Roboto", sans-serif;
`;

const Header = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const FilterContainer = styled.div`
  margin-bottom: 20px;
`;

const Link = styled.a`
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export const PacienteResultado = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Result[]>(mockResults);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filteredResults = mockResults.filter(
      (result) =>
        result.examName.toLowerCase().includes(term) ||
        result.date.includes(term)
    );
    setResults(filteredResults);
  };

  return (
    <Container>
      <Header>Historial de Resultados por Paciente</Header>
      <FilterContainer>
        <InputText
          placeholder="Buscar por examen o fecha..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </FilterContainer>
      <Table
        columnas={[
          { header: "Fecha del Examen", accessorKey: "date" },
          { header: "Nombre del Examen", accessorKey: "examName" },
          { header: "Resultados", accessorKey: "resultLink" },
          { header: "Observaciones", accessorKey: "observations" },
          { header: "Acciones", accessorKey: "actions" },
        ]}
        datos={results.map((result) => ({
          date: result.date,
          examName: result.examName,
          resultLink: (
            <Link
              href={result.resultLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver/Descargar
            </Link>
          ),
          observations: result.observations,
          actions: (
            <Button onClick={() => console.log("Detalles", result.id)}>
              Ver Detalles
            </Button>
          ),
        }))}
      />
    </Container>
  );
}
