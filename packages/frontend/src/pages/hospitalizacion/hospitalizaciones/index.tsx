import { useState, useEffect } from "react";
import {
  Badge,
  Container,
  FilterContainer,
  Header,
  TableActions,
} from "./styled";
import {
  Button,
  InputDate,
  InputText,
  Label,
  Select,
  Table,
} from "../../../components/ui";
import { format, differenceInDays, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { getHospitalizaciones } from "../../../lib/api";

const getEstadoBadge = (estado: string) => {
  switch (estado.toLowerCase()) {
    case "activo":
      return <Badge color="#4caf50">Activa</Badge>;
    case "alta":
      return <Badge color="#2196f3">Alta</Badge>;
    case "cancelado":
      return <Badge color="#f44336">Cancelado</Badge>;
    default:
      return null;
  }
};

export const Hospitalizacion = () => {
  const [hospitalizaciones, setHospitalizaciones] = useState<any[]>([]);
  const [filteredHospitalizaciones, setFilteredHospitalizaciones] =
    useState<any[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [estado, setEstado] = useState("todas");
  const [fechaInicio, setFechaInicio] = useState<string>(""); 
  const [fechaFin, setFechaFin] = useState<string>("");
  

  useEffect(() => {
    const fetchHospitalizaciones = async () => {
      try {
        const data = await getHospitalizaciones();
        setHospitalizaciones(data);
        setFilteredHospitalizaciones(data); // Inicialmente muestra todos
      } catch (error) {
        console.error("Error al cargar hospitalizaciones:", error);
      }
    };

    fetchHospitalizaciones();
  }, []);

  useEffect(() => {
    let resultados = hospitalizaciones;

    // Filtrar por búsqueda de paciente
    if (busqueda) {
      resultados = resultados.filter((h) =>
        h.PacienteID.toString().includes(busqueda)
      );
    }

    // Filtrar por estado
    if (estado !== "todas") {
      resultados = resultados.filter((h) =>
        h.Estado.toLowerCase() === estado.toLowerCase()
      );
    }

    // Filtrar por rango de fechas
    if (fechaInicio) {
      resultados = resultados.filter(
        (h) => new Date(h.FechaIngreso) >= new Date(fechaInicio)
      );
    }
    if (fechaFin) {
      resultados = resultados.filter(
        (h) => new Date(h.FechaIngreso) <= new Date(fechaFin)
      );
    }

    setFilteredHospitalizaciones(resultados);
  }, [busqueda, estado, fechaInicio, fechaFin, hospitalizaciones]);

  return (
    <Container>
      <Header>
        <h1>Gestión de Hospitalizaciones</h1>
        <Button>+ Nueva Hospitalización</Button>
      </Header>
      <FilterContainer>
        <div>
          <Label>Búsqueda</Label>
          <InputText
            placeholder="Buscar por paciente ID..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <div>
          <Label>Estado</Label>
          <Select
            options={[
              { value: "todas", label: "Todas" },
              { value: "activo", label: "Activas" },
              { value: "alta", label: "Alta" },
              { value: "cancelado", label: "Cancelado" },
            ]}
            onChange={(value) => setEstado(value)}
            placeholder="Seleccionar estado"
          />
        </div>
        <div>
          <Label>Fecha Inicio</Label>
          <InputDate value={fechaInicio} onChange={(date) => setFechaInicio(date)} />
        </div>
        <div>
          <Label>Fecha Fin</Label>
          <InputDate value={fechaFin} onChange={(date) => setFechaFin(date)} />
        </div>
      </FilterContainer>
      <Table
        columnas={[
          { header: "Paciente", accessorKey: "NombrePaciente" },
          { header: "Habitación", accessorKey: "HabitacionID" },
          { header: "Fecha de Ingreso", accessorKey: "FechaIngreso" },
          { header: "Estado", accessorKey: "Estado" },
        ]}
        datos={hospitalizaciones.map((h) => ({
          NombrePaciente: h.NombrePaciente,
          HabitacionID: h.HabitacionID,
          FechaIngreso: format(parseISO(h.FechaIngreso), "dd/MM/yyyy", { locale: es }),
          Estado: h.Estado
        }))}
      />

    </Container>
  );
};
