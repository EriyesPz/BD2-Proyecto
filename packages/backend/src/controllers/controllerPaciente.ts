import { Request, Response } from "express";
import {
  crearPaciente,
  getPaciente,
  getPacientes,
} from "../database/pacientes";

export const ctlGetPacientes = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const pacientes = await getPacientes();
    res.status(200).json(pacientes);
  } catch (error) {
    console.error("Error al obtener pacientes:", error);
    res.status(500).json(`Error: ${error}`);
  }
};

export const ctlGetPaciente = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { pacienteID } = req.params;

    if (!pacienteID) {
      res
        .status(400)
        .json({ mensaje: "Debe proporcionar un 'id' válido en la URL." });
      return;
    }

    const paciente = await getPaciente(pacienteID);
    res.status(200).json(paciente);
  } catch (error: any) {
    console.error("Error al obtener pacientes:", error);
    res.status(500).json({ error: error.message });
  }
};

export const ctlCrearPaciente = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      nombre,
      apellido,
      nacimiento,
      genero,
      telefono,
      email,
      direccion,
      seguroSocial,
    } = req.body;

    const pacienteData = {
      Nombre: nombre,
      Apellido: apellido,
      FechaNacimiento: nacimiento,
      Genero: genero,
      Telefono: telefono,
      Email: email,
      Direccion: direccion,
      NumeroSeguroSocial: seguroSocial,
    };
    await crearPaciente(pacienteData);

    res.status(201).json({ mensaje: "Paciente creado exitosamente." });
  } catch (error: any) {
    console.error("Error al crear paciente:", error);
    res
      .status(500)
      .json({ mensaje: "Error al crear paciente.", error: error.message });
  }
};
