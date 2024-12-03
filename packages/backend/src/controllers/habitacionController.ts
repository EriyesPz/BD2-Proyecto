import { Request, Response } from "express";
import {
  obtenerTiposHabitacion,
  insertarTipoHabitacion,
} from "../database/tiposHabitacion";

export const ctlObtenerTiposHabitacion = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const tipos = await obtenerTiposHabitacion();
    res.status(200).json(tipos);
  } catch (error) {
    console.error("Error al obtener tipos de habitación:", error);
    res.status(500).json(`Error: ${error}`);
  }
};

export const ctlInsertarTipoHabitacion = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { tipo, precioPorDia } = req.body;
    await insertarTipoHabitacion(tipo, precioPorDia);
    res
      .status(201)
      .json({ mensaje: "Tipo de habitación insertado correctamente" });
  } catch (error) {
    console.error("Error al insertar tipo de habitación:", error);
    res.status(500).json(`Error: ${error}`);
  }
};
