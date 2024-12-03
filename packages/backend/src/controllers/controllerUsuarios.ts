import { getUsuarios, insertarUsuario } from "../database/usuarios";
import { Request, Response } from "express";

export const ctlUsuarios = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const usuarios = await getUsuarios();

    res.status(200).json(usuarios);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json(`Error: ${error}`);
  }
};

export const ctlInsertarUsuario = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { nombre, email, usuario, rol, contrasenia } = req.body;
    await insertarUsuario(nombre, email, usuario, rol, contrasenia);
    res.status(201).json({ mensaje: "Usuario insertado correctamente" });
  } catch (error) {
    console.error("Error al insertar usuario:", error);
    res.status(500).json(`Error: ${error}`);
  }
};
