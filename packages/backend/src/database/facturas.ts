import { dbConexion } from "./conexion";
import sql from "mssql";

export const obtenerFacturas = async () => {
  try {
    const pool = await dbConexion();
    const consulta = `
      SELECT * FROM Factura.Facturas;
    `;
    const resultado = await pool.request().query(consulta);
    return resultado.recordset;
  } catch (error) {
    throw new Error(`Error al obtener facturas: ${error}`);
  }
};

export const insertarFactura = async (
  pacienteID: number,
  fechaFactura: Date,
  totalFactura: number,
  estadoPago: string,
  detalles: string | null
) => {
  try {
    const pool = await dbConexion();
    const consulta = `
      INSERT INTO Factura.Facturas
      (PacienteID, FechaFactura, TotalFactura, EstadoPago, Detalles)
      VALUES (@PacienteID, @FechaFactura, @TotalFactura, @EstadoPago, @Detalles);
    `;
    await pool
      .request()
      .input("PacienteID", sql.Int, pacienteID)
      .input("FechaFactura", sql.DateTime2, fechaFactura)
      .input("TotalFactura", sql.Decimal(18, 2), totalFactura)
      .input("EstadoPago", sql.VarChar(20), estadoPago)
      .input("Detalles", sql.Xml, detalles)
      .query(consulta);
    return { mensaje: "Factura insertada correctamente" };
  } catch (error) {
    throw new Error(`Error al insertar factura: ${error}`);
  }
};

export const insertarPago = async (
  facturaID: number,
  fechaPago: Date,
  montoPagado: number,
  metodoPago: string
) => {
  try {
    const pool = await dbConexion();
    const consulta = `
      INSERT INTO Factura.Pagos
      (FacturaID, FechaPago, MontoPagado, MetodoPago)
      VALUES (@FacturaID, @FechaPago, @MontoPagado, @MetodoPago);
    `;
    await pool
      .request()
      .input("FacturaID", sql.Int, facturaID)
      .input("FechaPago", sql.DateTime2, fechaPago)
      .input("MontoPagado", sql.Decimal(18, 2), montoPagado)
      .input("MetodoPago", sql.VarChar(20), metodoPago)
      .query(consulta);
    return { mensaje: "Pago insertado correctamente" };
  } catch (error) {
    throw new Error(`Error al insertar pago: ${error}`);
  }
};

export const generarFacturaHospitalizacion = async (
  hospitalizacionID: number
) => {
  try {
    const pool = await dbConexion();
    await pool
      .request()
      .input("HospitalizacionID", sql.Int, hospitalizacionID)
      .execute("Factura.sp_GenerarFacturaHospitalizacion");
    return { mensaje: "Factura generada correctamente" };
  } catch (error) {
    throw new Error(`Error al generar factura de hospitalización: ${error}`);
  }
};

export const obtenerTotalPagado = async (facturaID: number) => {
  try {
    const pool = await dbConexion();
    const consulta = `
      SELECT Factura.fn_TotalPagado(@FacturaID) AS TotalPagado;
    `;
    const resultado = await pool
      .request()
      .input("FacturaID", sql.Int, facturaID)
      .query(consulta);
    return resultado.recordset[0].TotalPagado;
  } catch (error) {
    throw new Error(`Error al obtener total pagado de la factura: ${error}`);
  }
};