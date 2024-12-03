import { Request, Response } from "express";
import {
  obtenerMedicamentos,
  insertarMedicamento,
} from "../database/medicamentos";

export const ctlObtenerMedicamentos = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const medicamentos = await obtenerMedicamentos();
    res.status(200).json(medicamentos);
  } catch (error) {
    console.error("Error al obtener medicamentos:", error);
    res.status(500).json(`Error: ${error}`);
  }
};

export const ctlInsertarMedicamento = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { nombreMedicamento, descripcion, precio, stock, proveedorID } =
      req.body;
    await insertarMedicamento(
      nombreMedicamento,
      descripcion,
      precio,
      stock,
      proveedorID
    );
    res.status(201).json({ mensaje: "Medicamento insertado correctamente" });
  } catch (error) {
    console.error("Error al insertar medicamento:", error);
    res.status(500).json(`Error: ${error}`);
  }
};
