import { Request, Response } from "express";
import { obtenerMedicos, insertarMedico } from "../database/medicos";

export const ctlObtenerMedicos = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const medicos = await obtenerMedicos();
    res.status(200).json(medicos);
  } catch (error) {
    console.error("Error al obtener médicos:", error);
    res.status(500).json(`Error: ${error}`);
  }
};

export const ctlInsertarMedico = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      nombre,
      apellido,
      especialidadID,
      interno,
      honorariosConsulta,
      honorariosCirugia,
      direccionID,
      telefono,
      email,
    } = req.body;
    await insertarMedico(
      nombre,
      apellido,
      especialidadID,
      interno,
      honorariosConsulta,
      honorariosCirugia,
      direccionID,
      telefono,
      email
    );
    res.status(201).json({ mensaje: "Médico insertado correctamente" });
  } catch (error) {
    console.error("Error al insertar médico:", error);
    res.status(500).json(`Error: ${error}`);
  }
};
