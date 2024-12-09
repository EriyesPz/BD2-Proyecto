import { cliente } from "./cliente";

export const obtenerFacturas = async () => {
  const response = await cliente.get("facturas");
  return response.data;
};
export const getFactura = async (facturaID: string) => {
  const response = await cliente.get(`factura/${facturaID}`);
  return response.data;
};