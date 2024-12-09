import { Request, Response } from "express";
import {
  crearHospitalizacionConFactura,
  darAltaHospitalizacion,
  pagarFactura,
  getFacturas,
  getFactura
} from "../database/facturacion";

export const ctlCrearHospitalizacionConFactura = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      pacienteID,
      habitacionID,
      fechaIngreso,
      diagnostico,
      totalFactura,
    } = req.body;

    if (
      !pacienteID ||
      !habitacionID ||
      !fechaIngreso ||
      !diagnostico ||
      totalFactura == null
    ) {
      res.status(400).json({
        mensaje:
          "Todos los campos son obligatorios: pacienteID, habitacionID, fechaIngreso, diagnostico, totalFactura.",
      });
      return;
    }

    const facturaData = {
      PacienteID: pacienteID,
      HabitacionID: habitacionID,
      FechaIngreso: fechaIngreso,
      Diagnostico: diagnostico,
      TotalFactura: totalFactura,
    };

    await crearHospitalizacionConFactura(facturaData);

    res
      .status(201)
      .json({ mensaje: "Hospitalización con factura creada exitosamente." });
  } catch (error: any) {
    console.error("Error al crear hospitalización con factura:", error);
    res.status(500).json({
      mensaje: "Error al crear hospitalización con factura.",
      error: error.message,
    });
  }
};

export const ctlDarAltaHospitalizacion = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { hospitalizacionID, fechaAlta, gastos } = req.body;

    if (!hospitalizacionID || !fechaAlta || gastos == null) {
      res.status(400).json({
        mensaje:
          "Todos los campos son obligatorios: hospitalizacionID, fechaAlta, gastos.",
      });
      return;
    }

    const altaData = {
      HospitalizacionID: hospitalizacionID,
      FechaAlta: fechaAlta,
      Gastos: gastos,
    };

    await darAltaHospitalizacion(altaData);

    res
      .status(200)
      .json({ mensaje: "Hospitalización dada de alta exitosamente." });
  } catch (error: any) {
    console.error("Error al dar alta hospitalización:", error);
    res.status(500).json({
      mensaje: "Error al dar alta hospitalización.",
      error: error.message,
    });
  }
};

export const ctlPagarFactura = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { facturaID, montoPagado, metodoPago } = req.body;

    if (!facturaID || montoPagado == null || !metodoPago) {
      res.status(400).json({
        mensaje:
          "Todos los campos son obligatorios: facturaID, montoPagado, metodoPago.",
      });
      return;
    }

    const pagoData = {
      FacturaID: facturaID,
      MontoPagado: montoPagado,
      MetodoPago: metodoPago,
    };

    await pagarFactura(pagoData);

    res.status(200).json({ mensaje: "Factura pagada exitosamente." });
  } catch (error: any) {
    console.error("Error al pagar factura:", error);
    res.status(500).json({
      mensaje: "Error al procesar el pago de la factura.",
      error: error.message,
    });
  }
};

export const ctlGetFacturas = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const facturas = await getFacturas();

    res.status(200).json(facturas);
  } catch (error: any) {
    console.error("Error al obtener las facturas:", error);
    res
      .status(500)
      .json({ mensaje: "Error al obtener facturas", error: error.message });
  }
};

export const ctlGetFactura = async (req: Request, res: Response): Promise<void> => {
  try {
    const { facturaID } = req.params;
    if (!facturaID) {
      res.status(400).json({ mensaje: "Se requiere facturaID en la URL." });
    }
    const factura = await getFactura(facturaID);
    if (!factura) {
      res.status(404).json({ mensaje: "Factura no encontrada." });
    }
    res.status(200).json(factura);
  } catch (error: any) {
    console.error("Error al obtener la factura:", error);
    res.status(500).json({ mensaje: "Error al obtener la factura", error: error.message });
  }
};