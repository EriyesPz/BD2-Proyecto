import { Request, Response } from "express";
import { obtenerSegurosMedicos, insertarSeguroMedico } from "../database/segurosMedicos";

export const ctlObtenerSegurosMedicos = async (req: Request, res: Response): Promise<void> => {
  try {
    const seguros = await obtenerSegurosMedicos();
    res.status(200).json(seguros);
  } catch (error) {
    console.error("Error al obtener seguros médicos:", error);
    res.status(500).json(`Error: ${error}`);
  }
};

export const ctlInsertarSeguroMedico = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombreAseguradora, cobertura, telefono, email } = req.body;
    await insertarSeguroMedico(nombreAseguradora, cobertura, telefono, email);
    res.status(201).json({ mensaje: "Seguro médico insertado correctamente" });
  } catch (error) {
    console.error("Error al insertar seguro médico:", error);
    res.status(500).json(`Error: ${error}`);
  }
};
