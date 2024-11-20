export interface Usuario {
  UUID: string;
  ID_Empleado: string | null;
  Nombre: string;
  Email: string;
  Usuario: string | null;
  Rol: string;
  Contrasenia: string;
  Token: string | null;
  FechaToken: Date | null;
  FechaCreacion: Date;
  FechaActualizacion: Date;
}

export interface UsuarioAutenticado {
  UUID: string;
  Nombre: string;
  Email: string;
  Rol: string;
}

export interface CargaUtilJWT {
  idUsuario: string;
}

export interface RespuestaLogin {
  tokenAcceso: string;
  tokenRefresco: string;
  usuario: UsuarioAutenticado;
}
