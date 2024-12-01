import React, { useState } from "react";
import styled from "styled-components";
import { Button, InputDate, Select, Label, Table } from "../../../components/ui";
import { FileText, FileSpreadsheet, Printer } from "lucide-react";

// Mock data for demonstration
const mockDoctors = [
  { id: "1", name: "Dr. Juan Pérez" },
  { id: "2", name: "Dra. María González" },
  { id: "3", name: "Dr. Carlos Rodríguez" },
];

const mockSpecialties = [
  { id: "1", name: "Cardiología" },
  { id: "2", name: "Pediatría" },
  { id: "3", name: "Dermatología" },
];

const mockResults = [
  { id: "1", doctor: "Dr. Juan Pérez", specialty: "Cardiología", consultations: 25, totalFees: 2500 },
  { id: "2", doctor: "Dra. María González", specialty: "Pediatría", consultations: 30, totalFees: 2700 },
  { id: "3", doctor: "Dr. Carlos Rodríguez", specialty: "Dermatología", consultations: 20, totalFees: 2000 },
];

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Roboto", sans-serif;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const Header = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const FiltersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

export const HonorariosMedicos = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [results, setResults] = useState<typeof mockResults>([]);

  const handleGenerateReport = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate fetching filtered data
    setResults(mockResults);
  };

  const handleExportPDF = () => console.log("Exporting to PDF...");
  const handleExportExcel = () => console.log("Exporting to Excel...");
  const handlePrint = () => window.print();

  return (
    <Container>
      <Header>Reporte de Honorarios Médicos</Header>
      <form onSubmit={handleGenerateReport}>
        <Section>
          <FiltersContainer>
            <div>
              <Label htmlFor="startDate">Desde</Label>
              <InputDate
                value={startDate}
                onChange={setStartDate}
              />
            </div>
            <div>
              <Label htmlFor="endDate">Hasta</Label>
              <InputDate
                value={endDate}
                onChange={setEndDate}
              />
            </div>
            <div>
              <Label htmlFor="doctor">Médico</Label>
              <Select
                options={mockDoctors.map((doctor) => ({
                  value: doctor.id,
                  label: doctor.name,
                }))}
                onChange={setSelectedDoctor}
                placeholder="Seleccionar médico"
              />
            </div>
            <div>
              <Label htmlFor="specialty">Especialidad</Label>
              <Select
                options={mockSpecialties.map((specialty) => ({
                  value: specialty.id,
                  label: specialty.name,
                }))}
                onChange={setSelectedSpecialty}
                placeholder="Seleccionar especialidad"
              />
            </div>
          </FiltersContainer>
          <Button type="submit" style={{ marginTop: "20px" }}>
            Generar Reporte
          </Button>
        </Section>
      </form>
      {results.length > 0 && (
        <>
          <Table
            columnas={[
              { header: "Médico", accessorKey: "doctor" },
              { header: "Especialidad", accessorKey: "specialty" },
              { header: "Número de Consultas", accessorKey: "consultations" },
              { header: "Total de Honorarios", accessorKey: "totalFees" },
            ]}
            datos={results.map((row) => ({
              doctor: row.doctor,
              specialty: row.specialty,
              consultations: row.consultations,
              totalFees: `$${row.totalFees.toFixed(2)}`,
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
