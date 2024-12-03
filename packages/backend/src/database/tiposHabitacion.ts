import { dbConexion } from "./conexion";
import sql from "mssql";

export const obtenerTiposHabitacion = async () => {
  try {
    const pool = await dbConexion();
    const consulta = `
      SELECT * FROM Hospitalizacion.TiposHabitacion;
    `;
    const resultado = await pool.request().query(consulta);
    return resultado.recordset;
  } catch (error) {
    throw new Error(`Error al obtener tipos de habitación: ${error}`);
  }
};

export const insertarTipoHabitacion = async (
  tipo: string,
  precioPorDia: number
) => {
  try {
    const pool = await dbConexion();
    const consulta = `
      INSERT INTO Hospitalizacion.TiposHabitacion (Tipo, PrecioPorDia)
      VALUES (@Tipo, @PrecioPorDia);
    `;
    await pool
      .request()
      .input("Tipo", sql.VarChar(50), tipo)
      .input("PrecioPorDia", sql.Decimal(10, 2), precioPorDia)
      .query(consulta);
    return { mensaje: "Tipo de habitación insertado correctamente" };
  } catch (error) {
    throw new Error(`Error al insertar tipo de habitación: ${error}`);
  }
};
