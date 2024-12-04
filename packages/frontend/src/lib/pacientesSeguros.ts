import { cliente } from "./cliente";

export const getPacientesSeguros = async () => {
  try {
    const response = await cliente.get("/pacientes-seguros");
    return response.data;
  } catch (error: any) {
    throw new Error(`Error al obtener pacientes-seguros: ${error.message}`);
  }
};

export const insertarPacienteSeguro = async (pacienteSeguro: {
  pacienteID: number;
  seguroID: number;
  numeroPoliza: string;
  fechaVencimiento: string;
}) => {
  try {
    const response = await cliente.post("/paciente-seguro", pacienteSeguro);
    return response.data;
  } catch (error: any) {
    throw new Error(`Error al insertar paciente-seguro: ${error.message}`);
  }
};
