import { useState } from "react";
import styled from "styled-components";
import { InputText, Button, Table } from "../../../components/ui";

interface Examen {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
}

const examenesIniciales: Examen[] = [
  { id: 1, nombre: "Examen de Sangre", descripcion: "Análisis completo de sangre", precio: 50 },
  { id: 2, nombre: "Radiografía", descripcion: "Radiografía de tórax", precio: 75 },
  { id: 3, nombre: "Electrocardiograma", descripcion: "Estudio de la actividad eléctrica del corazón", precio: 100 },
];

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Roboto", sans-serif;
`;

const Header = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const FilterContainer = styled.div`
  margin-bottom: 20px;
`;

const ActionsContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const NewButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
`;

export const ListaExamenes = () => {
  const [examenes, setExamenes] = useState<Examen[]>(examenesIniciales);
  const [busqueda, setBusqueda] = useState("");

  const examenesFiltrados = examenes.filter((examen) =>
    examen.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    examen.descripcion.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleEditar = (id: number) => {
    console.log(`Editando examen con id: ${id}`);
    // Aquí iría la lógica para editar el examen
  };

  const handleEliminar = (id: number) => {
    setExamenes(examenes.filter((examen) => examen.id !== id));
  };

  const handleNuevoExamen = () => {
    console.log("Agregando nuevo examen");
    // Aquí iría la lógica para agregar un nuevo examen
  };

  return (
    <Container>
      <Header>Lista de Exámenes Disponibles</Header>
      <FilterContainer>
        <InputText
          placeholder="Buscar exámenes..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </FilterContainer>
      <Table
        columnas={[
          { header: "Nombre del Examen", accessorKey: "nombre" },
          { header: "Descripción", accessorKey: "descripcion" },
          { header: "Precio", accessorKey: "precio" },
          { header: "Acciones", accessorKey: "acciones" },
        ]}
        datos={examenesFiltrados.map((examen) => ({
          nombre: examen.nombre,
          descripcion: examen.descripcion,
          precio: `$${examen.precio.toFixed(2)}`,
          acciones: (
            <ActionsContainer>
              <Button
                onClick={() => handleEditar(examen.id)}
              >
                Editar
              </Button>
              <Button
                onClick={() => handleEliminar(examen.id)}
              >
                Eliminar
              </Button>
            </ActionsContainer>
          ),
        }))}
      />
      <NewButtonContainer>
        <Button onClick={handleNuevoExamen}>
          + Nuevo Examen
        </Button>
      </NewButtonContainer>
    </Container>
  );
}
