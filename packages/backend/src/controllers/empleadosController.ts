import { Request, Response } from "express";
import { obtenerEmpleados, insertarEmpleado } from "../database/empleados";

export const ctlObtenerEmpleados = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const empleados = await obtenerEmpleados();
    res.status(200).json(empleados);
  } catch (error) {
    console.error("Error al obtener empleados:", error);
    res.status(500).json(`Error: ${error}`);
  }
};

export const ctlInsertarEmpleado = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      nombre,
      apellido,
      puestoID,
      fechaContratacion,
      direccionID,
      telefono,
      email,
      salario,
    } = req.body;
    await insertarEmpleado(
      nombre,
      apellido,
      puestoID,
      fechaContratacion,
      direccionID,
      telefono,
      email,
      salario
    );
    res.status(201).json({ mensaje: "Empleado insertado correctamente" });
  } catch (error) {
    console.error("Error al insertar empleado:", error);
    res.status(500).json(`Error: ${error}`);
  }
};
