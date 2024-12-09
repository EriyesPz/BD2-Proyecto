export {
  ctlGetPacientes,
  ctlGetPaciente,
  ctlCrearPaciente,
} from "./controllerPaciente";
export {
  ctlGetMedicos,
  ctlCrearMedico,
  ctlGetMedico,
  ctlObtenerHonorarios,
  ctlGetEspecialidades,
} from "./controllerMedico";
export {
  ctlGetHospitalizaciones,
  ctlGetHospitalizacion,
  ctlCrearHospitalizacion,
  ctlObtenerHabitaciones,
  ctlHospitazacionesDetalles,
  ctlGetTodasHabitaciones
} from "./controllerHospitalizacion";
export {
  ctlGetConsultorios,
  ctlGetConsultorio,
  ctlCrearConsultorio,
} from "./controllerConsultorio";
export {
  ctlCrearHospitalizacionConFactura,
  ctlDarAltaHospitalizacion,
  ctlPagarFactura,
  ctlGetFacturas,
  ctlGetFactura
} from "./controllerFacturacion";
export {
  ctlRegistrarMedicamentoAplicado,
  ctlRegistrarAlimento,
} from "./controllerInventario";
export { ctlRegistrarVisita, ctlGetConsultas } from "./controllerConsultas";
export { ctlGetMedicamentos } from "./controllerFarmacia";
