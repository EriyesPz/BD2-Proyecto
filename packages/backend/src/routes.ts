import { Router } from "express";
import { ctlAuth } from "./controllers/controllerAuth";
import {
  ctlDarAltaHospitalizacion,
  ctlGenerarFacturaHospitalizacion,
  ctlInsertarConsultaMedica,
  ctlInsertarDireccion,
  ctlInsertarEmpleado,
  ctlInsertarEspecialidad,
  ctlInsertarExamen,
  ctlInsertarFactura,
  ctlInsertarHabitacion,
  ctlInsertarMedicamento,
  ctlInsertarMedico,
  ctlInsertarPaciente,
  ctlInsertarPacienteSeguro,
  ctlInsertarPago,
  ctlInsertarProveedor,
  ctlInsertarPuesto,
  ctlInsertarResultadoLaboratorio,
  ctlInsertarSeguroMedico,
  ctlInsertarTipoHabitacion,
  ctlInsertarUsuario,
  ctlObtenerConsultasMedicas,
  ctlObtenerDirecciones,
  ctlObtenerEmpleados,
  ctlObtenerEspecialidades,
  ctlObtenerExamenes,
  ctlObtenerFacturas,
  ctlObtenerHabitaciones,
  ctlObtenerHospitalizaciones,
  ctlObtenerMedicamentos,
  ctlObtenerMedicos,
  ctlObtenerPacientes,
  ctlObtenerPacientesSeguros,
  ctlObtenerProveedores,
  ctlObtenerPuestos,
  ctlObtenerResultadosLaboratorio,
  ctlObtenerSegurosMedicos,
  ctlObtenerTiposHabitacion,
  ctlRegistrarHospitalizacion,
  ctlUsuarios,
} from "./controllers";

const router = Router();

router.get("/usuarios", ctlUsuarios);
router.post("/login", ctlAuth);

export { router };
