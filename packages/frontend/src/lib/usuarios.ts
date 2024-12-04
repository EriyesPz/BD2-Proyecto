import { cliente } from "./cliente";

export const getUsuarios = async () => {
  try {
    const response = await cliente.get("/usuarios");
    return response.data;
  } catch (error: any) {
    throw new Error(`Error al obtener usuarios: ${error.message}`);
  }
};

export const insertarUsuario = async (usuario: {
  nombre: string;
  email: string;
  usuario: string;
  rol: string;
  contrasenia: string;
}) => {
  try {
    const response = await cliente.post("/usuarioe", usuario);
    return response.data;
  } catch (error: any) {
    throw new Error(`Error al insertar usuario: ${error.message}`);
  }
};
