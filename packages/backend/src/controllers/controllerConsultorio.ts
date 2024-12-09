import {
  crearConsultorio,
  getConsultorios,
  getConsultorio,
} from "../database/consultorios";
import { Request, Response } from "express";

export const ctlGetConsultorios = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const consultorios = await getConsultorios();
    res.status(200).json(consultorios);
  } catch (error) {
    console.error("Error al obtener consultorios:", error);
    res.status(500).json(`Error: ${error}`);
  }
};

export const ctlGetConsultorio = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { consultorioID } = req.params;

    if (!consultorioID) {
      res.status(400).json({
        mensaje: "Debe proporcionar un ID de hospitalización válido en la URL.",
      });
      return;
    }

    const consultorio = await getConsultorio(consultorioID);

    if (consultorio.length === 0) {
      res.status(404).json({
        mensaje: `No se encontró un consulorio con el ID ${consultorioID}.`,
      });
      return;
    }

    res.status(200).json(consultorio[0]);
  } catch (error: any) {
    console.error("Error al obtener consultorio:", error);
    res.status(500).json({
      mensaje: "Error al obtener el consultorioID.",
      error: error.message,
    });
  }
};

export const ctlCrearConsultorio = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { tipo, numeroConsultorio, medicoID, estado } = req.body;

    if (!tipo || !numeroConsultorio || !medicoID || !estado) {
      res.status(400).json({
        mensaje:
          "Todos los campos son obligatorios: tipo, numeroConsultorio, medicoID, estado.",
      });
      return;
    }

    const consultorioData = {
      Tipo: tipo,
      NumeroConsultorio: numeroConsultorio,
      MedicoID: medicoID,
      Estado: estado,
    };

    await crearConsultorio(consultorioData);

    res.status(201).json({ mensaje: "Consultorio creado exitosamente." });
  } catch (error: any) {
    console.error("Error al crear consultorio:", error);
    res
      .status(500)
      .json({ mensaje: "Error al crear consultorio.", error: error.message });
  }
};
