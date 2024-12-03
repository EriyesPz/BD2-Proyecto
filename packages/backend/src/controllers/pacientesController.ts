import { Request, Response } from "express";
import { obtenerPacientes, insertarPaciente } from "../database/pacientes";

export const ctlObtenerPacientes = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const pacientes = await obtenerPacientes();
    res.status(200).json(pacientes);
  } catch (error) {
    console.error("Error al obtener pacientes:", error);
    res.status(500).json(`Error: ${error}`);
  }
};

export const ctlInsertarPaciente = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      nombre,
      apellido,
      fechaNacimiento,
      genero,
      telefono,
      email,
      direccionID,
      numeroSeguroSocial,
    } = req.body;
    await insertarPaciente(
      nombre,
      apellido,
      fechaNacimiento,
      genero,
      telefono,
      email,
      direccionID,
      numeroSeguroSocial
    );
    res.status(201).json({ mensaje: "Paciente insertado correctamente" });
  } catch (error) {
    console.error("Error al insertar paciente:", error);
    res.status(500).json(`Error: ${error}`);
  }
};
