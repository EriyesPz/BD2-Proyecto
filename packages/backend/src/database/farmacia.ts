import { dbConexion } from "./conexion";
import sql from "mssql";

export const getMedicamentos = async () => {
  try {
    const pool = await dbConexion();
    const query = `SELECT * FROM Farmacia.Medicamentos`;
    const resultado = await pool.request().query(query)
    return resultado.recordset;
  } catch (error) {
    throw error;
  }
};

