/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { ActionsContainer, Container, Filters, Header } from "./styled";
import { Button, InputText, Select, Table, Label } from "../../../components/ui";
import { getMedicamentos } from "../../../lib/api";

export const Medicamentos = () => {
  const [busqueda, setBusqueda] = useState("");
  const [filtroStock, setFiltroStock] = useState("todos");
  const [filtroProveedor, setFiltroProveedor] = useState("todos");
  const [medicamentos, setMedicamentos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMedicamentos = async () => {
      try {
        const data = await getMedicamentos();
        setMedicamentos(data);
        setError(null);
      } catch (err) {
        console.error("Error al cargar medicamentos:", err);
        setError("Hubo un error al cargar los medicamentos.");
      } finally {
        setLoading(false);
      }
    };

    fetchMedicamentos();
  }, []);

  // Generar lista de proveedores (ignorar ProveedorID nulo)
  const proveedores = Array.from(
    new Set(
      medicamentos
        .filter((med) => med.ProveedorID !== null)
        .map((med) => med.ProveedorID)
    )
  ).map((proveedorID) => ({
    value: proveedorID.toString(),
    label: `Proveedor #${proveedorID}`,
  }));

  // Filtrar medicamentos
  const medicamentosFiltrados = medicamentos.filter((med) => {
    const cumpleBusqueda = med.NombreMedicamento.toLowerCase().includes(
      busqueda.toLowerCase()
    );
    const cumpleStock =
      filtroStock === "todos" ||
      (filtroStock === "bajo" && med.Stock < 50) ||
      (filtroStock === "sin" && med.Stock === 0);
    const cumpleProveedor =
      filtroProveedor === "todos" ||
      (med.ProveedorID !== null &&
        med.ProveedorID.toString() === filtroProveedor);

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
            options={[{ value: "todos", label: "Todos" }, ...proveedores]}
            onChange={(value) => setFiltroProveedor(value)}
            placeholder="Seleccione un proveedor"
          />
        </div>
      </Filters>
      {loading ? (
        <p>Cargando medicamentos...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
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
            nombre: med.NombreMedicamento,
            descripcion: med.Descripcion,
            precio: `$${med.Precio.toFixed(2)}`,
            stock: med.Stock,
            proveedor: med.ProveedorID
              ? `Proveedor #${med.ProveedorID}`
              : "Sin Proveedor",
            acciones: (
              <div style={{ display: "flex", gap: "8px" }}>
                <Button>Ver</Button>
                <Button>Editar</Button>
                <Button>Eliminar</Button>
              </div>
            ),
          }))}
        />
      )}
      <ActionsContainer>
        <Button>+ Nuevo Medicamento</Button>
      </ActionsContainer>
    </Container>
  );
};
