import { cliente } from "./cliente";

// Obtener todas las direcciones
export const getDirecciones = async () => {
  try {
    const response = await cliente.get("/direcciones");
    return response.data;
  } catch (error: any) {
    throw new Error(`Error al obtener direcciones: ${error.message}`);
  }
};

// Insertar una nueva dirección
export const insertarDireccion = async (direccion: {
  calle: string;
  ciudad: string;
  estado: string;
  codigoPostal: string;
  pais: string;
}) => {
  try {
    const response = await cliente.post("/direccion", direccion);
    return response.data;
  } catch (error: any) {
    throw new Error(`Error al insertar dirección: ${error.message}`);
  }
};
