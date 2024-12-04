import { Request, Response } from "express";
import {
  obtenerMedicamentos,
  insertarMedicamento,
  obtenerStockMedicamentos,
  verificarStockMedicamento
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

export const ctlObtenerStockMedicamentos = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const stock = await obtenerStockMedicamentos();
    res.status(200).json(stock);
  } catch (error) {
    console.error("Error al obtener stock de medicamentos:", error);
    res.status(500).json(`Error: ${error}`);
  }
};

export const ctlVerificarStockMedicamento = async (req: Request, res: Response): Promise<void> => {
  try {
    const { medicamentoID } = req.params;

    if (!medicamentoID) {
      res.status(400).json({ mensaje: "Debe proporcionar 'medicamentoID' en los parámetros de la ruta." });
      return;
    }

    const hayStock = await verificarStockMedicamento(parseInt(medicamentoID));
    res.status(200).json({ hayStock: hayStock === 1 });
  } catch (error) {
    console.error("Error al verificar stock de medicamento:", error);
    res.status(500).json(`Error: ${error}`);
  }
};