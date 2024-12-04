/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { ActionGroup, Container, FormGroup, Title } from "./styled";
import { Button, InputText, Label } from "../../../components/ui";
import { insertarMedicamento } from "../../../lib/api";

export const RegistroMedicamento = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [proveedor, setProveedor] = useState("");
  const [nuevoProveedor, setNuevoProveedor] = useState("");
  const [modalAbierto, setModalAbierto] = useState(false);
  const [proveedores, setProveedores] = useState<any[]>([]);



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await insertarMedicamento({
        nombreMedicamento: nombre,
        descripcion,
        precio: parseFloat(precio),
        stock: parseInt(stock, 10),
        proveedorID: parseInt(proveedor, 10),
      });
      alert("El medicamento ha sido guardado exitosamente.");
      setNombre("");
      setDescripcion("");
      setPrecio("");
      setStock("");
      setProveedor("");
    } catch (err) {
      console.error("Error al guardar el medicamento:", err);
      alert("Hubo un error al guardar el medicamento.");
    }
  };

  const handleCancel = () => {
    alert("Los cambios no han sido guardados.");
    setNombre("");
    setDescripcion("");
    setPrecio("");
    setStock("");
    setProveedor("");
  };

  const handleAgregarProveedor = () => {
    if (nuevoProveedor) {
      setProveedores([...proveedores, { id: proveedores.length + 1, nombre: nuevoProveedor }]);
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
        {modalAbierto && (
          <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px", borderRadius: "8px" }}>
            <h3>Agregar Nuevo Proveedor</h3>
            <InputText
              placeholder="Ingrese el nombre del proveedor"
              value={nuevoProveedor}
              onChange={(e) => setNuevoProveedor(e.target.value)}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
              <Button onClick={handleAgregarProveedor}>Agregar</Button>
              <Button onClick={() => setModalAbierto(false)}>Cancelar</Button>
            </div>
          </div>
        )}
        <ActionGroup>
          <Button type="button" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button type="submit">Guardar</Button>
        </ActionGroup>
      </form>
    </Container>
  );
};
