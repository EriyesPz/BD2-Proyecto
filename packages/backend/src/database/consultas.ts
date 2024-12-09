import { dbConexion } from "./conexion";
import sql from "mssql";

export const registrarVisitaMedica = async (consultaData: any) => {
  const pool = await dbConexion();
  try {
    await pool
      .request()
      .input("ConsultaID", sql.VarChar(20), consultaData.ConsultaID)
      .input("MedicoID", sql.VarChar(20), consultaData.MedicoID)
      .input("PacienteID", sql.VarChar(20), consultaData.PacienteID)
      .input("FechaConsulta", sql.DateTime2, consultaData.FechaConsulta)
      .input(
        "MotivoConsulta",
        sql.VarChar(sql.MAX),
        consultaData.MotivoConsulta
      )
      .input("Diagnostico", sql.VarChar(sql.MAX), consultaData.Diagnostico)
      .input("Prescripcion", sql.Xml, consultaData.Prescripcion)
      .execute("Consultas.usp_RegistrarVisitaMedica");
  } catch (error) {
    throw error;
  }
};

export const getConsultas = async () => {
  try {
    const pool = await dbConexion();
    const query = `SELECT * FROM Consultas.ViewConsultasDetalle`;
    const resultado = pool.request().query(query);
    return (await resultado).recordset;
  } catch (error){
    throw error;
  }
}