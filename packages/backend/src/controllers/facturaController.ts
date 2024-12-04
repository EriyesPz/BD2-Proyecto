import { Request, Response } from "express";
import {
  obtenerFacturas,
  insertarFactura,
  insertarPago,
  generarFacturaHospitalizacion,
  obtenerTotalPagado,
  obtenerFacturaPorID,
} from "../database/facturas";

export const ctlObtenerFacturas = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const facturas = await obtenerFacturas();
    res.status(200).json(facturas);
  } catch (error) {
    console.error("Error al obtener facturas:", error);
    res.status(500).json(`Error: ${error}`);
  }
};

export const ctlObtenerFacturaPorID = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { paciente } = req.params;

    if (!paciente) {
      res.status(400).json({
        mensaje: "Debe proporcionar un nombre de paciente válido en los parámetros de la ruta.",
      });
      return;
    }

    const factura = await obtenerFacturaPorID(paciente);

    if (!factura) {
      res.status(404).json({
        mensaje: "No se encontró una factura para el paciente proporcionado.",
      });
      return;
    }

    res.status(200).json(factura);
  } catch (error) {
    console.error("Error al obtener la factura por nombre de paciente:", error);
    res.status(500).json({
      mensaje: `Error al obtener la factura: ${
        error instanceof Error ? error.message : error
      }`,
    });
  }
};


export const ctlInsertarFactura = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { pacienteID, fechaFactura, totalFactura, estadoPago, detalles } =
      req.body;
    await insertarFactura(
      pacienteID,
      fechaFactura,
      totalFactura,
      estadoPago,
      detalles
    );
    res.status(201).json({ mensaje: "Factura insertada correctamente" });
  } catch (error) {
    console.error("Error al insertar factura:", error);
    res.status(500).json(`Error: ${error}`);
  }
};

export const ctlInsertarPago = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { facturaID, fechaPago, montoPagado, metodoPago } = req.body;
    await insertarPago(facturaID, fechaPago, montoPagado, metodoPago);
    res.status(201).json({ mensaje: "Pago insertado correctamente" });
  } catch (error) {
    console.error("Error al insertar pago:", error);
    res.status(500).json(`Error: ${error}`);
  }
};

export const ctlGenerarFacturaHospitalizacion = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { hospitalizacionID } = req.body;
    await generarFacturaHospitalizacion(hospitalizacionID);
    res.status(201).json({ mensaje: "Factura generada correctamente" });
  } catch (error) {
    console.error("Error al generar factura de hospitalización:", error);
    res.status(500).json(`Error: ${error}`);
  }
};

export const ctlObtenerTotalPagado = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { facturaID } = req.params;

    if (!facturaID) {
      res.status(400).json({
        mensaje: "Debe proporcionar 'facturaID' en los parámetros de la ruta.",
      });
      return;
    }

    const totalPagado = await obtenerTotalPagado(parseInt(facturaID));
    res.status(200).json({ totalPagado });
  } catch (error) {
    console.error("Error al obtener total pagado de la factura:", error);
    res.status(500).json(`Error: ${error}`);
  }
};
