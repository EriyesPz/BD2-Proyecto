import { useState } from "react";
import { Button, InputDate, InputText, Label, Select } from "../../../components/ui";
import styled from "styled-components";

const Card = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 20px auto;
  padding: 16px;
  font-family: "Roboto", sans-serif;
`;

const CardHeader = styled.div`
  padding-bottom: 16px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 16px;
`;

const CardTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;

const Section = styled.div`
  margin-bottom: 24px;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #444;
  margin-bottom: 16px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const FullWidth = styled.div`
  grid-column: span 2;
`;

export const RegistroPaciente = () => {
  const [insuranceProviders, setInsuranceProviders] = useState([
    { value: "Provider A", label: "Provider A" },
    { value: "Provider B", label: "Provider B" },
    { value: "Provider C", label: "Provider C" },
  ]);
  const [birthDate, setBirthDate] = useState("");
  const [insuranceExpiryDate, setInsuranceExpiryDate] = useState("");

  const addNewInsuranceProvider = () => {
    const newProvider = prompt("Enter new insurance provider name:");
    if (newProvider) {
      setInsuranceProviders([
        ...insuranceProviders,
        { value: newProvider, label: newProvider },
      ]);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registro/Edición de Paciente</CardTitle>
      </CardHeader>
      <form>
        {/* Información Personal */}
        <Section>
          <SectionTitle>Información Personal</SectionTitle>
          <Grid>
            <div>
              <Label htmlFor="nombre">Nombre</Label>
              <InputText id="nombre" placeholder="Escribe el nombre" />
            </div>
            <div>
              <Label htmlFor="apellido">Apellido</Label>
              <InputText id="apellido" placeholder="Escribe el apellido" />
            </div>
            <div>
              <Label htmlFor="fechaNacimiento">Fecha de Nacimiento</Label>
              <InputDate
                value={birthDate}
                onChange={(value) => setBirthDate(value)}
              />
            </div>
            <div>
              <Label htmlFor="genero">Género</Label>
              <Select
                options={[
                  { value: "Masculino", label: "Masculino" },
                  { value: "Femenino", label: "Femenino" },
                  { value: "Otro", label: "Otro" },
                ]}
                placeholder="Seleccionar género"
              />
            </div>
            <div>
              <Label htmlFor="nss">Número de Seguro Social</Label>
              <InputText id="nss" placeholder="Escribe el NSS" />
            </div>
            <div>
              <Label htmlFor="telefono">Teléfono</Label>
              <InputText id="telefono" placeholder="Escribe el teléfono" />
            </div>
            <FullWidth>
              <Label htmlFor="email">Email</Label>
              <InputText id="email" placeholder="Escribe el email" />
            </FullWidth>
          </Grid>
        </Section>

        {/* Dirección */}
        <Section>
          <SectionTitle>Dirección</SectionTitle>
          <Grid>
            <FullWidth>
              <Label htmlFor="calle">Calle</Label>
              <InputText id="calle" placeholder="Escribe la calle" />
            </FullWidth>
            <div>
              <Label htmlFor="ciudad">Ciudad</Label>
              <InputText id="ciudad" placeholder="Escribe la ciudad" />
            </div>
            <div>
              <Label htmlFor="estado">Estado</Label>
              <InputText id="estado" placeholder="Escribe el estado" />
            </div>
            <div>
              <Label htmlFor="codigoPostal">Código Postal</Label>
              <InputText id="codigoPostal" placeholder="Escribe el código postal" />
            </div>
            <div>
              <Label htmlFor="pais">País</Label>
              <InputText id="pais" placeholder="Escribe el país" />
            </div>
          </Grid>
        </Section>

        {/* Seguro Médico */}
        <Section>
          <SectionTitle>Seguro Médico</SectionTitle>
          <Grid>
            <div>
              <Label htmlFor="aseguradora">Aseguradora</Label>
              <Select
                options={insuranceProviders}
                placeholder="Seleccionar aseguradora"
              />
            </div>
            <div>
              <Label htmlFor="numeroPoliza">Número de Póliza</Label>
              <InputText id="numeroPoliza" placeholder="Escribe el número de póliza" />
            </div>
            <div>
              <Label htmlFor="fechaVencimiento">Fecha de Vencimiento</Label>
              <InputDate
                value={insuranceExpiryDate}
                onChange={(value) => setInsuranceExpiryDate(value)}
              />
            </div>
            <div className="flex items-end">
              <Button type="button" onClick={addNewInsuranceProvider}>
                Agregar Nueva Aseguradora
              </Button>
            </div>
          </Grid>
        </Section>

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
          <Button type="button">Cancelar</Button>
          <Button type="submit">Guardar</Button>
        </div>
      </form>
    </Card>
  );
};
