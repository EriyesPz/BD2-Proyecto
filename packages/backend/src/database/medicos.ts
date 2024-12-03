import { dbConexion } from "./conexion";
import sql from "mssql";

export const obtenerMedicos = async () => {
  try {
    const pool = await dbConexion();
    const consulta = `
      SELECT * FROM Medico.Medicos;
    `;
    const resultado = await pool.request().query(consulta);
    return resultado.recordset;
  } catch (error) {
    throw new Error(`Error al obtener médicos: ${error}`);
  }
};

export const insertarMedico = async (
  nombre: string,
  apellido: string,
  especialidadID: number,
  interno: boolean,
  honorariosConsulta: number,
  honorariosCirugia: number | null,
  direccionID: number,
  telefono: string,
  email: string
) => {
  try {
    const pool = await dbConexion();
    const consulta = `
      INSERT INTO Medico.Medicos
      (Nombre, Apellido, EspecialidadID, Interno, HonorariosConsulta, HonorariosCirugia, DireccionID, Telefono, Email)
      VALUES (@Nombre, @Apellido, @EspecialidadID, @Interno, @HonorariosConsulta, @HonorariosCirugia, @DireccionID, @Telefono, @Email);
    `;
    await pool
      .request()
      .input("Nombre", sql.VarChar(50), nombre)
      .input("Apellido", sql.VarChar(50), apellido)
      .input("EspecialidadID", sql.Int, especialidadID)
      .input("Interno", sql.Bit, interno)
      .input("HonorariosConsulta", sql.Decimal(10, 2), honorariosConsulta)
      .input("HonorariosCirugia", sql.Decimal(10, 2), honorariosCirugia)
      .input("DireccionID", sql.Int, direccionID)
      .input("Telefono", sql.VarChar(20), telefono)
      .input("Email", sql.VarChar(100), email)
      .query(consulta);
    return { mensaje: "Médico insertado correctamente" };
  } catch (error) {
    throw new Error(`Error al insertar médico: ${error}`);
  }
};
