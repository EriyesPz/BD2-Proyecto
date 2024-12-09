import { dbConexion } from "./conexion";
import sql from "mssql";

export const getHospitalizaciones = async () => {
  try {
    const pool = await dbConexion();
    const query = `SELECT HospitalizacionID, PacienteID, HabitacionID, FechaIngreso, FechaAlta, Diagnostico, Estado FROM Hospitalizacion.Hospitalizaciones`;
    const resultado = await pool.request().query(query);
    return resultado.recordset;
  } catch (error) {
    throw error;
  }
};

export const getHospitalizacion = async (hospitalizacionID: string) => {
  try {
    const pool = await dbConexion();
    const query = `SELECT HospitalizacionID, PacienteID, HabitacionID, FechaIngreso, FechaAlta, Diagnostico, Estado FROM Hospitalizacion.Hospitalizaciones
      WHERE HospitalizacionID = @Hospitalizacion`;
    const resultado = await pool
      .request()
      .input("Hospitalizacion", sql.VarChar, hospitalizacionID)
      .query(query);
    return resultado.recordset;
  } catch (error) {
    throw error;
  }
};

export const crearHospitalizacion = async (hospitalizacionData: any) => {
  const pool = await dbConexion();
  try {
    await pool
      .request()
      .input("PacienteID", sql.VarChar(20), hospitalizacionData.PacienteID)
      .input("HabitacionID", sql.VarChar(20), hospitalizacionData.HabitacionID)
      .input("FechaIngreso", sql.DateTime2, hospitalizacionData.FechaIngreso)
      .input(
        "Diagnostico",
        sql.VarChar(sql.MAX),
        hospitalizacionData.Diagnostico
      )
      .execute("Hospitalizacion.usp_InsertHospitalizacion");
  } catch (error) {
    throw error;
  }
};

export const obtenerHabitaciones = async () => {
  const pool = await dbConexion();
  try {
    const result = await pool.request().query(`
          SELECT HabitacionID, NumeroHabitacion, TipoHabitacionID, Disponible, Caracteristicas
          FROM Hospitalizacion.Habitaciones
          WHERE Disponible = 1
        `);
    return result.recordset;
  } catch (error) {
    throw error;
  }
};

export const getTodasHabitaciones = async () => {
  const pool = await dbConexion();
  try {
    const result = await pool.request().query(`SELECT * FROM Hospitalizacion.ViewHabitacionesDetalle`);
    return result.recordset;
  } catch (error) {
    throw error;
  }
}

export const getHospitalizacionesDetalles = async () => {
  try {
    const pool = await dbConexion();
    const resultado = await pool
      .request()
      .execute("usp_ObtenerHospitalizacionesDetalladas");
    return resultado.recordset;
  } catch (error) {
    throw error;
  }
};

