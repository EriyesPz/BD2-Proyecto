import { cliente } from "./cliente";

export const getFacturas = async () => {
  try {
    const response = await cliente.get("/facturas");
    return response.data;
  } catch (error: any) {
    throw new Error(`Error al obtener facturas: ${error.message}`);
  }
};

export const insertarFactura = async (factura: {
  pacienteID: number;
  fechaFactura: string;
  totalFactura: number;
  estadoPago: string;
  detalles: any[];
}) => {
  try {
    const response = await cliente.post("/factura", factura);
    return response.data;
  } catch (error: any) {
    throw new Error(`Error al insertar factura: ${error.message}`);
  }
};

export const insertarPago = async (pago: {
  facturaID: number;
  fechaPago: string;
  montoPagado: number;
  metodoPago: string;
}) => {
  try {
    const response = await cliente.post("/pagos", pago);
    return response.data;
  } catch (error: any) {
    throw new Error(`Error al insertar pago: ${error.message}`);
  }
};

export const generarFacturaHospitalizacion = async (hospitalizacionID: number) => {
  try {
    const response = await cliente.post("/facturas/generar-hospitalizacion", {
      hospitalizacionID,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      `Error al generar factura de hospitalización: ${error.message}`
    );
  }
};

export const obtenerTotalPagado = async (facturaID: number) => {
  try {
    const response = await cliente.get(`/facturas/${facturaID}/total-pagado`);
    return response.data;
  } catch (error: any) {
    throw new Error(`Error al obtener total pagado: ${error.message}`);
  }
};
