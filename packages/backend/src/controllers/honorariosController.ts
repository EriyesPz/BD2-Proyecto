import { getHonorarios } from "../database/honorarios";
import { Request, Response } from "express";

export const obtenerHonorarios = async (req: Request, res: Response): Promise<void> => {
  const { fechaInicio, fechaFin } = req.query;

  if (!fechaInicio || !fechaFin) {
    res.status(400).json({
      mensaje: "Los parámetros 'fechaInicio' y 'fechaFin' son obligatorios.",
    });
    return;
  }

  try {
    const honorarios = await getHonorarios(String(fechaInicio), String(fechaFin));

    res.status(200).json(honorarios);
  } catch (error) {
    console.error("Error al obtener honorarios médicos:", error);

    res.status(500).json({
      mensaje: "Hubo un error al obtener los honorarios médicos.",
    });
  }
};
