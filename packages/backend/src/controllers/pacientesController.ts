import { Request, Response } from "express";
import {
  obtenerPacientes,
  insertarPaciente,
  obtenerResumenPacientesHospitalizaciones,
  calcularEdadPaciente,
} from "../database/pacientes";

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

export const ctlObtenerResumenPacientesHospitalizaciones = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const resumen = await obtenerResumenPacientesHospitalizaciones();
    res.status(200).json(resumen);
  } catch (error) {
    console.error(
      "Error al obtener resumen de pacientes y hospitalizaciones:",
      error
    );
    res.status(500).json(`Error: ${error}`);
  }
};

export const ctlCalcularEdadPaciente = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { fechaNacimiento } = req.query;

    if (!fechaNacimiento) {
      res
        .status(400)
        .json({
          mensaje:
            "Debe proporcionar 'fechaNacimiento' en el parámetro de consulta.",
        });
      return;
    }

    const edad = await calcularEdadPaciente(fechaNacimiento as string);
    res.status(200).json({ edad });
  } catch (error) {
    console.error("Error al calcular edad del paciente:", error);
    res.status(500).json(`Error: ${error}`);
  }
};
