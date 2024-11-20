import { config } from "dotenv";

config();

function getEnvVar(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (value === undefined) {
    throw new Error(`Variable de entorno ${name} no se encuentra.`);
  }
  return value;
}

const Keys = {
  DB: {
    Host: getEnvVar("DB_HOST"),
    Usuario: getEnvVar("DB_USUARIO"),
    Contrasenia: getEnvVar("DB_CONTRASENIA"),
    Nombre: getEnvVar("DB_NOMBRE"),
    Puerto: getEnvVar("DB_PUERTO"),
  },
  JWT: {
    JWT_Secret :getEnvVar('JWT_SECRET'),
    JWT_Refresh_Secret :getEnvVar('JWT_REFRESH_SECRET'),
    JWT_Expires_In :getEnvVar('JWT_EXPIRES_IN'),
    JWT_Refresh_Expires_In :getEnvVar('JWT_REFRESH_EXPIRES_IN'),
  }
};

export { Keys };
