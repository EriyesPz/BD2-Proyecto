import { useState, useEffect } from "react";
import { Table, Select, InputText, Label } from "../../../components/ui";
import { Container, Header, FiltersContainer, Filter } from "./styled";
import { getMedicos } from "../../../lib/api";

interface Doctor {
  id: number;
  fullName: string;
  specialty: string;
  type: "internal" | "external";
  phone: string;
  email: string;
}

const COLUMNAS = [
  { header: "Nombre Completo", accessorKey: "fullName" },
  { header: "Especialidad", accessorKey: "specialty" },
  { header: "Tipo", accessorKey: "type" },
  { header: "Telefono", accessorKey: "phone" },
  { header: "Email", accessorKey: "email" },
];

export const DoctorsPage = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [filterName, setFilterName] = useState<string>("");
  const [filterSpecialty, setFilterSpecialty] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await getMedicos();

        // Procesar los médicos obtenidos
        const processedDoctors = data.map((medico: any) => ({
          id: medico.MedicoID,
          fullName: `${medico.Nombre} ${medico.Apellido}`,
          specialty: medico.NombreEspecialidad || "Unknown",
          type: medico.Interno ? "internal" : "external",
          phone: medico.Telefono,
          email: medico.Email,
        }));

        setDoctors(processedDoctors);

        const uniqueSpecialties = Array.from(
          new Set(processedDoctors.map((doctor: any) => doctor.specialty))
        ).filter((specialty) => specialty !== "Unknown") as string[];

        setSpecialties(uniqueSpecialties);
      } catch (error) {
        console.error("Error al obtener los médicos:", error);
      }
    };

    fetchDoctors();
  }, []);

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
            placeholder="Doctor..."
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
          />
        </Filter>
        <Filter>
          <Label>Especialidad</Label>
          <Select
            options={[
              { value: "all", label: "Especialidades" },
              ...specialties.map((specialty) => ({
                value: specialty,
                label: specialty,
              })),
            ]}
            onChange={(value) => setFilterSpecialty(value)}
          />
        </Filter>
        <Filter>
          <Label>Tipo de doctor</Label>
          <Select
            options={[
              { value: "all", label: "Tipos" },
              { value: "internal", label: "Interno" },
              { value: "external", label: "Externo" },
            ]}
            onChange={(value) => setFilterType(value)}
          />
        </Filter>
      </FiltersContainer>

      <Table columnas={COLUMNAS} datos={filteredDoctors} />
    </Container>
  );
};
