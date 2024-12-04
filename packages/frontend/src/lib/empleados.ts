import { cliente } from "./cliente";

export const getEmpleados = async () => {
  try {
    const response = await cliente.get("/empleados");
    return response.data;
  } catch (error: any) {
    throw new Error(`Error al obtener empleados: ${error.message}`);
  }
};

export const insertarEmpleado = async (empleado: {
  nombre: string;
  apellido: string;
  puestoID: number;
  fechaContratacion: string;
  direccionID: number;
  telefono: string;
  email: string;
  salario: number;
}) => {
  try {
    const response = await cliente.post("/empleado", empleado);
    return response.data;
  } catch (error: any) {
    throw new Error(`Error al insertar empleado: ${error.message}`);
  }
};
