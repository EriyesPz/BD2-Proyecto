import { dbConexion } from "./conexion";
import sql from "mssql";

export const obtenerPacientes = async () => {
  try {
    const pool = await dbConexion();
    const consulta = `
      SELECT * FROM Paciente.Pacientes;
    `;
    const resultado = await pool.request().query(consulta);
    return resultado.recordset;
  } catch (error) {
    throw new Error(`Error al obtener pacientes: ${error}`);
  }
};

export const insertarPaciente = async (
  nombre: string,
  apellido: string,
  fechaNacimiento: Date,
  genero: string,
  telefono: string,
  email: string,
  direccionID: number,
  numeroSeguroSocial: string
) => {
  try {
    const pool = await dbConexion();
    const consulta = `
      INSERT INTO Paciente.Pacientes
      (Nombre, Apellido, FechaNacimiento, Genero, Telefono, Email, DireccionID, NumeroSeguroSocial)
      VALUES (@Nombre, @Apellido, @FechaNacimiento, @Genero, @Telefono, @Email, @DireccionID, @NumeroSeguroSocial);
    `;
    await pool
      .request()
      .input("Nombre", sql.VarChar(50), nombre)
      .input("Apellido", sql.VarChar(50), apellido)
      .input("FechaNacimiento", sql.Date, fechaNacimiento)
      .input("Genero", sql.Char(1), genero)
      .input("Telefono", sql.VarChar(20), telefono)
      .input("Email", sql.VarChar(100), email)
      .input("DireccionID", sql.Int, direccionID)
      .input("NumeroSeguroSocial", sql.VarChar(50), numeroSeguroSocial)
      .query(consulta);
    return { mensaje: "Paciente insertado correctamente" };
  } catch (error) {
    throw new Error(`Error al insertar paciente: ${error}`);
  }
};

export const obtenerResumenPacientesHospitalizaciones = async () => {
  try {
    const pool = await dbConexion();
    const consulta = `
      SELECT 
        PacienteID,
        NombreCompleto,
        HospitalizacionID,
        FechaIngreso,
        FechaAlta,
        Tipo,
        DiasHospitalizado,
        PrecioPorDia,
        CostoEstancia,
        Estado
      FROM Paciente.vw_PacientesHospitalizaciones;
    `;
    const resultado = await pool.request().query(consulta);
    return resultado.recordset;
  } catch (error) {
    throw new Error(
      `Error al obtener resumen de pacientes y hospitalizaciones: ${error}`
    );
  }
};

export const calcularEdadPaciente = async (fechaNacimiento: string) => {
  try {
    const pool = await dbConexion();
    const consulta = `
      SELECT Paciente.fn_CalcularEdad(@FechaNacimiento) AS Edad;
    `;
    const resultado = await pool
      .request()
      .input("FechaNacimiento", sql.Date, fechaNacimiento)
      .query(consulta);
    return resultado.recordset[0].Edad;
  } catch (error) {
    throw new Error(`Error al calcular edad del paciente: ${error}`);
  }
};
