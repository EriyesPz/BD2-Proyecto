import { Request, Response } from "express";
import { obtenerDirecciones, insertarDireccion } from "../database/direcciones";

export const ctlObtenerDirecciones = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const direcciones = await obtenerDirecciones();
    res.status(200).json(direcciones);
  } catch (error) {
    console.error("Error al obtener direcciones:", error);
    res.status(500).json(`Error: ${error}`);
  }
};

export const ctlInsertarDireccion = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { calle, ciudad, estado, codigoPostal, pais } = req.body;
    await insertarDireccion(calle, ciudad, estado, codigoPostal, pais);
    res.status(201).json({ mensaje: "Dirección insertada correctamente" });
  } catch (error) {
    console.error("Error al insertar dirección:", error);
    res.status(500).json(`Error: ${error}`);
  }
};

