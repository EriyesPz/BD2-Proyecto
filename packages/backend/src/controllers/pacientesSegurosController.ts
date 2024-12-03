import { Request, Response } from "express";
import {
  obtenerPacientesSeguros,
  insertarPacienteSeguro,
} from "../database/pacientesSeguros";

export const ctlObtenerPacientesSeguros = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const pacientesSeguros = await obtenerPacientesSeguros();
    res.status(200).json(pacientesSeguros);
  } catch (error) {
    console.error("Error al obtener pacientes seguros:", error);
    res.status(500).json(`Error: ${error}`);
  }
};

export const ctlInsertarPacienteSeguro = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { pacienteID, seguroID, numeroPoliza, fechaVencimiento } = req.body;
    await insertarPacienteSeguro(
      pacienteID,
      seguroID,
      numeroPoliza,
      fechaVencimiento
    );
    res
      .status(201)
      .json({ mensaje: "Paciente-Seguro insertado correctamente" });
  } catch (error) {
    console.error("Error al insertar paciente-seguro:", error);
    res.status(500).json(`Error: ${error}`);
  }
};
