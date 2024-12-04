import { cliente } from "./cliente";

export const getEspecialidades = async () => {
  try {
    const response = await cliente.get("/especialidades");
    return response.data;
  } catch (error: any) {
    throw new Error(`Error al obtener especialidades: ${error.message}`);
  }
};

export const insertarEspecialidad = async (especialidad: {
  nombreEspecialidad: string;
  descripcion: string;
}) => {
  try {
    const response = await cliente.post("/especialidad", especialidad);
    return response.data;
  } catch (error: any) {
    throw new Error(`Error al insertar especialidad: ${error.message}`);
  }
};
