import { Request, Response } from "express";
import {
  obtenerConsultasMedicas,
  insertarConsultaMedica,
  registrarConsulta
} from "../database/consultasMedicas";

export const ctlObtenerConsultasMedicas = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const consultas = await obtenerConsultasMedicas();
    res.status(200).json(consultas);
  } catch (error: unknown) {
    console.error("Error al obtener consultas médicas:", error);
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Error desconocido" });
    }
  }
};

export const ctlRegistrarConsultaMedica = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { pacienteID, medicoID, fechaConsulta, motivoConsulta, diagnostico, prescripcion } =
      req.body;

    if (!pacienteID || !medicoID || !fechaConsulta) {
      res.status(400).json({ error: "pacienteID, medicoID y fechaConsulta son obligatorios." });
      return;
    }

    const consultaID = await registrarConsulta({
      pacienteID,
      medicoID,
      fechaConsulta,
      motivoConsulta: motivoConsulta || null,
      diagnostico: diagnostico || null,
      prescripcion: prescripcion || null,
    });

    res.status(201).json({
      message: "Consulta médica registrada exitosamente.",
      ConsultaID: consultaID,
    });
  } catch (error: unknown) {
    console.error("Error al registrar consulta médica:", error);
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Error desconocido" });
    }
  }
};


export const ctlInsertarConsultaMedica = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      pacienteID,
      medicoID,
      fechaConsulta,
      motivoConsulta,
      diagnostico,
      prescripcion,
    } = req.body;

    await insertarConsultaMedica(
      pacienteID,
      medicoID,
      fechaConsulta,
      motivoConsulta,
      diagnostico,
      prescripcion
    );

    res
      .status(201)
      .json({ mensaje: "Consulta médica insertada correctamente" });
  } catch (error: unknown) {
    console.error("Error al insertar consulta médica:", error);

    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Error desconocido" });
    }
  }
};
