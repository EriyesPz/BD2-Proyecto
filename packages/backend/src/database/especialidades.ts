import { dbConexion } from "./conexion";
import sql from "mssql";

export const obtenerEspecialidades = async () => {
  try {
    const pool = await dbConexion();
    const consulta = `
      SELECT * FROM Medico.Especialidades;
    `;
    const resultado = await pool.request().query(consulta);
    return resultado.recordset;
  } catch (error) {
    throw new Error(`Error al obtener especialidades: ${error}`);
  }
};

export const insertarEspecialidad = async (
  nombreEspecialidad: string,
  descripcion: string
) => {
  try {
    const pool = await dbConexion();
    const consulta = `
      INSERT INTO Medico.Especialidades (NombreEspecialidad, Descripcion)
      VALUES (@NombreEspecialidad, @Descripcion);
    `;
    await pool
      .request()
      .input("NombreEspecialidad", sql.VarChar(100), nombreEspecialidad)
      .input("Descripcion", sql.VarChar(500), descripcion)
      .query(consulta);
    return { mensaje: "Especialidad insertada correctamente" };
  } catch (error) {
    throw new Error(`Error al insertar especialidad: ${error}`);
  }
};
