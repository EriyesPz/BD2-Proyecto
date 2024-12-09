import { dbConexion } from "./conexion";
import sql from "mssql";

export const getPacientes = async () => {
  try {
    const pool = await dbConexion();
    const query = `SELECT 
        PacienteID,
        Nombre,
        Apellido,
        FechaNacimiento,
        Genero,
        Telefono,
        Email,
        Direccion,
        NumeroSeguroSocial,
        FechaRegistro
        FROM Paciente.Pacientes`;
    const resultado = await pool.request().query(query);
    return resultado.recordset;
  } catch (error) {
    throw error;
  }
};

export const getPaciente = async (pacienteID: string) => {
  try {
    const pool = await dbConexion();
    const query = `SELECT 
        PacienteID,
        Nombre,
        Apellido,
        FechaNacimiento,
        Genero,
        Telefono,
        Email,
        Direccion,
        NumeroSeguroSocial,
        FechaRegistro
        FROM Paciente.Pacientes
        WHERE PacienteID = @PacienteID`;
    const resultado = await pool
      .request()
      .input("PacienteID", sql.VarChar, pacienteID)
      .query(query);
    if (resultado.recordset.length === 0) {
      throw new Error(`Paciente con ID ${pacienteID} no encontrado.`);
    }
    return resultado.recordset[0];
  } catch (error) {
    throw error;
  }
};

export const crearPaciente = async (pacienteData: any) => {
  const pool = await dbConexion();
  try {
    await pool
      .request()
      .input("Nombre", sql.VarChar(50), pacienteData.Nombre)
      .input("Apellido", sql.VarChar(50), pacienteData.Apellido)
      .input("FechaNacimiento", sql.Date, pacienteData.FechaNacimiento)
      .input("Genero", sql.Char(1), pacienteData.Genero)
      .input("Telefono", sql.VarChar(20), pacienteData.Telefono)
      .input("Email", sql.VarChar(100), pacienteData.Email)
      .input("Direccion", sql.VarChar(255), pacienteData.Direccion)
      .input(
        "NumeroSeguroSocial",
        sql.VarChar(50),
        pacienteData.NumeroSeguroSocial
      )
      .execute("Paciente.usp_InsertPaciente");
  } catch (error) {
    throw error;
  }
};
