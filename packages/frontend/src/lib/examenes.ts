import { cliente } from "./cliente";

export const getExamenes = async () => {
  try {
    const response = await cliente.get("/examenes");
    return response.data;
  } catch (error: any) {
    throw new Error(`Error al obtener exámenes: ${error.message}`);
  }
};

export const insertarExamen = async (examen: {
  nombreExamen: string;
  descripcion: string;
  precio: number;
}) => {
  try {
    const response = await cliente.post("/examen", examen);
    return response.data;
  } catch (error: any) {
    throw new Error(`Error al insertar examen: ${error.message}`);
  }
};
