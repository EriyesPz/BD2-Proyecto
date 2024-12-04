import { Request, Response } from "express";
import {
  obtenerResultadosLaboratorio,
  insertarResultadoLaboratorio,
  obtenerResultadosLaboratorioPorID,
} from "../database/resultadosLaboratorio";

export const ctlObtenerResultadosLaboratorio = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const resultados = await obtenerResultadosLaboratorio();
    res.status(200).json(resultados);
  } catch (error) {
    console.error("Error al obtener resultados de laboratorio:", error);
    res.status(500).json(`Error: ${error}`);
  }
};

export const ctlInsertarResultadoLaboratorio = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { examenID, pacienteID, fechaExamen, resultados, observaciones } =
      req.body;
    await insertarResultadoLaboratorio(
      examenID,
      pacienteID,
      fechaExamen,
      resultados,
      observaciones
    );
    res
      .status(201)
      .json({ mensaje: "Resultado de laboratorio insertado correctamente" });
  } catch (error) {
    console.error("Error al insertar resultado de laboratorio:", error);
    res.status(500).json(`Error: ${error}`);
  }
};

export const ctlObtenerResultadosLaboratorioPorID = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { resultadoID } = req.params;

    if (!resultadoID) {
      res
        .status(400)
        .json({
          mensaje:
            "Debe proporcionar 'resultadoID' en los parámetros de la ruta.",
        });
      return;
    }

    const resultados = await obtenerResultadosLaboratorioPorID(
      parseInt(resultadoID)
    );
    res.status(200).json({ resultados });
  } catch (error) {
    console.error("Error al obtener resultados de laboratorio:", error);
    res.status(500).json(`Error: ${error}`);
  }
};
