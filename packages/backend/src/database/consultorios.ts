import { dbConexion } from "./conexion";
import sql from "mssql";

export const getConsultorios = async () => {
    try {
        const pool = await dbConexion();
        const query = `SELECT ConsultorioID, Tipo, NumeroConsultorio, MedicoID, Estado FROM Consultorios.Consultorios`;
        const resultado = await pool.request().query(query);
        return resultado.recordset;
    } catch (error) {
        throw error;
    }
}

export const getConsultorio = async (consultorioID: string) => {
    try {
        const pool = await dbConexion();
        const query = `SELECT ConsultorioID, Tipo, NumeroConsultorio, MedicoID, Estado FROM Consultorios.Consultorios
        WHERE ConsultorioID = @Consultorio`;
        const resultado = await pool
        .request()
        .input("Consultorio", sql.VarChar, consultorioID)
        .query(query);
      return resultado.recordset;
    } catch (error) {
        throw error;
    }
}

export const crearConsultorio = async (consultorioData: any) => {
  const pool = await dbConexion();
  try {
    await pool
      .request()
      .input("Tipo", sql.VarChar(50), consultorioData.Tipo)
      .input(
        "NumeroConsultorio",
        sql.VarChar(10),
        consultorioData.NumeroConsultorio
      )
      .input("MedicoID", sql.VarChar(20), consultorioData.MedicoID)
      .input("Estado", sql.VarChar(20), consultorioData.Estado)
      .execute("Consultorios.usp_InsertConsultorio");
  } catch (error) {
    throw error;
  }
};

