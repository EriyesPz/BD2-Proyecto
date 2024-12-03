import { dbConexion } from "./conexion";
import sql from "mssql";

export const obtenerSegurosMedicos = async () => {
  try {
    const pool = await dbConexion();
    const consulta = `
      SELECT * FROM Paciente.SegurosMedicos;
    `;
    const resultado = await pool.request().query(consulta);
    return resultado.recordset;
  } catch (error) {
    throw new Error(`Error al obtener seguros médicos: ${error}`);
  }
};

export const insertarSeguroMedico = async (
  nombreAseguradora: string,
  cobertura: string,
  telefono: string,
  email: string
) => {
  try {
    const pool = await dbConexion();
    const consulta = `
      INSERT INTO Paciente.SegurosMedicos (NombreAseguradora, Cobertura, Telefono, Email)
      VALUES (@NombreAseguradora, @Cobertura, @Telefono, @Email);
    `;
    await pool.request()
      .input("NombreAseguradora", sql.VarChar(100), nombreAseguradora)
      .input("Cobertura", sql.VarChar(500), cobertura)
      .input("Telefono", sql.VarChar(20), telefono)
      .input("Email", sql.VarChar(100), email)
      .query(consulta);
    return { mensaje: "Seguro médico insertado correctamente" };
  } catch (error) {
    throw new Error(`Error al insertar seguro médico: ${error}`);
  }
};
