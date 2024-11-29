import { useState } from "react";
import { Table, Select, InputText, Label } from "../../components/ui";
import styled from "styled-components";

type DoctorType = "internal" | "external";
type Specialty =
  | "Cardiology"
  | "Dermatology"
  | "Neurology"
  | "Pediatrics"
  | "Orthopedics"
  | "General Medicine";

interface Doctor {
  id: string;
  fullName: string;
  specialty: Specialty;
  type: DoctorType;
  phone: string;
  email: string;
}

const doctors: Doctor[] = [
  {
    id: "1",
    fullName: "Dr. John Smith",
    specialty: "Cardiology",
    type: "internal",
    phone: "+1 (555) 123-4567",
    email: "john.smith@hospital.com",
  },
  {
    id: "2",
    fullName: "Dr. Sarah Johnson",
    specialty: "Pediatrics",
    type: "external",
    phone: "+1 (555) 234-5678",
    email: "sarah.johnson@hospital.com",
  },
  {
    id: "3",
    fullName: "Dr. Michael Chen",
    specialty: "Neurology",
    type: "internal",
    phone: "+1 (555) 345-6789",
    email: "michael.chen@hospital.com",
  },
];

// Columnas de la tabla
const columnas = [
  {
    header: "Full Name",
    accessorKey: "fullName",
  },
  {
    header: "Specialty",
    accessorKey: "specialty",
  },
  {
    header: "Type",
    accessorKey: "type",
  },
  {
    header: "Phone",
    accessorKey: "phone",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
];

const Container = styled.div`
  padding: 20px;
  font-family: "Roboto", sans-serif;
`;

const Header = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
`;

const Filter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const DoctorsPage = () => {
  const [filterName, setFilterName] = useState<string>("");
  const [filterSpecialty, setFilterSpecialty] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesName =
      filterName === "" ||
      doctor.fullName.toLowerCase().includes(filterName.toLowerCase());
    const matchesSpecialty =
      filterSpecialty === "all" || doctor.specialty === filterSpecialty;
    const matchesType = filterType === "all" || doctor.type === filterType;
    return matchesName && matchesSpecialty && matchesType;
  });

  return (
    <Container>
      <Header>Doctores</Header>

      <FiltersContainer>
        <Filter>
          <Label>Buscar por nombre</Label>
          <InputText
            placeholder="Enter doctor name..."
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
          />
        </Filter>
        <Filter>
          <Label>Especialidad</Label>
          <Select
            options={[
                { value: "Cardiology", label: "Cardiology" },
                { value: "Dermatology", label: "Dermatology" },
            ]}
            onChange={(value) => setFilterSpecialty(value)}
          />
        </Filter>
        <Filter>
          <Label>Tipo de doctor</Label>
          <Select
            options={[
              { value: "all", label: "All Types" },
              { value: "internal", label: "Internal" },
              { value: "external", label: "External" },
            ]}
            onChange={(value) => setFilterType(value)}
          />
        </Filter>
      </FiltersContainer>

      <Table columnas={columnas} datos={filteredDoctors} />
    </Container>
  );
}
