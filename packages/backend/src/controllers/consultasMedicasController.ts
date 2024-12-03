import { Request, Response } from "express";
import {
  obtenerConsultasMedicas,
  insertarConsultaMedica,
} from "../database/consultasMedicas";

export const ctlObtenerConsultasMedicas = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const consultas = await obtenerConsultasMedicas();
    res.status(200).json(consultas);
  } catch (error) {
    console.error("Error al obtener consultas médicas:", error);
    res.status(500).json(`Error: ${error}`);
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
  } catch (error) {
    console.error("Error al insertar consulta médica:", error);
    res.status(500).json(`Error: ${error}`);
  }
};
