import { Request, Response } from "express";
import {
  registrarMedicamentoAplicado,
  registrarAlimentoSuministrado,
} from "../database/inventario";

export const ctlRegistrarMedicamentoAplicado = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { HospitalizacionID, MedicamentoID, Cantidad, FechaAplicacion } =
      req.body;

    if (!HospitalizacionID || !MedicamentoID || !Cantidad || !FechaAplicacion) {
      res.status(400).json({
        mensaje:
          "Todos los campos son obligatorios: HospitalizacionID, MedicamentoID, Cantidad, FechaAplicacion.",
      });
      return;
    }

    await registrarMedicamentoAplicado({
      HospitalizacionID,
      MedicamentoID,
      Cantidad,
      FechaAplicacion,
    });

    res.status(201).json({
      mensaje: "Medicamento registrado exitosamente en la hospitalización.",
    });
  } catch (error: any) {
    console.error("Error al registrar medicamento aplicado:", error);
    res.status(500).json({
      mensaje: "Ocurrió un error al registrar el medicamento aplicado.",
      error: error.message,
    });
  }
};

export const ctlRegistrarAlimento = async (req: Request, res: Response): Promise<void> => {
    const { HospitalizacionID, AlimentoID, Cantidad, FechaServicio } = req.body;
  
    if (!HospitalizacionID || !AlimentoID || !Cantidad || !FechaServicio) {
      res.status(400).json({
        error: "Todos los campos (HospitalizacionID, AlimentoID, Cantidad, FechaServicio) son obligatorios.",
      });
    }
  
    try {
      await registrarAlimentoSuministrado({ HospitalizacionID, AlimentoID, Cantidad, FechaServicio });
      res.status(201).json({ message: "El alimento ha sido registrado correctamente." });
    } catch (error: any) {
      console.error("Error al registrar el alimento suministrado:", error);
      res.status(500).json({
        error: "Ocurrió un error al registrar el alimento suministrado. Por favor, intente de nuevo.",
        details: error.message || "Error desconocido",
      });
    }
  };
