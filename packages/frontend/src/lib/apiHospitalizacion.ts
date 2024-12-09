import { cliente } from "./cliente";

interface HospitalizacionData {
  pacienteID: string;
  habitacionID: string;
  fechaIngreso: string;
  diagnostico: string;
}

interface AltaData {
  hospitalizacionID: string;
  fechaAlta: string;
  gastos: number;
}

export const obtenerHospitalizaciones = async () => {
  const response = await cliente.get("hospitalizaciones");
  return response.data;
};

export const obtenerHospitalizacion = async (hospitalizacionID: string) => {
  const response = await cliente.get(`hospitalizacion/${hospitalizacionID}`);
  return response.data;
};

export const crearHospitalizacion = async (data: HospitalizacionData) => {
  const response = await cliente.post("hospitalizacion", {
    pacienteID: data.pacienteID,
    habitacionID: data.habitacionID,
    fechaIngreso: data.fechaIngreso,
    diagnostico: data.diagnostico,
  });
  return response.data;
};

export const crearHospitalizacionConFactura = async (facturaData: any) => {
  const response = await cliente.post("hospitalizaciones/factura", facturaData);
  return response.data;
};

export const darAltaHospitalizacion = async (altaData: AltaData) => {
  const response = await cliente.post("hospitalizaciones/dar-alta", altaData);
  return response.data;
};

export const getHospitalizacionesDetalles = async () => {
  const response = await cliente.get("hospitalizaciones-detalles");
  return response.data;
}

