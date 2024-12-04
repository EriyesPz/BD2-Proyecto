import React, { useState } from "react";
import { Label, InputText, Button, Select } from "../../../components/ui";
import { ButtonGroup, Container, FieldGroup, Form, Header } from "./styled";
import { insertarMedico } from "../../../lib/api"; // Importar la función de la API para insertar médicos

const especialidades = [
  { value: 1, label: "Cardiología" },
  { value: 2, label: "Dermatología" },
  { value: 3, label: "Neurología" },
  { value: 4, label: "Pediatría" },
  { value: 5, label: "Ortopedia" },
  { value: 6, label: "Medicina General" },
];

export const RegistrarDoctor = () => {
  const [formValues, setFormValues] = useState({
    nombre: "",
    apellido: "",
    especialidad: "",
    tipo: "",
    honorariosConsulta: "",
    honorariosCirugia: "",
    telefono: "",
    email: "",
    direccion: {
      calle: "",
      ciudad: "",
      estado: "",
      codigoPostal: "",
    },
  });
  const [cargando, setCargando] = useState(false); // Manejar el estado de carga
  const [mensajeExito, setMensajeExito] = useState<string | null>(null);

  const handleChange = (campo: string, valor: string) => {
    if (campo.includes("direccion.")) {
      const campoDireccion = campo.split(".")[1];
      setFormValues((prev) => ({
        ...prev,
        direccion: {
          ...prev.direccion,
          [campoDireccion]: valor,
        },
      }));
    } else {
      setFormValues((prev) => ({
        ...prev,
        [campo]: valor,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const {
      nombre,
      apellido,
      especialidad,
      tipo,
      honorariosConsulta,
      honorariosCirugia,
      telefono,
      email,
      direccion,
    } = formValues;

    // Validaciones simples
    if (
      !nombre ||
      !apellido ||
      !especialidad ||
      !tipo ||
      !honorariosConsulta ||
      !telefono ||
      !email
    ) {
      alert("Por favor, complete todos los campos requeridos.");
      return;
    }

    setCargando(true);
    setMensajeExito(null);

    try {
      // Preparar datos para el envío
      await insertarMedico({
        nombre,
        apellido,
        especialidadID: Number(especialidad),
        interno: tipo === "internal",
        honorariosConsulta: parseFloat(honorariosConsulta),
        honorariosCirugia: parseFloat(honorariosCirugia),
        direccionID: 1, // Supongamos que es una dirección genérica (puedes reemplazarlo por un ID dinámico)
        telefono,
        email,
      });

      setMensajeExito("¡Doctor registrado exitosamente!");
      setFormValues({
        nombre: "",
        apellido: "",
        especialidad: "",
        tipo: "",
        honorariosConsulta: "",
        honorariosCirugia: "",
        telefono: "",
        email: "",
        direccion: {
          calle: "",
          ciudad: "",
          estado: "",
          codigoPostal: "",
        },
      });
    } catch (error) {
      console.error("Error al registrar al doctor:", error);
      alert("Ocurrió un error al registrar al doctor.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <Container>
      <Header>Registrar Nuevo Doctor</Header>
      {mensajeExito && <p style={{ color: "green" }}>{mensajeExito}</p>}
      <Form onSubmit={handleSubmit}>
        {/* Nombres */}
        <FieldGroup>
          <Label>Nombre</Label>
          <InputText
            placeholder="Ingrese el nombre"
            value={formValues.nombre}
            onChange={(e) => handleChange("nombre", e.target.value)}
          />
        </FieldGroup>
        <FieldGroup>
          <Label>Apellido</Label>
          <InputText
            placeholder="Ingrese el apellido"
            value={formValues.apellido}
            onChange={(e) => handleChange("apellido", e.target.value)}
          />
        </FieldGroup>

        {/* Especialidad y Tipo */}
        <FieldGroup>
          <Label>Especialidad</Label>
          <Select
            options={especialidades}
            onChange={(value) => handleChange("especialidad", value)}
            placeholder="Seleccione una especialidad"
          />
        </FieldGroup>
        <FieldGroup>
          <Label>Tipo</Label>
          <Select
            options={[
              { value: "internal", label: "Interno" },
              { value: "external", label: "Externo" },
            ]}
            onChange={(value) => handleChange("tipo", value)}
            placeholder="Seleccione el tipo"
          />
        </FieldGroup>
        <FieldGroup>
          <Label>Honorarios por Consulta</Label>
          <InputText
            type="number"
            placeholder="Ingrese los honorarios por consulta"
            value={formValues.honorariosConsulta}
            onChange={(e) =>
              handleChange("honorariosConsulta", e.target.value)
            }
          />
        </FieldGroup>
        <FieldGroup>
          <Label>Honorarios por Cirugía</Label>
          <InputText
            type="number"
            placeholder="Ingrese los honorarios por cirugía"
            value={formValues.honorariosCirugia}
            onChange={(e) =>
              handleChange("honorariosCirugia", e.target.value)
            }
          />
        </FieldGroup>
        <FieldGroup>
          <Label>Teléfono</Label>
          <InputText
            type="tel"
            placeholder="Ingrese el número de teléfono"
            value={formValues.telefono}
            onChange={(e) => handleChange("telefono", e.target.value)}
          />
        </FieldGroup>
        <FieldGroup>
          <Label>Email</Label>
          <InputText
            type="email"
            placeholder="Ingrese el correo electrónico"
            value={formValues.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </FieldGroup>
        {/* Dirección */}
        <FieldGroup>
          <Label>Calle</Label>
          <InputText
            placeholder="Ingrese la calle"
            value={formValues.direccion.calle}
            onChange={(e) => handleChange("direccion.calle", e.target.value)}
          />
        </FieldGroup>
        <FieldGroup>
          <Label>Ciudad</Label>
          <InputText
            placeholder="Ingrese la ciudad"
            value={formValues.direccion.ciudad}
            onChange={(e) => handleChange("direccion.ciudad", e.target.value)}
          />
        </FieldGroup>
        <FieldGroup>
          <Label>Estado</Label>
          <InputText
            placeholder="Ingrese el estado"
            value={formValues.direccion.estado}
            onChange={(e) => handleChange("direccion.estado", e.target.value)}
          />
        </FieldGroup>
        <FieldGroup>
          <Label>Código Postal</Label>
          <InputText
            placeholder="Ingrese el código postal"
            value={formValues.direccion.codigoPostal}
            onChange={(e) =>
              handleChange("direccion.codigoPostal", e.target.value)
            }
          />
        </FieldGroup>
        <ButtonGroup>
          <Button type="button" onClick={() => console.log("Cancelado")}>
            Cancelar
          </Button>
          <Button type="submit" disabled={cargando}>
            {cargando ? "Guardando..." : "Guardar"}
          </Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
};
