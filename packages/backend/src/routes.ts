// router.ts
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

router.post("/login", ctlAuth);

router.get("/usuarios", ctlUsuarios);
router.post("/usuarios", ctlInsertarUsuario);

router.get("/direcciones", ctlObtenerDirecciones);
router.post("/direcciones", ctlInsertarDireccion);

router.get("/especialidades", ctlObtenerEspecialidades);
router.post("/especialidades", ctlInsertarEspecialidad);

router.get("/seguros-medicos", ctlObtenerSegurosMedicos);
router.post("/seguros-medicos", ctlInsertarSeguroMedico);

router.get("/puestos", ctlObtenerPuestos);
router.post("/puestos", ctlInsertarPuesto);

router.get("/tipos-habitacion", ctlObtenerTiposHabitacion);
router.post("/tipos-habitacion", ctlInsertarTipoHabitacion);

router.get("/proveedores", ctlObtenerProveedores);
router.post("/proveedores", ctlInsertarProveedor);

router.get("/examenes", ctlObtenerExamenes);
router.post("/examenes", ctlInsertarExamen);

router.get("/medicos", ctlObtenerMedicos);
router.post("/medicos", ctlInsertarMedico);

router.get("/pacientes", ctlObtenerPacientes);
router.post("/pacientes", ctlInsertarPaciente);

router.get("/empleados", ctlObtenerEmpleados);
router.post("/empleados", ctlInsertarEmpleado);

router.get("/medicamentos", ctlObtenerMedicamentos);
router.post("/medicamentos", ctlInsertarMedicamento);

router.get("/habitaciones", ctlObtenerHabitaciones);
router.post("/habitaciones", ctlInsertarHabitacion);

router.get("/pacientes-seguros", ctlObtenerPacientesSeguros);
router.post("/pacientes-seguros", ctlInsertarPacienteSeguro);

router.get("/hospitalizaciones", ctlObtenerHospitalizaciones);
router.post("/hospitalizaciones", ctlRegistrarHospitalizacion);
router.post("/hospitalizaciones/alta", ctlDarAltaHospitalizacion);

router.get("/consultas-medicas", ctlObtenerConsultasMedicas);
router.post("/consultas-medicas", ctlInsertarConsultaMedica);

router.get("/resultados-laboratorio", ctlObtenerResultadosLaboratorio);
router.post("/resultados-laboratorio", ctlInsertarResultadoLaboratorio);

router.get("/facturas", ctlObtenerFacturas);
router.post("/facturas", ctlInsertarFactura);

router.post("/pagos", ctlInsertarPago);

router.post("/facturas/generar-hospitalizacion", ctlGenerarFacturaHospitalizacion);

export { router };
