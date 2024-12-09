export {
  registrarExamenMedico,
  registrarVisitaMedica,
  getConsultas,
} from "./apiConsultas";
export {
  crearConsultorio,
  obtenerConsultorio,
  obtenerConsultorios,
} from "./apiConsultorio";
export { obtenerFacturas, getFactura } from "./apiFacturacion";
export {
  crearHospitalizacion,
  crearHospitalizacionConFactura,
  darAltaHospitalizacion,
  obtenerHospitalizacion,
  obtenerHospitalizaciones,
  getHospitalizacionesDetalles,
} from "./apiHospitalizacion";
export {
  obtenerHabitacionesDisponibles,
  obtenerHonorariosMedicos,
  registrarAlimentoSuministrado,
  registrarMedicamentoAplicado,
  obtenerHabitaciones,
} from "./apiInventario";
export {
  crearMedico,
  obtenerMedico,
  obtenerMedicos,
  getEspecialidades,
} from "./apiMedicos";
export {
  crearPaciente,
  obtenerPaciente,
  obtenerPacientes,
} from "./apiPaciente";
export { pagarFactura } from "./apiPagos";
export {getMedicamentos} from "./apiFarmacia";