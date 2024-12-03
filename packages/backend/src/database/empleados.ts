import { dbConexion } from "./conexion";
import sql from "mssql";

export const obtenerEmpleados = async () => {
  try {
    const pool = await dbConexion();
    const consulta = `
      SELECT * FROM Administracion.Empleados;
    `;
    const resultado = await pool.request().query(consulta);
    return resultado.recordset;
  } catch (error) {
    throw new Error(`Error al obtener empleados: ${error}`);
  }
};

export const insertarEmpleado = async (
  nombre: string,
  apellido: string,
  puestoID: number,
  fechaContratacion: Date,
  direccionID: number,
  telefono: string,
  email: string,
  salario: number
) => {
  try {
    const pool = await dbConexion();
    const consulta = `
      INSERT INTO Administracion.Empleados
      (Nombre, Apellido, PuestoID, FechaContratacion, DireccionID, Telefono, Email, Salario)
      VALUES (@Nombre, @Apellido, @PuestoID, @FechaContratacion, @DireccionID, @Telefono, @Email, @Salario);
    `;
    await pool
      .request()
      .input("Nombre", sql.VarChar(50), nombre)
      .input("Apellido", sql.VarChar(50), apellido)
      .input("PuestoID", sql.Int, puestoID)
      .input("FechaContratacion", sql.Date, fechaContratacion)
      .input("DireccionID", sql.Int, direccionID)
      .input("Telefono", sql.VarChar(20), telefono)
      .input("Email", sql.VarChar(100), email)
      .input("Salario", sql.Decimal(10, 2), salario)
      .query(consulta);
    return { mensaje: "Empleado insertado correctamente" };
  } catch (error) {
    throw new Error(`Error al insertar empleado: ${error}`);
  }
};
