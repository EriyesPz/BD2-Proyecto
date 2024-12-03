import { Request, Response } from "express";
import {
  obtenerHabitaciones,
  insertarHabitacion,
} from "../database/habitaciones";

export const ctlObtenerHabitaciones = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const habitaciones = await obtenerHabitaciones();
    res.status(200).json(habitaciones);
  } catch (error) {
    console.error("Error al obtener habitaciones:", error);
    res.status(500).json(`Error: ${error}`);
  }
};

export const ctlInsertarHabitacion = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { numeroHabitacion, tipoHabitacionID, disponible, caracteristicas } =
      req.body;
    await insertarHabitacion(
      numeroHabitacion,
      tipoHabitacionID,
      disponible,
      caracteristicas
    );
    res.status(201).json({ mensaje: "Habitación insertada correctamente" });
  } catch (error) {
    console.error("Error al insertar habitación:", error);
    res.status(500).json(`Error: ${error}`);
  }
};
