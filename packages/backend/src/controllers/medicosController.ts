import { Request, Response } from "express";
import {
  obtenerMedicos,
  insertarMedico,
  obtenerResumenMedicosConsultas,
  obtenerHonorariosMedicos,
  obtenerMedicoPorID,
} from "../database/medicos";

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

export const ctlObtenerMedicoPorID = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const medico = await obtenerMedicoPorID(Number(id));

    if (!medico) {
      res
        .status(404)
        .json({ mensaje: `No se encontró un médico con el ID ${id}` });
      return;
    }

    res.status(200).json(medico);
  } catch (error) {
    console.error("Error al obtener médico por ID:", error);
    res
      .status(500)
      .json({ mensaje: "Error al obtener médico por ID", error: error });
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

export const ctlObtenerResumenMedicosConsultas = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const resumen = await obtenerResumenMedicosConsultas();
    res.status(200).json(resumen);
  } catch (error) {
    console.error("Error al obtener resumen de médicos y consultas:", error);
    res.status(500).json(`Error: ${error}`);
  }
};

export const ctlObtenerHonorariosMedicos = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { fechaInicio, fechaFin } = req.query;

    if (!fechaInicio || !fechaFin) {
      res.status(400).json({
        mensaje:
          "Debe proporcionar 'fechaInicio' y 'fechaFin' en los parámetros de consulta.",
      });
      return;
    }

    const honorarios = await obtenerHonorariosMedicos(
      fechaInicio as string,
      fechaFin as string
    );
    res.status(200).json(honorarios);
  } catch (error) {
    console.error("Error al obtener honorarios de médicos:", error);
    res.status(500).json(`Error: ${error}`);
  }
};
