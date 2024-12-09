import { dbConexion } from "./conexion";
import sql from "mssql";

export const crearMedico = async (medicoData: any) => {
  const pool = await dbConexion();
  try {
    await pool
      .request()
      .input("Nombre", sql.VarChar(50), medicoData.Nombre)
      .input("Apellido", sql.VarChar(50), medicoData.Apellido)
      .input("EspecialidadID", sql.Int, medicoData.EspecialidadID)
      .input("Interno", sql.Bit, medicoData.Interno)
      .input(
        "HonorariosConsulta",
        sql.Decimal(10, 2),
        medicoData.HonorariosConsulta
      )
      .input(
        "HonorariosCirugia",
        sql.Decimal(10, 2),
        medicoData.HonorariosCirugia
      )
      .input("Email", sql.VarChar(100), medicoData.Email)
      .execute("Medico.usp_InsertMedico");
  } catch (error) {
    throw error;
  }
};

export const getMedicos = async () => {
  try {
    const pool = await dbConexion();
    const query = `SELECT 
        MedicoID,
        Nombre,
        Apellido,
        EspecialidadID,
        Interno,
        HonorariosConsulta,
        HonorariosCirugia,
        Email,
        FechaRegistro
        FROM Medico.Medicos`;
    const resultado = await pool.request().query(query);
    return resultado.recordset;
  } catch (error) {
    throw error;
  }
};

export const getMedico = async (medicoID: string) => {
  try {
    const pool = await dbConexion();
    const query = `SELECT 
        MedicoID,
        Nombre,
        Apellido,
        EspecialidadID,
        Interno,
        HonorariosConsulta,
        HonorariosCirugia,
        Email,
        FechaRegistro
        FROM Medico.Medicos
        WHERE MedicoID = @MedicoID`;
    const resultado = await pool
      .request()
      .input("MedicoID", sql.VarChar, medicoID)
      .query(query);
    if (resultado.recordset.length === 0) {
      throw new Error(`Paciente con ID ${medicoID} no encontrado.`);
    }
    return resultado.recordset[0];
  } catch (error) {
    throw error;
  }
};

export const obtenerHonorariosMedicos = async () => {
  const pool = await dbConexion();
  try {
    const result = await pool.request()
      .query(`
        SELECT MedicoID, Nombre, Apellido, EspecialidadID, Interno, HonorariosConsulta, HonorariosCirugia, Email, FechaRegistro
        FROM Medico.Medicos
      `);
    return result.recordset;
  } catch (error) {
    throw error;
  }
};

export const getEspecialidadesMedico = async () => {
  const pool = await dbConexion();
  try {
    const result = await pool.request()
      .query(`
        SELECT EspecialidadID, NombreEspecialidad, Descripcion FROM Medico.Especialidades
      `);
    return result.recordset;
  } catch (error) {
    throw error;
  }
};
