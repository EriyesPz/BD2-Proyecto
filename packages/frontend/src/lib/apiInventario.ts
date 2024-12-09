import { cliente } from "./cliente";

interface MedicamentoAplicadoData {
  HospitalizacionID: string;
  MedicamentoID: string;
  Cantidad: number;
  FechaAplicacion: string;
}

interface AlimentoSuministradoData {
  HospitalizacionID: string;
  AlimentoID: string;
  Cantidad: number;
  FechaServicio: string;
}

export const registrarMedicamentoAplicado = async (
  data: MedicamentoAplicadoData
) => {
  const response = await cliente.post("medicamento-aplicado", data);
  return response.data;
};

export const registrarAlimentoSuministrado = async (
  data: AlimentoSuministradoData
) => {
  const response = await cliente.post("registrar-alimento", data);
  return response.data;
};

export const obtenerHabitacionesDisponibles = async () => {
  const response = await cliente.get("habitaciones");
  return response.data;
};

export const obtenerHabitaciones = async () => {
  const response = await cliente.get("habitaciones-all");
  return response.data
}

export const obtenerHonorariosMedicos = async () => {
  const response = await cliente.get("honorarios");
  return response.data;
};
