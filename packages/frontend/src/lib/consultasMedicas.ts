import { cliente } from "./cliente";

export const getConsultasMedicas = async () => {
  try {
    const response = await cliente.get("/consultas-medicas");
    return response.data;
  } catch (error: any) {
    throw new Error(`Error al obtener consultas médicas: ${error.message}`);
  }
};

export const insertarConsultaMedica = async (consulta: {
  pacienteID: number;
  medicoID: number;
  fechaConsulta: string;
  motivoConsulta: string;
  diagnostico: string;
  prescripcion: string;
}) => {
  try {
    const response = await cliente.post("/consulta-medica", consulta);
    return response.data;
  } catch (error: any) {
    throw new Error(`Error al insertar consulta médica: ${error.message}`);
  }
};
