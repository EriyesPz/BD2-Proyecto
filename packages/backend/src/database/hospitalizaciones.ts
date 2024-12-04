// hospitalizaciones.ts
import { dbConexion } from "./conexion";
import sql from "mssql";

export const obtenerHospitalizaciones = async () => {
  try {
    const pool = await dbConexion();
    const consulta = `
      SELECT * FROM Hospitalizacion.Hospitalizaciones;
    `;
    const resultado = await pool.request().query(consulta);
    return resultado.recordset;
  } catch (error) {
    throw new Error(`Error al obtener hospitalizaciones: ${error}`);
  }
};

export const registrarHospitalizacion = async (
  pacienteID: number,
  habitacionID: number,
  fechaIngreso: Date,
  diagnostico: string
) => {
  try {
    const pool = await dbConexion();
    await pool
      .request()
      .input("PacienteID", sql.Int, pacienteID)
      .input("HabitacionID", sql.Int, habitacionID)
      .input("FechaIngreso", sql.DateTime2, fechaIngreso)
      .input("Diagnostico", sql.NVarChar(sql.MAX), diagnostico)
      .execute("Hospitalizacion.sp_RegistrarHospitalizacion");
    return { mensaje: "Hospitalización registrada correctamente" };
  } catch (error) {
    throw new Error(`Error al registrar hospitalización: ${error}`);
  }
};

export const darAltaHospitalizacion = async (
  hospitalizacionID: number,
  fechaAlta: Date
) => {
  try {
    const pool = await dbConexion();
    await pool
      .request()
      .input("HospitalizacionID", sql.Int, hospitalizacionID)
      .input("FechaAlta", sql.DateTime2, fechaAlta)
      .execute("Hospitalizacion.sp_DarAltaHospitalizacion");
    return { mensaje: "Hospitalización dada de alta correctamente" };
  } catch (error) {
    throw new Error(`Error al dar de alta hospitalización: ${error}`);
  }
};

export const obtenerCostoEstancia = async (hospitalizacionID: number) => {
  try {
    const pool = await dbConexion();
    const consulta = `
      SELECT Hospitalizacion.fn_CostoEstancia(@HospitalizacionID) AS CostoEstancia;
    `;
    const resultado = await pool
      .request()
      .input("HospitalizacionID", sql.Int, hospitalizacionID)
      .query(consulta);
    return resultado.recordset[0].CostoEstancia;
  } catch (error) {
    throw new Error(`Error al obtener costo de estancia: ${error}`);
  }
};

