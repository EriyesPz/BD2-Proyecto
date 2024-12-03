import { dbConexion } from "./conexion";
import sql from "mssql";

export const obtenerResultadosLaboratorio = async () => {
  try {
    const pool = await dbConexion();
    const consulta = `
      SELECT * FROM Laboratorio.Resultados;
    `;
    const resultado = await pool.request().query(consulta);
    return resultado.recordset;
  } catch (error) {
    throw new Error(`Error al obtener resultados de laboratorio: ${error}`);
  }
};

export const insertarResultadoLaboratorio = async (
  examenID: number,
  pacienteID: number,
  fechaExamen: Date,
  resultados: string,
  observaciones: string
) => {
  try {
    const pool = await dbConexion();
    const consulta = `
      INSERT INTO Laboratorio.Resultados
      (ExamenID, PacienteID, FechaExamen, Resultados, Observaciones)
      VALUES (@ExamenID, @PacienteID, @FechaExamen, @Resultados, @Observaciones);
    `;
    await pool
      .request()
      .input("ExamenID", sql.Int, examenID)
      .input("PacienteID", sql.Int, pacienteID)
      .input("FechaExamen", sql.DateTime2, fechaExamen)
      .input("Resultados", sql.Xml, resultados)
      .input("Observaciones", sql.Text, observaciones)
      .query(consulta);
    return { mensaje: "Resultado de laboratorio insertado correctamente" };
  } catch (error) {
    throw new Error(`Error al insertar resultado de laboratorio: ${error}`);
  }
};
