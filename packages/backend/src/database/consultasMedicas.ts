import { dbConexion } from "./conexion";
import sql from "mssql";

export const obtenerConsultasMedicas = async () => {
  try {
    const pool = await dbConexion();
    const consulta = `
      SELECT * FROM Medico.Consultas;
    `;
    const resultado = await pool.request().query(consulta);
    return resultado.recordset;
  } catch (error) {
    throw new Error(`Error al obtener consultas médicas: ${error}`);
  }
};

export const insertarConsultaMedica = async (
  pacienteID: number,
  medicoID: number,
  fechaConsulta: Date,
  motivoConsulta: string,
  diagnostico: string,
  prescripcion: string | null
) => {
  try {
    const pool = await dbConexion();
    const consulta = `
      INSERT INTO Medico.Consultas
      (PacienteID, MedicoID, FechaConsulta, MotivoConsulta, Diagnostico, Prescripcion)
      VALUES (@PacienteID, @MedicoID, @FechaConsulta, @MotivoConsulta, @Diagnostico, @Prescripcion);
    `;
    await pool
      .request()
      .input("PacienteID", sql.Int, pacienteID)
      .input("MedicoID", sql.Int, medicoID)
      .input("FechaConsulta", sql.DateTime2, fechaConsulta)
      .input("MotivoConsulta", sql.Text, motivoConsulta)
      .input("Diagnostico", sql.Text, diagnostico)
      .input("Prescripcion", sql.Xml, prescripcion)
      .query(consulta);
    return { mensaje: "Consulta médica insertada correctamente" };
  } catch (error) {
    throw new Error(`Error al insertar consulta médica: ${error}`);
  }
};
