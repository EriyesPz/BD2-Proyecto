import { generarTokenAcceso, generarRefreshToken } from "./token";
import { getUsuarioEmail, actualizarUserToken } from "../database/usuarios";
import { UsuarioAutenticado, RespuestaLogin } from "./types";

export const login = async (correo: string, contrasena: string): Promise<RespuestaLogin> => {
  if (!correo || !contrasena) {
    throw new Error("Correo y contraseña son obligatorios.");
  }

  const usuario = await getUsuarioEmail(correo);
  if (!usuario) {
    throw new Error("Usuario no encontrado.");
  }

  if (usuario.Contrasenia !== contrasena) {
    throw new Error("Contraseña incorrecta.");
  }

  const tokenAcceso = generarTokenAcceso(usuario.UUID);
  const tokenRefresco = generarRefreshToken(usuario.UUID);

  const fechaToken = new Date();
  await actualizarUserToken(usuario.UUID, tokenAcceso, fechaToken);

  const usuarioAutenticado: UsuarioAutenticado = {
    UUID: usuario.UUID,
    Nombre: usuario.Nombre,
    Email: usuario.Email,
    Rol: usuario.Rol,
  };

  return {
    tokenAcceso,
    tokenRefresco,
    usuario: usuarioAutenticado,
  };
};
