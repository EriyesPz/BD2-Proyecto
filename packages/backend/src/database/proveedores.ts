import { dbConexion } from "./conexion";
import sql from "mssql";

export const obtenerProveedores = async () => {
  try {
    const pool = await dbConexion();
    const consulta = `
      SELECT * FROM Farmacia.Proveedores;
    `;
    const resultado = await pool.request().query(consulta);
    return resultado.recordset;
  } catch (error) {
    throw new Error(`Error al obtener proveedores: ${error}`);
  }
};

export const insertarProveedor = async (
  nombreProveedor: string,
  contacto: string,
  telefono: string,
  email: string,
  direccionID: number
) => {
  try {
    const pool = await dbConexion();
    const consulta = `
      INSERT INTO Farmacia.Proveedores (NombreProveedor, Contacto, Telefono, Email, DireccionID)
      VALUES (@NombreProveedor, @Contacto, @Telefono, @Email, @DireccionID);
    `;
    await pool
      .request()
      .input("NombreProveedor", sql.VarChar(100), nombreProveedor)
      .input("Contacto", sql.VarChar(100), contacto)
      .input("Telefono", sql.VarChar(20), telefono)
      .input("Email", sql.VarChar(100), email)
      .input("DireccionID", sql.Int, direccionID)
      .query(consulta);
    return { mensaje: "Proveedor insertado correctamente" };
  } catch (error) {
    throw new Error(`Error al insertar proveedor: ${error}`);
  }
};
