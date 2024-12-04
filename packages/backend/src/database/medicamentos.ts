import { dbConexion } from "./conexion";
import sql from "mssql";

export const obtenerMedicamentos = async () => {
  try {
    const pool = await dbConexion();
    const consulta = `
      SELECT * FROM Farmacia.Medicamentos;
    `;
    const resultado = await pool.request().query(consulta);
    return resultado.recordset;
  } catch (error) {
    throw new Error(`Error al obtener medicamentos: ${error}`);
  }
};

export const insertarMedicamento = async (
  nombreMedicamento: string,
  descripcion: string,
  precio: number,
  stock: number,
  proveedorID: number
) => {
  try {
    const pool = await dbConexion();
    const consulta = `
      INSERT INTO Farmacia.Medicamentos
      (NombreMedicamento, Descripcion, Precio, Stock, ProveedorID)
      VALUES (@NombreMedicamento, @Descripcion, @Precio, @Stock, @ProveedorID);
    `;
    await pool
      .request()
      .input("NombreMedicamento", sql.VarChar(100), nombreMedicamento)
      .input("Descripcion", sql.VarChar(500), descripcion)
      .input("Precio", sql.Decimal(10, 2), precio)
      .input("Stock", sql.Int, stock)
      .input("ProveedorID", sql.Int, proveedorID)
      .query(consulta);
    return { mensaje: "Medicamento insertado correctamente" };
  } catch (error) {
    throw new Error(`Error al insertar medicamento: ${error}`);
  }
};

export const obtenerStockMedicamentos = async () => {
  try {
    const pool = await dbConexion();
    const consulta = `
      SELECT * FROM Farmacia.fn_StockMedicamentos();
    `;
    const resultado = await pool.request().query(consulta);
    return resultado.recordset;
  } catch (error) {
    throw new Error(`Error al obtener stock de medicamentos: ${error}`);
  }
};

export const verificarStockMedicamento = async (medicamentoID: number) => {
  try {
    const pool = await dbConexion();
    const consulta = `
      SELECT Farmacia.fn_VerificarStock(@MedicamentoID) AS HayStock;
    `;
    const resultado = await pool
      .request()
      .input("MedicamentoID", sql.Int, medicamentoID)
      .query(consulta);
    return resultado.recordset[0].HayStock;
  } catch (error) {
    throw new Error(`Error al verificar stock de medicamento: ${error}`);
  }
};
