import { Request, Response } from "express";
import { registrarVisitaMedica, getConsultas } from "../database/consultas";

export const ctlRegistrarVisita = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    ConsultaID,
    MedicoID,
    PacienteID,
    FechaConsulta,
    MotivoConsulta,
    Diagnostico,
    Prescripcion,
  } = req.body;

  if (
    !ConsultaID ||
    !MedicoID ||
    !PacienteID ||
    !FechaConsulta ||
    !MotivoConsulta ||
    !Diagnostico
  ) {
    res.status(400).json({
      error:
        "Todos los campos (ConsultaID, MedicoID, PacienteID, FechaConsulta, MotivoConsulta y Diagnóstico) son obligatorios.",
    });
  }

  try {
    await registrarVisitaMedica({
      ConsultaID,
      MedicoID,
      PacienteID,
      FechaConsulta,
      MotivoConsulta,
      Diagnostico,
      Prescripcion,
    });

    res.status(201).json({
      message: "La visita médica ha sido registrada correctamente.",
    });
  } catch (error: any) {
    console.error("Error al registrar la visita médica:", error);

    res.status(500).json({
      error: "Ocurrió un error al registrar la visita médica.",
      details: error.message || "Error desconocido",
    });
  }
};

export const ctlGetConsultas = async (req: Request, res: Response) => {
  try {
    const consultas = await getConsultas();
    res.status(200).json(consultas);
  } catch (error: any) {
    console.error("Error al obtener las consultas:", error);
    res.status(500).json({
      mensaje: "Error al obtener las consultas.",
      error: error.message,
    });
  }
};
