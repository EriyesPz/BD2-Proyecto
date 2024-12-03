import { Request, Response } from "express";
import { obtenerEspecialidades, insertarEspecialidad } from "../database/especialidades";

export const ctlObtenerEspecialidades = async (req: Request, res: Response): Promise<void> => {
  try {
    const especialidades = await obtenerEspecialidades();
    res.status(200).json(especialidades);
  } catch (error) {
    console.error("Error al obtener especialidades:", error);
    res.status(500).json(`Error: ${error}`);
  }
};

export const ctlInsertarEspecialidad = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombreEspecialidad, descripcion } = req.body;
    await insertarEspecialidad(nombreEspecialidad, descripcion);
    res.status(201).json({ mensaje: "Especialidad insertada correctamente" });
  } catch (error) {
    console.error("Error al insertar especialidad:", error);
    res.status(500).json(`Error: ${error}`);
  }
};
