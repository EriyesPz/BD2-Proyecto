import { Request, Response } from "express";
import { getMedicamentos } from "../database/farmacia";

export const ctlGetMedicamentos = async (req: Request, res: Response) => {
  try {
    const medicamentos = await getMedicamentos();
    res.status(200).json(medicamentos);
  } catch (error: any) {
    console.error("Error en ctlGetMedicamentos:", error);
    res.status(500).json({
      mensaje: "Error al obtener los medicamentos.",
      error: error.message || "Error interno del servidor.",
    });
  }
};
