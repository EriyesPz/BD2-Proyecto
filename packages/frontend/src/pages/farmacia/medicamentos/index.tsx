import { useState } from "react";
import styled from "styled-components";
import { Button, InputText, Select, Table, Label } from "../../../components/ui";

const medicamentos = [
  { id: 1, nombre: "Paracetamol", descripcion: "Analgésico y antipirético", precio: 5.99, stock: 100, proveedor: "Farmacéutica XYZ" },
  { id: 2, nombre: "Ibuprofeno", descripcion: "Antiinflamatorio no esteroideo", precio: 7.5, stock: 75, proveedor: "Laboratorios ABC" },
  { id: 3, nombre: "Amoxicilina", descripcion: "Antibiótico de amplio espectro", precio: 12.99, stock: 50, proveedor: "Farmacéutica XYZ" },
  { id: 4, nombre: "Omeprazol", descripcion: "Inhibidor de la bomba de protones", precio: 9.99, stock: 0, proveedor: "Laboratorios ABC" },
];

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: "Roboto", sans-serif;
`;

const Header = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Filters = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

export const Medicamentos = () => {
  const [busqueda, setBusqueda] = useState("");
  const [filtroStock, setFiltroStock] = useState("todos");
  const [filtroProveedor, setFiltroProveedor] = useState("todos");

  const medicamentosFiltrados = medicamentos.filter((med) => {
    const cumpleBusqueda = med.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const cumpleStock =
      filtroStock === "todos" ||
      (filtroStock === "bajo" && med.stock < 50) ||
      (filtroStock === "sin" && med.stock === 0);
    const cumpleProveedor = filtroProveedor === "todos" || med.proveedor === filtroProveedor;

    return cumpleBusqueda && cumpleStock && cumpleProveedor;
  });

  return (
    <Container>
      <Header>Inventario de Medicamentos</Header>
      <Filters>
        <div>
          <Label>Búsqueda</Label>
          <InputText
            placeholder="Buscar medicamento..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <div>
          <Label>Filtrar por Stock</Label>
          <Select
            options={[
              { value: "todos", label: "Todos" },
              { value: "bajo", label: "Stock Bajo" },
              { value: "sin", label: "Sin Stock" },
            ]}
            onChange={(value) => setFiltroStock(value)}
            placeholder="Seleccione una opción"
          />
        </div>
        <div>
          <Label>Filtrar por Proveedor</Label>
          <Select
            options={[
              { value: "todos", label: "Todos" },
              { value: "Farmacéutica XYZ", label: "Farmacéutica XYZ" },
              { value: "Laboratorios ABC", label: "Laboratorios ABC" },
            ]}
            onChange={(value) => setFiltroProveedor(value)}
            placeholder="Seleccione un proveedor"
          />
        </div>
      </Filters>
      <Table
        columnas={[
          { header: "Nombre del Medicamento", accessorKey: "nombre" },
          { header: "Descripción", accessorKey: "descripcion" },
          { header: "Precio", accessorKey: "precio" },
          { header: "Stock Disponible", accessorKey: "stock" },
          { header: "Proveedor", accessorKey: "proveedor" },
          { header: "Acciones", accessorKey: "acciones" },
        ]}
        datos={medicamentosFiltrados.map((med) => ({
          nombre: med.nombre,
          descripcion: med.descripcion,
          precio: `$${med.precio.toFixed(2)}`,
          stock: med.stock,
          proveedor: med.proveedor,
          acciones: (
            <div style={{ display: "flex", gap: "8px" }}>
              <Button>
                Ver
              </Button>
              <Button>
                Editar
              </Button>
              <Button>
                Eliminar
              </Button>
            </div>
          ),
        }))}
      />
      <ActionsContainer>
        <Button>
          + Nuevo Medicamento
        </Button>
      </ActionsContainer>
    </Container>
  );
}
