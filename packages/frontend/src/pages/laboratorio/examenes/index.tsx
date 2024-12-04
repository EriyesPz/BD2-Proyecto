import { useState, useEffect } from "react";
import {
  ActionsContainer,
  Container,
  FilterContainer,
  Header,
  NewButtonContainer,
  ModalContainer,
} from "./styled";
import { InputText, Button, Table } from "../../../components/ui";
import { getExamenes, insertarExamen } from "../../../lib/api";

interface Examen {
  ExamenID: number;
  NombreExamen: string;
  Descripcion: string;
  Precio: number;
}

export const ListaExamenes = () => {
  const [examenes, setExamenes] = useState<Examen[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [nuevoExamen, setNuevoExamen] = useState({
    NombreExamen: "",
    Descripcion: "",
    Precio: "",
  });

  useEffect(() => {
    const fetchExamenes = async () => {
      try {
        const data = await getExamenes();
        setExamenes(data);
        setError(null);
      } catch (err) {
        console.error("Error al obtener exámenes:", err);
        setError("Hubo un error al cargar los exámenes.");
      } finally {
        setLoading(false);
      }
    };
    fetchExamenes();
  }, []);

  const examenesFiltrados = examenes.filter(
    (examen) =>
      examen.NombreExamen.toLowerCase().includes(busqueda.toLowerCase()) ||
      examen.Descripcion.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleGuardarExamen = async () => {
    if (!nuevoExamen.NombreExamen || !nuevoExamen.Descripcion || !nuevoExamen.Precio) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      const examenGuardado = await insertarExamen({
        nombreExamen: nuevoExamen.NombreExamen,
        descripcion: nuevoExamen.Descripcion,
        precio: parseFloat(nuevoExamen.Precio),
      });

      setExamenes([...examenes, examenGuardado]);
      setShowModal(false);
      setNuevoExamen({ NombreExamen: "", Descripcion: "", Precio: "" });
      alert("Examen registrado correctamente.");
    } catch (error) {
      console.error("Error al registrar el examen:", error);
      alert("Hubo un error al registrar el examen.");
    }
  };

  const handleEditar = (id: number) => {
    console.log(`Editando examen con id: ${id}`);
    alert(`Función para editar el examen con ID: ${id} aún no implementada.`);
  };

  const handleEliminar = (id: number) => {
    if (confirm(`¿Está seguro de que desea eliminar el examen con ID: ${id}?`)) {
      setExamenes(examenes.filter((examen) => examen.ExamenID !== id));
      alert(`Examen con ID: ${id} eliminado.`);
    }
  };

  const handleNuevoExamen = () => {
    setShowModal(true);
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

      {loading ? (
        <p>Cargando exámenes...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <Table
          columnas={[
            { header: "Nombre del Examen", accessorKey: "NombreExamen" },
            { header: "Descripción", accessorKey: "Descripcion" },
            { header: "Precio", accessorKey: "Precio" },
            { header: "Acciones", accessorKey: "acciones" },
          ]}
          datos={examenesFiltrados.map((examen) => ({
            NombreExamen: examen.NombreExamen,
            Descripcion: examen.Descripcion,
            Precio: `$${examen.Precio.toFixed(2)}`,
            acciones: (
              <ActionsContainer>
                <Button onClick={() => handleEditar(examen.ExamenID)}>
                  Editar
                </Button>
                <Button onClick={() => handleEliminar(examen.ExamenID)}>
                  Eliminar
                </Button>
              </ActionsContainer>
            ),
          }))}
        />
      )}

      <NewButtonContainer>
        <Button onClick={handleNuevoExamen}>+ Nuevo Examen</Button>
      </NewButtonContainer>

      {showModal && (
        <ModalContainer>
          <h3>Registrar Nuevo Examen</h3>
          <InputText
            placeholder="Nombre del Examen"
            value={nuevoExamen.NombreExamen}
            onChange={(e) =>
              setNuevoExamen({ ...nuevoExamen, NombreExamen: e.target.value })
            }
          />
          <InputText
            placeholder="Descripción"
            value={nuevoExamen.Descripcion}
            onChange={(e) =>
              setNuevoExamen({ ...nuevoExamen, Descripcion: e.target.value })
            }
          />
          <InputText
            type="number"
            placeholder="Precio"
            value={nuevoExamen.Precio}
            onChange={(e) =>
              setNuevoExamen({ ...nuevoExamen, Precio: e.target.value })
            }
          />
          <ActionsContainer>
            <Button onClick={handleGuardarExamen}>Guardar</Button>
            <Button onClick={() => setShowModal(false)}>Cancelar</Button>
          </ActionsContainer>
        </ModalContainer>
      )}
    </Container>
  );
};
