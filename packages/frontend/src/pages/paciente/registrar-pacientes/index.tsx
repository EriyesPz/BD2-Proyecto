import { useState, useEffect } from "react";
import {
  Button,
  InputDate,
  InputText,
  Label,
  Select,
} from "../../../components/ui";
import {
  insertarPaciente,
  insertarDireccion,
  getSegurosMedicos,
  insertarSeguroMedico,
  insertarPacienteSeguro,
} from "../../../lib/api";
import { SelectOption } from "../../../components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  Section,
  SectionTitle,
  Grid,
  FullWidth,
} from "./styled";

export const RegistroPaciente = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [genero, setGenero] = useState<string | null>(null);
  const [numeroSeguroSocial, setNumeroSeguroSocial] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [calle, setCalle] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [estado, setEstado] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [pais, setPais] = useState("");
  const [insuranceProviders, setInsuranceProviders] = useState<SelectOption[]>(
    []
  );
  const [aseguradoraSeleccionada, setAseguradoraSeleccionada] = useState<
    string | null
  >(null);
  const [numeroPoliza, setNumeroPoliza] = useState("");
  const [fechaVencimiento, setFechaVencimiento] = useState("");

  useEffect(() => {
    const fetchInsuranceProviders = async () => {
      try {
        const seguros = await getSegurosMedicos();
        const options: SelectOption[] = seguros.map((seguro: any) => ({
          value: seguro.SeguroID.toString(),
          label: seguro.NombreAseguradora,
        }));
        setInsuranceProviders(options);
      } catch (error) {
        console.error("Error al obtener seguros médicos:", error);
      }
    };

    fetchInsuranceProviders();
  }, []);

  const addNewInsuranceProvider = async () => {
    const newProviderName = prompt(
      "Ingrese el nombre de la nueva aseguradora:"
    );
    if (newProviderName) {
      try {
        const seguroMedicoData = {
          nombreAseguradora: newProviderName,
          cobertura: "Cobertura estándar",
          telefono: "N/A",
          email: "N/A",
        };
        const seguroResponse = await insertarSeguroMedico(seguroMedicoData);
        const nuevoSeguroID = seguroResponse.seguroID.toString();

        const newOption: SelectOption = {
          value: nuevoSeguroID,
          label: newProviderName,
        };
        setInsuranceProviders((prev) => [...prev, newOption]);
        setAseguradoraSeleccionada(nuevoSeguroID);
      } catch (error) {
        console.error("Error al insertar nueva aseguradora:", error);
        alert("Ocurrió un error al agregar la nueva aseguradora.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!fechaNacimiento || isNaN(Date.parse(fechaNacimiento))) {
        alert("Por favor, ingresa una fecha de nacimiento válida.");
        return;
      }
      if (!genero) {
        alert("Por favor, selecciona un género válido.");
        return;
      }

      const formattedFechaNacimiento = new Date(fechaNacimiento)
        .toISOString()
        .split("T")[0];

      const direccionData = { calle, ciudad, estado, codigoPostal, pais };
      const direccionResponse = await insertarDireccion(direccionData);
      const direccionID = direccionResponse.direccionID;

      const pacienteData = {
        nombre,
        apellido,
        fechaNacimiento: formattedFechaNacimiento,
        genero: genero || "M",
        telefono,
        email,
        direccionID: Number(direccionID),
        numeroSeguroSocial,
      };

      const pacienteResponse = await insertarPaciente(pacienteData);
      const pacienteID = pacienteResponse.pacienteID;

      if (aseguradoraSeleccionada) {
        const pacienteSeguroData = {
          pacienteID,
          seguroID: Number(aseguradoraSeleccionada),
          numeroPoliza,
          fechaVencimiento,
        };
        await insertarPacienteSeguro(pacienteSeguroData);
      }

      alert("Paciente registrado correctamente.");
      handleCancel();
    } catch (error) {
      console.error("Error al registrar paciente:", error);
      alert("Ocurrió un error al registrar el paciente.");
    }
  };

  const handleCancel = () => {
    setNombre("");
    setApellido("");
    setFechaNacimiento("");
    setGenero(null);
    setNumeroSeguroSocial("");
    setTelefono("");
    setEmail("");
    setCalle("");
    setCiudad("");
    setEstado("");
    setCodigoPostal("");
    setPais("");
    setAseguradoraSeleccionada(null);
    setNumeroPoliza("");
    setFechaVencimiento("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registro/Edición de Paciente</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <Section>
          <SectionTitle>Información Personal</SectionTitle>
          <Grid>
            <div>
              <Label htmlFor="nombre">Nombre</Label>
              <InputText
                id="nombre"
                placeholder="Escribe el nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="apellido">Apellido</Label>
              <InputText
                id="apellido"
                placeholder="Escribe el apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="fechaNacimiento">Fecha de Nacimiento</Label>
              <InputDate
                value={fechaNacimiento}
                onChange={(value) => setFechaNacimiento(value)}
              />
            </div>
            <div>
              <Label htmlFor="genero">Género</Label>
              <Select
                options={[
                  { value: "M", label: "Masculino" },
                  { value: "F", label: "Femenino" },
                  { value: "O", label: "Otro" },
                ]}
                placeholder="Seleccionar género"
                onChange={(value) => setGenero(value)}
              />
            </div>
            <div>
              <Label htmlFor="nss">Número de Seguro Social</Label>
              <InputText
                id="nss"
                placeholder="Escribe el NSS"
                value={numeroSeguroSocial}
                onChange={(e) => setNumeroSeguroSocial(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="telefono">Teléfono</Label>
              <InputText
                id="telefono"
                placeholder="Escribe el teléfono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>
            <FullWidth>
              <Label htmlFor="email">Email</Label>
              <InputText
                id="email"
                placeholder="Escribe el email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FullWidth>
          </Grid>
        </Section>
        <Section>
          <SectionTitle>Dirección</SectionTitle>
          <Grid>
            <FullWidth>
              <Label htmlFor="calle">Calle</Label>
              <InputText
                id="calle"
                placeholder="Escribe la calle"
                value={calle}
                onChange={(e) => setCalle(e.target.value)}
              />
            </FullWidth>
            <div>
              <Label htmlFor="ciudad">Ciudad</Label>
              <InputText
                id="ciudad"
                placeholder="Escribe la ciudad"
                value={ciudad}
                onChange={(e) => setCiudad(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="estado">Estado</Label>
              <InputText
                id="estado"
                placeholder="Escribe el estado"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="codigoPostal">Código Postal</Label>
              <InputText
                id="codigoPostal"
                placeholder="Escribe el código postal"
                value={codigoPostal}
                onChange={(e) => setCodigoPostal(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="pais">País</Label>
              <InputText
                id="pais"
                placeholder="Escribe el país"
                value={pais}
                onChange={(e) => setPais(e.target.value)}
              />
            </div>
          </Grid>
        </Section>
        <Section>
          <SectionTitle>Seguro Médico</SectionTitle>
          <Grid>
            <div>
              <Label htmlFor="aseguradora">Aseguradora</Label>
              <Select
                options={insuranceProviders}
                placeholder="Seleccionar aseguradora"
                onChange={(value) => setAseguradoraSeleccionada(value)}
              />
            </div>
            <div>
              <Label htmlFor="numeroPoliza">Número de Póliza</Label>
              <InputText
                id="numeroPoliza"
                placeholder="Escribe el número de póliza"
                value={numeroPoliza}
                onChange={(e) => setNumeroPoliza(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="fechaVencimiento">Fecha de Vencimiento</Label>
              <InputDate
                value={fechaVencimiento}
                onChange={(value) => setFechaVencimiento(value)}
              />
            </div>
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <Button type="button" onClick={addNewInsuranceProvider}>
                Agregar Nueva Aseguradora
              </Button>
            </div>
          </Grid>
        </Section>
        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}
        >
          <Button type="button" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button type="submit">Guardar</Button>
        </div>
      </form>
    </Card>
  );
};
