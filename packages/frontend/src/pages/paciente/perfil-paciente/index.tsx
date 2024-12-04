import { useState, useEffect } from "react";
import { Table, InputText, Label, Select } from "../../../components/ui";
import { getPacientes, getPacientePorID } from "../../../lib/api";
import {
  Container,
  Card,
  CardHeader,
  CardTitle,
  Grid,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "./styled";

export const PerfilPaciente = () => {
  const [pacientes, setPacientes] = useState<any[]>([]);
  const [selectedPacienteID, setSelectedPacienteID] = useState<number | null>(null);
  const [paciente, setPaciente] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("consultas");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const data = await getPacientes();
        setPacientes(data);
      } catch (error) {
        console.error("Error al obtener pacientes:", error);
      }
    };
    fetchPacientes();
  }, []);

  const fetchPaciente = async (id: number) => {
    setLoading(true);
    try {
      const data = await getPacientePorID(id);

      // Formatear las fechas en el objeto del paciente
      const formattedData = {
        ...data,
        FechaRegistro: new Intl.DateTimeFormat("es-ES", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }).format(new Date(data.FechaRegistro)),
      };

      setPaciente(formattedData);
    } catch (error) {
      console.error("Error al obtener el paciente:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePacienteChange = (value: number) => {
    setSelectedPacienteID(value);
    fetchPaciente(value);
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <Container>
      {/* Selector de Paciente */}
      <Card>
        <CardHeader>
          <CardTitle>Seleccionar Paciente</CardTitle>
        </CardHeader>
        <Select
          options={pacientes.map((p) => ({
            value: p.PacienteID,
            label: `${p.Nombre} ${p.Apellido}`,
          }))}
          placeholder="Selecciona un paciente"
          onChange={(value) => handlePacienteChange(Number(value))}
        />
      </Card>

      {/* Información Personal */}
      {paciente && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
            </CardHeader>
            <div>
              {editMode ? (
                <form>
                  <Grid>
                    {Object.entries(paciente).map(([key, value]) => (
                      <div key={key}>
                        <Label htmlFor={key}>
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </Label>
                        <InputText
                          id={key}
                          defaultValue={String(value)} // Convertimos a string
                        />
                      </div>
                    ))}
                  </Grid>
                </form>
              ) : (
                <Grid>
                  {Object.entries(paciente).map(([key, value]) => (
                    <p key={key}>
                      <strong>
                        {key.charAt(0).toUpperCase() + key.slice(1)}:
                      </strong>{" "}
                      {value}
                    </p>
                  ))}
                </Grid>
              )}
            </div>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Historial Médico</CardTitle>
            </CardHeader>
            <Tabs>
              <TabsList>
                <TabsTrigger
                  active={activeTab === "consultas"}
                  onClick={() => setActiveTab("consultas")}
                >
                  Consultas
                </TabsTrigger>
                <TabsTrigger
                  active={activeTab === "hospitalizaciones"}
                  onClick={() => setActiveTab("hospitalizaciones")}
                >
                  Hospitalizaciones
                </TabsTrigger>
                <TabsTrigger
                  active={activeTab === "examenes"}
                  onClick={() => setActiveTab("examenes")}
                >
                  Exámenes
                </TabsTrigger>
                <TabsTrigger
                  active={activeTab === "prescripciones"}
                  onClick={() => setActiveTab("prescripciones")}
                >
                  Prescripciones
                </TabsTrigger>
              </TabsList>
              <TabsContent visible={activeTab === "consultas"}>
                <Table
                  columnas={[
                    { header: "Fecha", accessorKey: "fecha" },
                    { header: "Médico", accessorKey: "medico" },
                    { header: "Motivo", accessorKey: "motivo" },
                    { header: "Diagnóstico", accessorKey: "diagnostico" },
                  ]}
                  datos={paciente.consultas || []}
                />
              </TabsContent>
            </Tabs>
          </Card>
        </>
      )}
    </Container>
  );
};
