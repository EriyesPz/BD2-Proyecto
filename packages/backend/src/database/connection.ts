import sql from "mssql";
import { Keys } from "../config";

const dbConfig = {
  server: Keys.DB.Host,
  database: Keys.DB.Name,
  user: Keys.DB.User,
  password: Keys.DB.Password,
  port: parseInt(Keys.DB.Port),
  options: {
    trustServerCertificate: true,
    trustedConnection: false,
    enableArithAbort: true,
  },
};

console.log(dbConfig);

export const dbConnection = async () => {
  try {
    const pool = await new sql.ConnectionPool(dbConfig).connect();
    console.log("Conexión a SQL Server establecida");
    return pool;
  } catch (error) {
    console.error("Error al conectar a SQL Server:", error);
    throw error;
  }
};
