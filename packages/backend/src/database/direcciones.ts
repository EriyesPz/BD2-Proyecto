import { dbConexion } from "./conexion";
import sql from "mssql";

export const obtenerDirecciones = async () => {
  try {
    const pool = await dbConexion();
    const consulta = `
      SELECT * FROM dbo.Direcciones;
    `;
    const resultado = await pool.request().query(consulta);
    return resultado.recordset;
  } catch (error) {
    throw new Error(`Error al obtener direcciones: ${error}`);
  }
};

export const insertarDireccion = async (
  calle: string,
  ciudad: string,
  estado: string,
  codigoPostal: string,
  pais: string
) => {
  try {
    const pool = await dbConexion();
    const consulta = `
      INSERT INTO dbo.Direcciones (Calle, Ciudad, Estado, CodigoPostal, Pais)
      VALUES (@Calle, @Ciudad, @Estado, @CodigoPostal, @Pais);
    `;
    await pool
      .request()
      .input("Calle", sql.VarChar(100), calle)
      .input("Ciudad", sql.VarChar(50), ciudad)
      .input("Estado", sql.VarChar(50), estado)
      .input("CodigoPostal", sql.VarChar(10), codigoPostal)
      .input("Pais", sql.VarChar(50), pais)
      .query(consulta);
    return { mensaje: "Dirección insertada correctamente" };
  } catch (error) {
    throw new Error(`Error al insertar dirección: ${error}`);
  }
};
