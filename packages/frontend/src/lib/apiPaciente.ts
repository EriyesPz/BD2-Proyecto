import { cliente } from "./cliente";

interface PacienteData {
  nombre: string;
  apellido: string;
  nacimiento: string; 
  genero: 'M' | 'F' | 'O';
  telefono?: string;
  email?: string;
  direccion?: string;
  seguroSocial: string;
}

export const obtenerPacientes = async () => {
  const response = await cliente.get("pacientes");
  return response.data;
};

export const obtenerPaciente = async (pacienteID: string) => {
  const response = await cliente.get(`paciente/${pacienteID}`);
  return response.data;
};

export const crearPaciente = async (paciente: PacienteData) => {
  const response = await cliente.post("paciente", {
    nombre: paciente.nombre,
    apellido: paciente.apellido,
    nacimiento: paciente.nacimiento,
    genero: paciente.genero,
    telefono: paciente.telefono,
    email: paciente.email,
    direccion: paciente.direccion,
    seguroSocial: paciente.seguroSocial,
  });
  return response.data;
};
