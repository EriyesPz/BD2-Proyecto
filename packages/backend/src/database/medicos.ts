import { dbConexion } from "./conexion";
import sql from "mssql";

export const obtenerMedicos = async () => {
  try {
    const pool = await dbConexion();
    const consulta = `
      SELECT 
        m.MedicoID,
        m.Nombre,
        m.Apellido,
        m.EspecialidadID,
        e.NombreEspecialidad,
        e.Descripcion AS DescripcionEspecialidad,
        m.Interno,
        m.HonorariosConsulta,
        m.HonorariosCirugia,
        m.DireccionID,
        d.Calle,
        d.Ciudad,
        d.Estado,
        d.CodigoPostal,
        d.Pais,
        m.Telefono,
        m.Email,
        m.FechaRegistro
      FROM Medico.Medicos AS m
      INNER JOIN Medico.Especialidades AS e
        ON m.EspecialidadID = e.EspecialidadID
      LEFT JOIN dbo.Direcciones AS d
        ON m.DireccionID = d.DireccionID;
    `;
    const resultado = await pool.request().query(consulta);
    return resultado.recordset;
  } catch (error) {
    throw new Error(`Error al obtener médicos: ${error}`);
  }
};

export const obtenerMedicoPorID = async (medicoID: number) => {
  try {
    const pool = await dbConexion();
    const consulta = `
      SELECT 
        m.MedicoID,
        m.Nombre,
        m.Apellido,
        m.EspecialidadID,
        e.NombreEspecialidad,
        e.Descripcion AS DescripcionEspecialidad,
        m.Interno,
        m.HonorariosConsulta,
        m.HonorariosCirugia,
        m.DireccionID,
        d.Calle,
        d.Ciudad,
        d.Estado,
        d.CodigoPostal,
        d.Pais,
        m.Telefono,
        m.Email,
        m.FechaRegistro
      FROM Medico.Medicos AS m
      INNER JOIN Medico.Especialidades AS e
        ON m.EspecialidadID = e.EspecialidadID
      LEFT JOIN dbo.Direcciones AS d
        ON m.DireccionID = d.DireccionID
      WHERE m.MedicoID = @MedicoID;
    `;
    const resultado = await pool.request()
      .input("MedicoID", sql.Int, medicoID)
      .query(consulta);
    
    if (resultado.recordset.length === 0) {
      throw new Error(`No se encontró un médico con el ID ${medicoID}`);
    }

    return resultado.recordset[0];
  } catch (error) {
    throw new Error(`Error al obtener médico por ID: ${error}`);
  }
};

export const insertarMedico = async (
  nombre: string,
  apellido: string,
  especialidadID: number,
  interno: boolean,
  honorariosConsulta: number,
  honorariosCirugia: number | null,
  direccionID: number,
  telefono: string,
  email: string
) => {
  try {
    const pool = await dbConexion();
    const consulta = `
      INSERT INTO Medico.Medicos
      (Nombre, Apellido, EspecialidadID, Interno, HonorariosConsulta, HonorariosCirugia, DireccionID, Telefono, Email)
      VALUES (@Nombre, @Apellido, @EspecialidadID, @Interno, @HonorariosConsulta, @HonorariosCirugia, @DireccionID, @Telefono, @Email);
    `;
    await pool
      .request()
      .input("Nombre", sql.VarChar(50), nombre)
      .input("Apellido", sql.VarChar(50), apellido)
      .input("EspecialidadID", sql.Int, especialidadID)
      .input("Interno", sql.Bit, interno)
      .input("HonorariosConsulta", sql.Decimal(10, 2), honorariosConsulta)
      .input("HonorariosCirugia", sql.Decimal(10, 2), honorariosCirugia)
      .input("DireccionID", sql.Int, direccionID)
      .input("Telefono", sql.VarChar(20), telefono)
      .input("Email", sql.VarChar(100), email)
      .query(consulta);
    return { mensaje: "Médico insertado correctamente" };
  } catch (error) {
    throw new Error(`Error al insertar médico: ${error}`);
  }
};

export const obtenerResumenMedicosConsultas = async () => {
  try {
    const pool = await dbConexion();
    const consulta = `
      SELECT 
        MedicoID,
        NombreCompleto,
        NombreEspecialidad,
        NumeroConsultas,
        TotalPrescripciones
      FROM Medico.vw_MedicosConsultas;
    `;
    const resultado = await pool.request().query(consulta);
    return resultado.recordset;
  } catch (error) {
    throw new Error(
      `Error al obtener resumen de médicos y consultas: ${error}`
    );
  }
};

export const obtenerHonorariosMedicos = async (
  fechaInicio: string,
  fechaFin: string
) => {
  try {
    const pool = await dbConexion();
    const consulta = `
      SELECT * FROM Medico.fn_HonorariosMedicos(@FechaInicio, @FechaFin);
    `;
    const resultado = await pool
      .request()
      .input("FechaInicio", sql.DateTime2, fechaInicio)
      .input("FechaFin", sql.DateTime2, fechaFin)
      .query(consulta);
    return resultado.recordset;
  } catch (error) {
    throw new Error(`Error al obtener honorarios de médicos: ${error}`);
  }
};
