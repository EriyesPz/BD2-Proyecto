import { cliente } from "./cliente";

interface PagoData {
  facturaID: string;
  montoPagado: number;
  metodoPago: string;
}

export const pagarFactura = async (pagoData: PagoData) => {
  const response = await cliente.post("facturas/pagar", pagoData);
  return response.data;
};
