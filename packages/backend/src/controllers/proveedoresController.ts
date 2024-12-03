import { Request, Response } from "express";
import { obtenerProveedores, insertarProveedor } from "../database/proveedores";

export const ctlObtenerProveedores = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const proveedores = await obtenerProveedores();
    res.status(200).json(proveedores);
  } catch (error) {
    console.error("Error al obtener proveedores:", error);
    res.status(500).json(`Error: ${error}`);
  }
};

export const ctlInsertarProveedor = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { nombreProveedor, contacto, telefono, email, direccionID } =
      req.body;
    await insertarProveedor(
      nombreProveedor,
      contacto,
      telefono,
      email,
      direccionID
    );
    res.status(201).json({ mensaje: "Proveedor insertado correctamente" });
  } catch (error) {
    console.error("Error al insertar proveedor:", error);
    res.status(500).json(`Error: ${error}`);
  }
};
