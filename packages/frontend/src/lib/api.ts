export { getConsultasMedicas, insertarConsultaMedica } from "./consultasMedicas";
export { getDirecciones, insertarDireccion } from "./direcciones";
export { getEmpleados, insertarEmpleado } from "./empleados";
export { getEspecialidades, insertarEspecialidad } from "./especialidades";
export { getExamenes, insertarExamen } from "./examenes";
export { generarFacturaHospitalizacion, getFacturas, insertarFactura, insertarPago, obtenerTotalPagado } from "./factura";
export { getHabitaciones, getTiposHabitacion, insertarHabitacion, insertarTipoHabitacion } from "./habitacion";
export { darAltaHospitalizacion, getHospitalizaciones, obtenerCostoEstancia, registrarHospitalizacion } from "./hospitalizaciones";
export { getMedicamentos, getStockMedicamentos, insertarMedicamento, verificarStockMedicamento } from "./medicamentos";
export { getHonorariosMedicos, getMedicos, getResumenMedicosConsultas, insertarMedico, getMedicoPorID } from "./medicos"
export { calcularEdadPaciente, getPacientes, getResumenPacientesHospitalizaciones, insertarPaciente, getPacientePorID } from "./pacientes";
export { getPacientesSeguros, insertarPacienteSeguro } from "./pacientesSeguros";
export { getResultadosLaboratorio, getResultadosLaboratorioPorID, insertarResultadoLaboratorio } from "./resultadoLaboratorio";
export { getSegurosMedicos, insertarSeguroMedico } from "./seguros";
export { getUsuarios, insertarUsuario } from "./usuarios";