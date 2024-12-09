import {
  crearMedico,
  getMedicos,
  getMedico,
  obtenerHonorariosMedicos,
  getEspecialidadesMedico
} from "../database/medicos";
import { Request, Response } from "express";

export const ctlGetMedicos = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const pacientes = await getMedicos();
    res.status(200).json(pacientes);
  } catch (error) {
    console.error("Error al obtener pacientes:", error);
    res.status(500).json(`Error: ${error}`);
  }
};

export const ctlGetMedico = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { medicoID } = req.params;

    if (!medicoID) {
      res
        .status(400)
        .json({ mensaje: "Debe proporcionar un ID válido en la URL." });
      return;
    }

    const medico = await getMedico(medicoID);

    res.status(200).json(medico);
  } catch (error: any) {
    console.error("Error al obtener médico:", error);
    res
      .status(500)
      .json({ mensaje: "Error al obtener médico.", error: error.message });
  }
};

export const ctlCrearMedico = async (
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
      email,
    } = req.body;

    const medicoData = {
      Nombre: nombre,
      Apellido: apellido,
      EspecialidadID: especialidadID,
      Interno: interno,
      HonorariosConsulta: honorariosConsulta,
      HonorariosCirugia: honorariosCirugia,
      Email: email,
    };

    await crearMedico(medicoData);

    res.status(201).json({ mensaje: "Médico creado exitosamente." });
  } catch (error: any) {
    console.error("Error al crear médico:", error);
    res
      .status(500)
      .json({ mensaje: "Error al crear médico.", error: error.message });
  }
};

export const ctlObtenerHonorarios = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const honorarios = await obtenerHonorariosMedicos();

    res.status(200).json(honorarios);
  } catch (error: any) {
    console.error("Error al obtener honorarios médicos:", error);

    res.status(500).json({
      error: "Ocurrió un error al obtener los honorarios médicos.",
      details: error.message || "Error desconocido",
    });
  }
};

export const ctlGetEspecialidades = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const honorarios = await getEspecialidadesMedico();

    res.status(200).json(honorarios);
  } catch (error: any) {
    console.error("Error al obtener especialdiades de los médicos:", error);

    res.status(500).json({
      error: "Ocurrió un error al obtener las especialidades de los médicos.",
      details: error.message || "Error desconocido",
    });
  }
};
