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
router.post("/usuario", ctlInsertarUsuario);

router.get("/direcciones", ctlObtenerDirecciones);
router.post("/direccion", ctlInsertarDireccion);

router.get("/especialidades", ctlObtenerEspecialidades);
router.post("/especialidad", ctlInsertarEspecialidad);

router.get("/seguros-medicos", ctlObtenerSegurosMedicos);
router.post("/seguro-medico", ctlInsertarSeguroMedico);

router.get("/puestos", ctlObtenerPuestos);
router.post("/puesto", ctlInsertarPuesto);

router.get("/tipos-habitacion", ctlObtenerTiposHabitacion);
router.post("/tipo-habitacion", ctlInsertarTipoHabitacion);

router.get("/proveedores", ctlObtenerProveedores);
router.post("/proveedor", ctlInsertarProveedor);

router.get("/examenes", ctlObtenerExamenes);
router.post("/examen", ctlInsertarExamen);

router.get("/medicos", ctlObtenerMedicos);
router.post("/medico", ctlInsertarMedico);

router.get("/pacientes", ctlObtenerPacientes);
router.post("/paciente", ctlInsertarPaciente);

router.get("/empleados", ctlObtenerEmpleados);
router.post("/empleado", ctlInsertarEmpleado);

router.get("/medicamentos", ctlObtenerMedicamentos);
router.post("/medicamento", ctlInsertarMedicamento);

router.get("/habitaciones", ctlObtenerHabitaciones);
router.post("/habitacion", ctlInsertarHabitacion);

router.get("/pacientes-seguros", ctlObtenerPacientesSeguros);
router.post("/paciente-seguro", ctlInsertarPacienteSeguro);

router.get("/hospitalizaciones", ctlObtenerHospitalizaciones);
router.post("/hospitalizacion", ctlRegistrarHospitalizacion);
router.post("/hospitalizaciones/alta", ctlDarAltaHospitalizacion);

router.get("/consultas-medicas", ctlObtenerConsultasMedicas);
router.post("/consulta-medica", ctlInsertarConsultaMedica);

router.get("/resultados-laboratorio", ctlObtenerResultadosLaboratorio);
router.post("/resultado-laboratorio", ctlInsertarResultadoLaboratorio);

router.get("/facturas", ctlObtenerFacturas);
router.post("/factura", ctlInsertarFactura);

router.post("/pagos", ctlInsertarPago);

router.post(
  "/facturas/generar-hospitalizacion",
  ctlGenerarFacturaHospitalizacion
);

export { router };
