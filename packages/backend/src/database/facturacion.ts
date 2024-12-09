import { dbConexion } from "./conexion";
import sql from "mssql";

export const crearHospitalizacionConFactura = async (facturaData: any) => {
  const pool = await dbConexion();
  try {
    await pool
      .request()
      .input("PacienteID", sql.VarChar(20), facturaData.PacienteID)
      .input("HabitacionID", sql.VarChar(20), facturaData.HabitacionID)
      .input("FechaIngreso", sql.DateTime2, facturaData.FechaIngreso)
      .input("Diagnostico", sql.VarChar(sql.MAX), facturaData.Diagnostico)
      .input("TotalFactura", sql.Decimal(18, 2), facturaData.TotalFactura)
      .execute("Hospitalizacion.usp_CrearHospitalizacionConFactura");
  } catch (error) {
    throw error;
  }
};

export const darAltaHospitalizacion = async (altaData: any) => {
  const pool = await dbConexion();
  try {
    await pool
      .request()
      .input("HospitalizacionID", sql.VarChar(20), altaData.HospitalizacionID)
      .input("FechaAlta", sql.DateTime2, altaData.FechaAlta)
      .input("Gastos", sql.Decimal(18, 2), altaData.Gastos)
      .execute("Hospitalizacion.usp_DarAltaHospitalizacion");
  } catch (error) {
    throw error;
  }
};

export const getFacturas = async () => {
  try {
    const pool = await dbConexion();
    const query = `SELECT * FROM  Factura.ViewDetalleFacturaCompleta`;
    const resultado = await pool.request().query(query);
    return resultado.recordset;
  } catch (error) {
    throw error;
  }
};

export const getFactura = async (facturaID: string) => {
  try {
    const pool = await dbConexion();
    const query = `
      SELECT *
      FROM Factura.ViewDetalleFacturaCompleta
      WHERE FacturaID = @FacturaID
    `;
    const resultado = await pool
      .request()
      .input("FacturaID", sql.VarChar(20), facturaID)
      .query(query);
    return resultado.recordset[0] || null;
  } catch (error) {
    throw error;
  }
};
export const pagarFactura = async (pagoData: any) => {
  const pool = await dbConexion();
  try {
    await pool
      .request()
      .input("FacturaID", sql.VarChar(20), pagoData.FacturaID)
      .input("MontoPagado", sql.Decimal(18, 2), pagoData.MontoPagado)
      .input("MetodoPago", sql.VarChar(20), pagoData.MetodoPago)
      .execute("Factura.usp_PagarFactura");
  } catch (error) {
    throw error;
  }
};
