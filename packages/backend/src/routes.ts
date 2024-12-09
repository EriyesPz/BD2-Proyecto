import { Router } from "express";
import {
  ctlGetPacientes,
  ctlGetPaciente,
  ctlCrearPaciente,
  ctlGetMedicos,
  ctlCrearMedico,
  ctlGetMedico,
  ctlGetHospitalizaciones,
  ctlGetHospitalizacion,
  ctlCrearHospitalizacion,
  ctlGetConsultorios,
  ctlGetConsultorio,
  ctlCrearConsultorio,
  ctlCrearHospitalizacionConFactura,
  ctlDarAltaHospitalizacion,
  ctlPagarFactura,
  ctlGetFacturas,
  ctlRegistrarMedicamentoAplicado,
  ctlRegistrarAlimento,
  ctlRegistrarVisita,
  ctlObtenerHabitaciones,
  ctlObtenerHonorarios,
  ctlGetEspecialidades,
  ctlHospitazacionesDetalles,
  ctlGetFactura,
  ctlGetTodasHabitaciones,
  ctlGetConsultas,
  ctlGetMedicamentos
} from "./controllers";

const router = Router();

router.get("/pacientes", ctlGetPacientes);
router.get("/paciente/:pacienteID", ctlGetPaciente);
router.post("/paciente", ctlCrearPaciente);

router.get("/medicos", ctlGetMedicos);
router.get("/medico/:medicoID", ctlGetMedico);
router.post("/medico", ctlCrearMedico)

router.get('/hospitalizaciones', ctlGetHospitalizaciones);
router.get('/hospitalizacion/:hospitalizacionID', ctlGetHospitalizacion);
router.post('/hospitalizacion', ctlCrearHospitalizacion);

router.get("/consultorios", ctlGetConsultorios);
router.get("/consultorio/:consultorioID", ctlGetConsultorio);
router.post("/consultorio", ctlCrearConsultorio);

router.post("/hospitalizaciones/factura", ctlCrearHospitalizacionConFactura);
router.post("/hospitalizaciones/dar-alta", ctlDarAltaHospitalizacion);
router.get("/hospitalizaciones-detalles", ctlHospitazacionesDetalles)

router.post("/facturas/pagar", ctlPagarFactura);

router.get("/facturas", ctlGetFacturas);
router.get("/factura/:facturaID", ctlGetFactura);

router.post("/medicamento-aplicado", ctlRegistrarMedicamentoAplicado)

router.post("/registrar-alimento", ctlRegistrarAlimento);

router.get("/consultas", ctlGetConsultas);

router.post("/registrar-visita", ctlRegistrarVisita);

router.get("/habitaciones", ctlObtenerHabitaciones);
router.get("/habitaciones-all", ctlGetTodasHabitaciones);

router.get("/honorarios", ctlObtenerHonorarios);

router.get("/especialidades", ctlGetEspecialidades)

router.get("/medicamentos", ctlGetMedicamentos)

export { router };
