import { dbConexion } from "./conexion";
import sql from "mssql";

export const getUsuarios = async () => {
  try {
    const pool = await dbConexion();
    const consulta = `SELECT * FROM Usuarios.Usuarios ORDER BY EmpleadoID ASC;`;
    const resultado = await pool.request().query(consulta);
    return resultado.recordset;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const getUsuarioEmail = async (email: string) => {
  try {
    const pool = await dbConexion();
    const consulta = `SELECT * FROM Usuarios.Usuarios WHERE Email = @Email`;
    const resultado = await pool
      .request()
      .input("Email", email)
      .query(consulta);
    return resultado.recordset[0];
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const insertarUsuario = async (
  nombre: string,
  email: string,
  usuario: string,
  rol: string,
  contrasenia: string
) => {
  try {
    const pool = await dbConexion();
    const consulta = `
      INSERT INTO Usuarios.Usuarios (Nombre, Email, Usuario, Rol, Contrasenia)
      VALUES (@Nombre, @Email, @Usuario, @Rol, @Contrasenia);
    `;
    await pool
      .request()
      .input("Nombre", sql.VarChar(100), nombre)
      .input("Email", sql.VarChar(100), email)
      .input("Usuario", sql.VarChar(50), usuario)
      .input("Rol", sql.VarChar(50), rol)
      .input("Contrasenia", sql.VarChar(255), contrasenia)
      .query(consulta);
    return { mensaje: "Usuario insertado correctamente" };
  } catch (error) {
    throw new Error(`Error al insertar usuario: ${error}`);
  }
};

export const actualizarUserToken = async (
  userId: string,
  token: string,
  tokenAge: Date
) => {
  try {
    const pool = await dbConexion();
    const query = `
      UPDATE Usuarios.Usuarios 
      SET Token = @Token, TokenFecha = @TokenFecha
      WHERE UUID = @UUID
    `;
    await pool
      .request()
      .input("Token", token)
      .input("TokenFecha", tokenAge)
      .input("UUID", userId)
      .query(query);
  } catch (error) {
    throw new Error(`Error updating user token: ${error}`);
  }
};
