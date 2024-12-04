import { dbConexion } from "./conexion";

export const getHonorarios = async (fechaInicio: string, fechaFin: string) => {
  try {
    const db = await dbConexion();

    const honorarios = await db
      .request()
      .input("FechaInicio", fechaInicio)
      .input("FechaFin", fechaFin)
      .query(`
        SELECT *
        FROM Medico.fn_HonorariosMedicos(@FechaInicio, @FechaFin)
      `);

    return honorarios.recordset;
  } catch (error) {
    console.error("Error al obtener honorarios:", error);
    throw new Error("No se pudieron obtener los honorarios médicos.");
  }
};
