import { dbConexion } from "./conexion";
import sql from "mssql";

export const obtenerHabitaciones = async () => {
  try {
    const pool = await dbConexion();
    const consulta = `
      SELECT * FROM Hospitalizacion.Habitaciones;
    `;
    const resultado = await pool.request().query(consulta);
    return resultado.recordset;
  } catch (error) {
    throw new Error(`Error al obtener habitaciones: ${error}`);
  }
};

export const insertarHabitacion = async (
  numeroHabitacion: string,
  tipoHabitacionID: number,
  disponible: boolean,
  caracteristicas: string
) => {
  try {
    const pool = await dbConexion();
    const consulta = `
      INSERT INTO Hospitalizacion.Habitaciones
      (NumeroHabitacion, TipoHabitacionID, Disponible, Caracteristicas)
      VALUES (@NumeroHabitacion, @TipoHabitacionID, @Disponible, @Caracteristicas);
    `;
    await pool
      .request()
      .input("NumeroHabitacion", sql.VarChar(10), numeroHabitacion)
      .input("TipoHabitacionID", sql.Int, tipoHabitacionID)
      .input("Disponible", sql.Bit, disponible)
      .input("Caracteristicas", sql.Xml, caracteristicas)
      .query(consulta);
    return { mensaje: "Habitación insertada correctamente" };
  } catch (error) {
    throw new Error(`Error al insertar habitación: ${error}`);
  }
};
