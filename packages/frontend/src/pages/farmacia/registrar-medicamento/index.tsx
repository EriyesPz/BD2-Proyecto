import React, { useState } from "react";
import styled from "styled-components";
import { Button, InputText, Select, Label } from "../../../components/ui";

const proveedores = [
  { id: "1", nombre: "Proveedor A" },
  { id: "2", nombre: "Proveedor B" },
  { id: "3", nombre: "Proveedor C" },
];

const Container = styled.div`
  max-width: 600px;
  margin: 20px auto;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  font-family: "Roboto", sans-serif;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const ActionGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
`;

export const RegistroMedicamento = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [proveedor, setProveedor] = useState("");
  const [nuevoProveedor, setNuevoProveedor] = useState("");
  const [modalAbierto, setModalAbierto] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Medicamento guardado:", { nombre, descripcion, precio, stock, proveedor });
    alert("El medicamento ha sido guardado exitosamente.");
  };

  const handleCancel = () => {
    console.log("Operación cancelada");
    alert("Los cambios no han sido guardados.");
  };

  const handleAgregarProveedor = () => {
    if (nuevoProveedor) {
      console.log("Nuevo proveedor agregado:", nuevoProveedor);
      setModalAbierto(false);
      setNuevoProveedor("");
      alert(`El proveedor "${nuevoProveedor}" ha sido agregado exitosamente.`);
    }
  };

  return (
    <Container>
      <Title>Registro/Edición de Medicamento</Title>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Nombre del Medicamento</Label>
          <InputText
            placeholder="Ingrese el nombre del medicamento"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Descripción</Label>
          <InputText
            placeholder="Ingrese la descripción del medicamento"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Precio</Label>
          <InputText
            type="number"
            placeholder="Ingrese el precio del medicamento"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Stock Inicial</Label>
          <InputText
            type="number"
            placeholder="Ingrese la cantidad inicial de stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </FormGroup>

        {/* Proveedor */}
        <FormGroup>
          <Label>Proveedor</Label>
          <div style={{ display: "flex", gap: "8px" }}>
            <Select
              options={proveedores.map((p) => ({ value: p.id, label: p.nombre }))}
              placeholder="Seleccione un proveedor"
              onChange={(value) => setProveedor(value)}
            />
            <Button type="button" onClick={() => setModalAbierto(true)}>
              Agregar Proveedor
            </Button>
          </div>
        </FormGroup>

        {/* Modal para agregar proveedor */}
        {modalAbierto && (
          <div style={{ marginTop: "20px" }}>
            <h3>Agregar Nuevo Proveedor</h3>
            <InputText
              placeholder="Ingrese el nombre del proveedor"
              value={nuevoProveedor}
              onChange={(e) => setNuevoProveedor(e.target.value)}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
              <Button onClick={handleAgregarProveedor}>Agregar</Button>
              <Button onClick={() => setModalAbierto(false)}>
                Cancelar
              </Button>
            </div>
          </div>
        )}

        {/* Acciones */}
        <ActionGroup>
          <Button type="button" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button type="submit">Guardar</Button>
        </ActionGroup>
      </form>
    </Container>
  );
}
