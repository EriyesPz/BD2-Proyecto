export {
  ctlInsertarConsultaMedica,
  ctlObtenerConsultasMedicas,
} from "./consultasMedicasController";
export {
  ctlGenerarFacturaHospitalizacion,
  ctlInsertarFactura,
  ctlInsertarPago,
  ctlObtenerFacturas,
  ctlObtenerTotalPagado
} from "./facturaController";
export { ctlInsertarUsuario, ctlUsuarios } from "./controllerUsuarios";
export {
  ctlInsertarDireccion,
  ctlObtenerDirecciones,
} from "./direccionesController";
export {
  ctlInsertarEmpleado,
  ctlObtenerEmpleados,
} from "./empleadosController";
export {
  ctlInsertarEspecialidad,
  ctlObtenerEspecialidades,
} from "./especialidadesController";
export { ctlInsertarExamen, ctlObtenerExamenes } from "./examenesController";
export {
  ctlInsertarTipoHabitacion,
  ctlObtenerTiposHabitacion,
} from "./habitacionController";
export {
  ctlInsertarHabitacion,
  ctlObtenerHabitaciones,
} from "./habitacionesController";
export {
  ctlDarAltaHospitalizacion,
  ctlObtenerHospitalizaciones,
  ctlRegistrarHospitalizacion,
  ctlObtenerCostoEstancia
} from "./hospitalizacionesController";
export {
  ctlInsertarMedicamento,
  ctlObtenerMedicamentos,
  ctlObtenerStockMedicamentos,
  ctlVerificarStockMedicamento
} from "./medicamentosController";
export { ctlInsertarMedico, ctlObtenerMedicos, ctlObtenerHonorariosMedicos,  ctlObtenerResumenMedicosConsultas } from "./medicosController";
export {
  ctlInsertarPaciente,
  ctlObtenerPacientes,
  ctlCalcularEdadPaciente,
  ctlObtenerResumenPacientesHospitalizaciones,
  ctlObtenerPacientePorID
} from "./pacientesController";
export {
  ctlInsertarPacienteSeguro,
  ctlObtenerPacientesSeguros,
} from "./pacientesSegurosController";
export {
  ctlInsertarProveedor,
  ctlObtenerProveedores,
} from "./proveedoresController";
export { ctlInsertarPuesto, ctlObtenerPuestos } from "./puestosController";
export {
  ctlInsertarResultadoLaboratorio,
  ctlObtenerResultadosLaboratorio,
  ctlObtenerResultadosLaboratorioPorID
} from "./resultadoLaboratorioController";
export {
  ctlInsertarSeguroMedico,
  ctlObtenerSegurosMedicos,
} from "./segurosController";
