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
    User: getEnvVar("DB_USER"),
    Password: getEnvVar("DB_PASSWORD"),
    Name: getEnvVar("DB_NAME"),
    Port: getEnvVar("DB_PORT"),
  },
};

export { Keys };
