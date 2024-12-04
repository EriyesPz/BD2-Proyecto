import { Request, Response } from "express";
import {
  obtenerHospitalizaciones,
  registrarHospitalizacion,
  darAltaHospitalizacion,
  obtenerCostoEstancia,
  obtenerHospitalizacionPorID,
} from "../database/hospitalizaciones";

export const ctlObtenerHospitalizaciones = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const hospitalizaciones = await obtenerHospitalizaciones();
    res.status(200).json(hospitalizaciones);
  } catch (error) {
    console.error("Error al obtener hospitalizaciones:", error);
    res.status(500).json(`Error: ${error}`);
  }
};

export const ctlObtenerHospitalizacionPorID = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { hospitalizacionID } = req.params;

    if (!hospitalizacionID || isNaN(Number(hospitalizacionID))) {
      res.status(400).json({
        mensaje: "Debe proporcionar un ID de hospitalización válido.",
      });
      return;
    }

    const hospitalizacion = await obtenerHospitalizacionPorID(
      parseInt(hospitalizacionID)
    );

    if (!hospitalizacion) {
      res.status(404).json({
        mensaje: "No se encontró una hospitalización con el ID proporcionado.",
      });
      return;
    }

    res.status(200).json(hospitalizacion);
  } catch (error) {
    console.error("Error al obtener detalles de la hospitalización:", error);
    res.status(500).json(`Error: ${error}`);
  }
};


export const ctlRegistrarHospitalizacion = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { pacienteID, habitacionID, fechaIngreso, diagnostico } = req.body;
    await registrarHospitalizacion(
      pacienteID,
      habitacionID,
      fechaIngreso,
      diagnostico
    );
    res
      .status(201)
      .json({ mensaje: "Hospitalización registrada correctamente" });
  } catch (error) {
    console.error("Error al registrar hospitalización:", error);
    res.status(500).json(`Error: ${error}`);
  }
};

export const ctlDarAltaHospitalizacion = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { hospitalizacionID, fechaAlta } = req.body;
    await darAltaHospitalizacion(hospitalizacionID, fechaAlta);
    res
      .status(200)
      .json({ mensaje: "Hospitalización dada de alta correctamente" });
  } catch (error) {
    console.error("Error al dar de alta la hospitalización:", error);
    res.status(500).json(`Error: ${error}`);
  }
};

export const ctlObtenerCostoEstancia = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { hospitalizacionID } = req.params;

    if (!hospitalizacionID) {
      res.status(400).json({
        mensaje:
          "Debe proporcionar 'hospitalizacionID' en los parámetros de la ruta.",
      });
      return;
    }

    const costo = await obtenerCostoEstancia(parseInt(hospitalizacionID));
    res.status(200).json({ costoEstancia: costo });
  } catch (error) {
    console.error("Error al obtener costo de estancia:", error);
    res.status(500).json(`Error: ${error}`);
  }
};
