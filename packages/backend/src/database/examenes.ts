import { dbConexion } from "./conexion";
import sql from "mssql";

export const obtenerExamenes = async () => {
  try {
    const pool = await dbConexion();
    const consulta = `
      SELECT * FROM Laboratorio.Examenes;
    `;
    const resultado = await pool.request().query(consulta);
    return resultado.recordset;
  } catch (error) {
    throw new Error(`Error al obtener exámenes: ${error}`);
  }
};

export const insertarExamen = async (
  nombreExamen: string,
  descripcion: string,
  precio: number
) => {
  try {
    const pool = await dbConexion();
    const consulta = `
      INSERT INTO Laboratorio.Examenes (NombreExamen, Descripcion, Precio)
      VALUES (@NombreExamen, @Descripcion, @Precio);
    `;
    await pool
      .request()
      .input("NombreExamen", sql.VarChar(100), nombreExamen)
      .input("Descripcion", sql.VarChar(500), descripcion)
      .input("Precio", sql.Decimal(10, 2), precio)
      .query(consulta);
    return { mensaje: "Examen insertado correctamente" };
  } catch (error) {
    throw new Error(`Error al insertar examen: ${error}`);
  }
};
