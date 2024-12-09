import { Request, Response } from "express";
import {
  getHospitalizaciones,
  getHospitalizacion,
  crearHospitalizacion,
  obtenerHabitaciones,
  getHospitalizacionesDetalles,
  getTodasHabitaciones
} from "../database/hospitalizacion";

export const ctlGetHospitalizaciones = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const hospitalizacion = await getHospitalizaciones();
    res.status(200).json(hospitalizacion);
  } catch (error) {
    console.error("Error al obtener hospitalizacion:", error);
    res.status(500).json(`Error: ${error}`);
  }
};

export const ctlGetHospitalizacion = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { hospitalizacionID } = req.params;

    if (!hospitalizacionID) {
      res.status(400).json({
        mensaje: "Debe proporcionar un ID de hospitalización válido en la URL.",
      });
      return;
    }

    const hospitalizacion = await getHospitalizacion(hospitalizacionID);

    if (hospitalizacion.length === 0) {
      res.status(404).json({
        mensaje: `No se encontró una hospitalización con el ID ${hospitalizacionID}.`,
      });
      return;
    }

    res.status(200).json(hospitalizacion[0]);
  } catch (error: any) {
    console.error("Error al obtener hospitalización:", error);
    res.status(500).json({
      mensaje: "Error al obtener la hospitalización.",
      error: error.message,
    });
  }
};

export const ctlCrearHospitalizacion = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { pacienteID, habitacionID, fechaIngreso, diagnostico } = req.body;

    if (!pacienteID || !habitacionID || !fechaIngreso || !diagnostico) {
      res.status(400).json({
        mensaje:
          "Todos los campos son obligatorios: pacienteID, habitacionID, fechaIngreso, diagnostico.",
      });
      return;
    }

    const hospitalizacionData = {
      PacienteID: pacienteID,
      HabitacionID: habitacionID,
      FechaIngreso: fechaIngreso,
      Diagnostico: diagnostico,
    };

    await crearHospitalizacion(hospitalizacionData);

    res.status(201).json({ mensaje: "Hospitalización creada exitosamente." });
  } catch (error: any) {
    console.error("Error al crear hospitalización:", error);
    res.status(500).json({
      mensaje: "Error al crear hospitalización.",
      error: error.message,
    });
  }
};

export const ctlObtenerHabitaciones = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const habitaciones = await obtenerHabitaciones();

    res.status(200).json(habitaciones);
  } catch (error: any) {
    console.error("Error al obtener las habitaciones disponibles:", error);

    res.status(500).json({
      error: "Ocurrió un error al obtener las habitaciones.",
      details: error.message || "Error desconocido",
    });
  }
};

export const ctlHospitazacionesDetalles = async (
  req: Request,
  res: Response
) => {
  try {
    const hospitalizaciones = await getHospitalizacionesDetalles();
    res.status(200).json(hospitalizaciones);
  } catch (error: any) {
    res
      .status(500)
      .json({
        error: "Ocurrió un error al obtener las habitaciones.",
        details: error.message || "Error desconocido",
      });
  }
};

export const ctlGetTodasHabitaciones = async (req: Request, res: Response): Promise<void> => {
  try {
    const habitaciones = await getTodasHabitaciones();
    res.status(200).json(habitaciones);
  } catch (error: any) {
    console.error("Error al obtener las habitaciones:", error);
    res.status(500).json({
      mensaje: "Error al obtener las habitaciones.",
      error: error.message,
    });
  }
};