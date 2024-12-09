import { cliente } from "./cliente";

export const getMedicamentos = async () => {
  const response = await cliente.get("medicamentos");
  return response.data;
};
