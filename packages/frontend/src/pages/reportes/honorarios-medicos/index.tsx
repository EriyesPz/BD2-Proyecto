/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { ButtonGroup, Container, FiltersContainer, Header, Section } from "./styled";
import { Button, InputDate, Label, Table } from "../../../components/ui";
import { FileText, FileSpreadsheet, Printer } from "lucide-react";
import { getHonorariosMedicos } from "../../../lib/api";

export const HonorariosMedicos = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateReport = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await getHonorariosMedicos(startDate, endDate);
      setResults(data);
    } catch (err) {
      console.error("Error fetching honorarios médicos:", err);
      setError("Hubo un error al generar el reporte. Por favor, inténtelo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleExportPDF = () => console.log("Exportando a PDF...");
  const handleExportExcel = () => console.log("Exportando a Excel...");
  const handlePrint = () => window.print();

  return (
    <Container>
      <Header>Reporte de Honorarios Médicos</Header>
      <form onSubmit={handleGenerateReport}>
        <Section>
          <FiltersContainer>
            <div>
              <Label htmlFor="startDate">Desde</Label>
              <InputDate value={startDate} onChange={setStartDate} />
            </div>
            <div>
              <Label htmlFor="endDate">Hasta</Label>
              <InputDate value={endDate} onChange={setEndDate} />
            </div>
          </FiltersContainer>
          <Button type="submit" style={{ marginTop: "20px" }}>
            Generar Reporte
          </Button>
        </Section>
      </form>

      {loading && <p>Cargando datos...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && results.length > 0 && (
        <>
          <Table
            columnas={[
              { header: "Médico", accessorKey: "NombreCompleto" },
              { header: "Especialidad", accessorKey: "NombreEspecialidad" },
              { header: "Número de Consultas", accessorKey: "NumeroConsultas" },
              { header: "Total de Honorarios", accessorKey: "TotalHonorariosConsultas" },
            ]}
            datos={results.map((row) => ({
              NombreCompleto: row.NombreCompleto,
              NombreEspecialidad: row.NombreEspecialidad,
              NumeroConsultas: row.NumeroConsultas,
              TotalHonorariosConsultas: `$${row.TotalHonorariosConsultas.toFixed(2)}`,
            }))}
          />
          <ButtonGroup>
            <Button onClick={handleExportPDF}>
              <FileText className="mr-2 h-4 w-4" />
              Exportar a PDF
            </Button>
            <Button onClick={handleExportExcel}>
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Exportar a Excel
            </Button>
            <Button onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" />
              Imprimir
            </Button>
          </ButtonGroup>
        </>
      )}
    </Container>
  );
};
