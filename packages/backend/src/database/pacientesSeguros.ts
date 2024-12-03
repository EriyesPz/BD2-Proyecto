import { dbConexion } from "./conexion";
import sql from "mssql";

export const obtenerPacientesSeguros = async () => {
  try {
    const pool = await dbConexion();
    const consulta = `
      SELECT * FROM Paciente.PacientesSeguros;
    `;
    const resultado = await pool.request().query(consulta);
    return resultado.recordset;
  } catch (error) {
    throw new Error(`Error al obtener pacientes seguros: ${error}`);
  }
};

export const insertarPacienteSeguro = async (
  pacienteID: number,
  seguroID: number,
  numeroPoliza: string,
  fechaVencimiento: Date
) => {
  try {
    const pool = await dbConexion();
    const consulta = `
      INSERT INTO Paciente.PacientesSeguros
      (PacienteID, SeguroID, NumeroPoliza, FechaVencimiento)
      VALUES (@PacienteID, @SeguroID, @NumeroPoliza, @FechaVencimiento);
    `;
    await pool
      .request()
      .input("PacienteID", sql.Int, pacienteID)
      .input("SeguroID", sql.Int, seguroID)
      .input("NumeroPoliza", sql.NVarChar(50), numeroPoliza)
      .input("FechaVencimiento", sql.Date, fechaVencimiento)
      .query(consulta);
    return { mensaje: "Paciente-Seguro insertado correctamente" };
  } catch (error) {
    throw new Error(`Error al insertar paciente-seguro: ${error}`);
  }
};
