import { Request, Response } from "express";
import { obtenerExamenes, insertarExamen } from "../database/examenes";

export const ctlObtenerExamenes = async (req: Request, res: Response): Promise<void> => {
  try {
    const examenes = await obtenerExamenes();
    res.status(200).json(examenes);
  } catch (error) {
    console.error("Error al obtener exámenes:", error);
    res.status(500).json(`Error: ${error}`);
  }
};

export const ctlInsertarExamen = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombreExamen, descripcion, precio } = req.body;
    await insertarExamen(nombreExamen, descripcion, precio);
    res.status(201).json({ mensaje: "Examen insertado correctamente" });
  } catch (error) {
    console.error("Error al insertar examen:", error);
    res.status(500).json(`Error: ${error}`);
  }
};
