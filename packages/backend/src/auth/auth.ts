import { Request, Response, NextFunction } from "express";
import { verificarTokenAcceso } from "./token";

export const autenticar = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.tokenAcceso;

  if (!token) {
    return res.status(401).json({
      exito: false,
      mensaje: "Falta el token de acceso. Por favor, inicie sesión.",
    });
  }

  const datos = verificarTokenAcceso(token);
  if (!datos) {
    return res.status(401).json({
      exito: false,
      mensaje: "Token de acceso inválido o caducado.",
    });
  }

  req.user = { userId: datos.userId };
  next();
};
