import { cliente } from "./cliente";

export const getPacientes = async () => {
  try {
    const response = await cliente.get("/pacientes");
    return response.data;
  } catch (error: any) {
    throw new Error(`Error al obtener pacientes: ${error.message}`);
  }
};

export const insertarPaciente = async (paciente: {
  nombre: string;
  apellido: string;
  fechaNacimiento: string;
  genero: string;
  telefono: string;
  email: string;
  direccionID: number;
  numeroSeguroSocial: string;
}) => {
  try {
    const response = await cliente.post("/paciente", paciente);
    return response.data;
  } catch (error: any) {
    throw new Error(`Error al insertar paciente: ${error.message}`);
  }
};

export const getPacientePorID = async (id: number) => {
  try {
    const response = await cliente.get(`/pacientes/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(`Error al obtener el paciente con ID ${id}: ${error.message}`);
  }
};

export const getResumenPacientesHospitalizaciones = async () => {
  try {
    const response = await cliente.get("/pacientes/resumen-hospitalizaciones");
    return response.data;
  } catch (error: any) {
    throw new Error(`Error al obtener resumen de pacientes: ${error.message}`);
  }
};

export const calcularEdadPaciente = async (fechaNacimiento: string) => {
  try {
    const response = await cliente.get("/pacientes/calcular-edad", {
      params: { fechaNacimiento },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(`Error al calcular edad del paciente: ${error.message}`);
  }
};
