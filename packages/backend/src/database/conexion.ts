import sql from "mssql";
import { Keys } from "../config";

const dbConfiguracion = {
  server: Keys.DB.Host,
  database: Keys.DB.Nombre,
  user: Keys.DB.Usuario,
  password: Keys.DB.Contrasenia,
  port: parseInt(Keys.DB.Puerto),
  options: {
    trustServerCertificate: true,
    trustedConnection: false,
    enableArithAbort: true,
  },
};

console.log(dbConfiguracion);

export const dbConexion = async () => {
  try {
    const pool = await new sql.ConnectionPool(dbConfiguracion).connect();
    console.log("Conexión a SQL Server establecida");
    return pool;
  } catch (error) {
    console.error("Error al conectar a SQL Server:", error);
    throw error;
  }
};
