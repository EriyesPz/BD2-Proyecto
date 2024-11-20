import { getUsuarios } from "../database/usuarios";
import { Request, Response } from "express";

export const ctlUsuarios = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuarios = await getUsuarios();

    res.status(200).json(usuarios);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json(`Error: ${error}`);
  }
};
