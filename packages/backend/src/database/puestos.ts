import { dbConexion } from "./conexion";
import sql from "mssql";

export const obtenerPuestos = async () => {
  try {
    const pool = await dbConexion();
    const consulta = `
      SELECT * FROM Administracion.Puestos;
    `;
    const resultado = await pool.request().query(consulta);
    return resultado.recordset;
  } catch (error) {
    throw new Error(`Error al obtener puestos: ${error}`);
  }
};

export const insertarPuesto = async (
  nombrePuesto: string,
  descripcion: string
) => {
  try {
    const pool = await dbConexion();
    const consulta = `
      INSERT INTO Administracion.Puestos (NombrePuesto, Descripcion)
      VALUES (@NombrePuesto, @Descripcion);
    `;
    await pool
      .request()
      .input("NombrePuesto", sql.VarChar(100), nombrePuesto)
      .input("Descripcion", sql.VarChar(500), descripcion)
      .query(consulta);
    return { mensaje: "Puesto insertado correctamente" };
  } catch (error) {
    throw new Error(`Error al insertar puesto: ${error}`);
  }
};
