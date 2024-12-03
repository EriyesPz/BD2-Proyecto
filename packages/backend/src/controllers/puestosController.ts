import { Request, Response } from "express";
import { obtenerPuestos, insertarPuesto } from "../database/puestos";

export const ctlObtenerPuestos = async (req: Request, res: Response): Promise<void> => {
  try {
    const puestos = await obtenerPuestos();
    res.status(200).json(puestos);
  } catch (error) {
    console.error("Error al obtener puestos:", error);
    res.status(500).json(`Error: ${error}`);
  }
};

export const ctlInsertarPuesto = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombrePuesto, descripcion } = req.body;
    await insertarPuesto(nombrePuesto, descripcion);
    res.status(201).json({ mensaje: "Puesto insertado correctamente" });
  } catch (error) {
    console.error("Error al insertar puesto:", error);
    res.status(500).json(`Error: ${error}`);
  }
};
