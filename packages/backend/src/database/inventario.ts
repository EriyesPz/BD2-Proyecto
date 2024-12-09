import { dbConexion } from "./conexion";
import sql from "mssql";

export const registrarMedicamentoAplicado = async (medicamentoData: any) => {
  const pool = await dbConexion();
  try {
    await pool
      .request()
      .input(
        "HospitalizacionID",
        sql.VarChar(20),
        medicamentoData.HospitalizacionID
      )
      .input("MedicamentoID", sql.VarChar(20), medicamentoData.MedicamentoID)
      .input("Cantidad", sql.Int, medicamentoData.Cantidad)
      .input("FechaAplicacion", sql.DateTime2, medicamentoData.FechaAplicacion)
      .execute("Hospitalizacion.usp_RegistrarMedicamentoAplicado");
  } catch (error) {
    throw error;
  }
};

export const registrarAlimentoSuministrado = async (alimentoData: any) => {
  const pool = await dbConexion();
  try {
    await pool
      .request()
      .input(
        "HospitalizacionID",
        sql.VarChar(20),
        alimentoData.HospitalizacionID
      )
      .input("AlimentoID", sql.VarChar(20), alimentoData.AlimentoID)
      .input("Cantidad", sql.Int, alimentoData.Cantidad)
      .input("FechaServicio", sql.DateTime2, alimentoData.FechaServicio)
      .execute("Hospitalizacion.usp_RegistrarAlimentoSuministrado");
  } catch (error) {
    throw error;
  }
};
