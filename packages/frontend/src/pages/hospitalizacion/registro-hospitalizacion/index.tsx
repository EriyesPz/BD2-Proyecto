/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import {
  FormActions,
  FormContainer,
  FormSection,
  FormTitle,
  RoomInfo,
} from "./styled";
import { Button, InputDate, InputText, Label, Select } from "../../../components/ui";
import { registrarHospitalizacion, getPacientes, getHabitaciones } from "../../../lib/api";

export const FormularioHospitalizacion = () => {
  const [pacientes, setPacientes] = useState([]);
  const [habitaciones, setHabitaciones] = useState([]);
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState<string | null>(null);
  const [habitacionSeleccionada, setHabitacionSeleccionada] = useState<string | null>(null);
  const [fechaIngreso, setFechaIngreso] = useState(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 10);
  });
  const [diagnostico, setDiagnostico] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const pacientesData = await getPacientes();
        const habitacionesData = await getHabitaciones();

        setPacientes(
          pacientesData.map((p: any) => ({
            value: p.PacienteID.toString(),
            label: `${p.Nombre} ${p.Apellido}`,
          }))
        );

        setHabitaciones(
          habitacionesData.map((h: any) => ({
            value: h.HabitacionID.toString(),
            label: `${h.NumeroHabitacion} - Tipo: ${h.TipoHabitacionID} ${
              h.Disponible ? "" : "(No disponible)"
            }`,
            disponible: h.Disponible,
          }))
        );
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    fetchData();
  }, []);

  const habitacionInfo = habitaciones.find(
    (h: any) => h.value === habitacionSeleccionada
  ) as { value: string; label: string; disponible: boolean } | undefined;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!pacienteSeleccionado || !habitacionSeleccionada || !diagnostico) {
      setErrorMessage("Por favor, complete todos los campos obligatorios.");
      return;
    }

    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      await registrarHospitalizacion({
        pacienteID: Number(pacienteSeleccionado),
        habitacionID: Number(habitacionSeleccionada),
        fechaIngreso,
        diagnostico,
      });
      setSuccessMessage("Hospitalización registrada correctamente.");
      setPacienteSeleccionado(null);
      setHabitacionSeleccionada(null);
      setFechaIngreso(new Date().toISOString().slice(0, 10));
      setDiagnostico("");
    } catch (error) {
      console.error("Error al registrar hospitalización:", error);
      setErrorMessage("Hubo un error al registrar la hospitalización.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <FormTitle>Registro de Hospitalización</FormTitle>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <FormSection>
          <Label>Paciente</Label>
          <Select
            options={pacientes}
            placeholder="Seleccione un paciente"
            onChange={(value) => setPacienteSeleccionado(value)}
          />
          <Button type="button" style={{ marginTop: "10px" }}>
            Registrar Nuevo Paciente
          </Button>
        </FormSection>
        <FormSection>
          <Label>Habitación</Label>
          <Select
            options={habitaciones.map((h: any) => ({
              value: h.value,
              label: h.label,
              disabled: !h.disponible,
            }))}
            placeholder="Seleccione una habitación"
            onChange={(value) => setHabitacionSeleccionada(value)}
          />
          {habitacionInfo && (
            <RoomInfo>
              Número: {habitacionInfo.label} - Disponible:{" "}
              {habitacionInfo.disponible ? "Sí" : "No"}
            </RoomInfo>
          )}
        </FormSection>
        <FormSection>
          <Label>Fecha de Ingreso</Label>
          <InputDate
            value={fechaIngreso}
            onChange={(value) => setFechaIngreso(value)}
          />
        </FormSection>
        <FormSection>
          <Label>Diagnóstico</Label>
          <InputText
            placeholder="Ingrese el diagnóstico del paciente"
            value={diagnostico}
            onChange={(e) => setDiagnostico(e.target.value)}
          />
        </FormSection>
        <FormActions>
          <Button type="button" disabled={loading}>
            Cancelar
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Guardar"}
          </Button>
        </FormActions>
      </form>
    </FormContainer>
  );
};
