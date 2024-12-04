import React, { useEffect, useState } from "react";
import { Button, Label, Chart, Select } from "../../../components/ui";
import {
  Avatar,
  AvatarContainer,
  Calendar,
  Card,
  CardHeader,
  Container,
  Grid,
  Header,
  HighlightText,
  Text,
} from "./styled";
import { getMedicos, getMedicoPorID } from "../../../lib/api";

const chartData = [
  { month: "Ene", consultas: 65 },
  { month: "Feb", consultas: 59 },
  { month: "Mar", consultas: 80 },
  { month: "Abr", consultas: 81 },
  { month: "May", consultas: 56 },
  { month: "Jun", consultas: 55 },
];

export const DoctorPerfil = () => {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [selectedDoctorID, setSelectedDoctorID] = useState<number | null>(null);
  const [doctor, setDoctor] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await getMedicos();
        setDoctors(
          data.map((doctor: any) => ({
            value: doctor.MedicoID,
            label: `${doctor.Nombre} ${doctor.Apellido}`,
          }))
        );
      } catch (error) {
        console.error("Error al obtener la lista de médicos:", error);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    const fetchDoctor = async (id: number) => {
      setLoading(true);
      try {
        const data = await getMedicoPorID(id);
        setDoctor(data);
      } catch (error) {
        console.error("Error al obtener la información del médico:", error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedDoctorID) {
      fetchDoctor(selectedDoctorID);
    }
  }, [selectedDoctorID]);

  return (
    <Container>
      <Header>
        <h1>Perfil del Doctor</h1>
        <Select
          options={doctors}
          placeholder="Selecciona un médico"
          onChange={(value) => setSelectedDoctorID(Number(value))}
        />
      </Header>
      {loading && <Container>Cargando información del doctor...</Container>}
      {!loading && doctor && (
        <>
          <Grid>
            <Card>
              <CardHeader>Información del Doctor</CardHeader>
              <AvatarContainer>
                <Avatar>
                  {doctor.Nombre[0]}
                  {doctor.Apellido[0]}
                </Avatar>
                <div>
                  <HighlightText>
                    Dr. {doctor.Nombre} {doctor.Apellido}
                  </HighlightText>
                  <Text>Email: {doctor.Email}</Text>
                  <Text>Teléfono: {doctor.Telefono}</Text>
                </div>
              </AvatarContainer>
            </Card>
            <Card>
              <CardHeader>Especialidad y Honorarios</CardHeader>
              <Text>Especialidad: {doctor.NombreEspecialidad}</Text>
              <Grid>
                <div>
                  <Text>Honorarios Consulta:</Text>
                  <HighlightText>${doctor.HonorariosConsulta}</HighlightText>
                </div>
                <div>
                  <Text>Honorarios Cirugía:</Text>
                  <HighlightText>
                    {doctor.HonorariosCirugia
                      ? `$${doctor.HonorariosCirugia}`
                      : "No aplica"}
                  </HighlightText>
                </div>
              </Grid>
            </Card>
          </Grid>
          <Grid>
            {/* Calendario */}
            <Card>
              <CardHeader>Calendario de Citas</CardHeader>
              <Calendar>
                <Label>Calendario Placeholder</Label>
              </Calendar>
              <div style={{ textAlign: "right", marginTop: "16px" }}>
                <Button>Nueva Cita</Button>
              </div>
            </Card>
            <Card>
              <CardHeader>Estadísticas</CardHeader>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "16px",
                }}
              >
                <div>
                  <Text>Consultas Completadas:</Text>
                  <HighlightText>396</HighlightText>
                </div>
                <div>
                  <Text>Total Honorarios:</Text>
                  <HighlightText>$59,400</HighlightText>
                </div>
              </div>
              <Chart
                data={chartData}
                xKey="month"
                yKey="consultas"
                barColor="#0ea5e9"
                title="Consultas Mensuales"
              />
            </Card>
          </Grid>
        </>
      )}
    </Container>
  );
};
