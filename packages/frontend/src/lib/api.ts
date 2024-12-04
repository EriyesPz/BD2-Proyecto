import { cliente } from "./cliente";

export const getUsuarios = async () => {
  try {
    const response = await cliente.get("usuarios");
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener usuarios: ${error}`);
  }
};

export const insertarUsuario = async (usuarioData: any) => {
  try {
    const response = await cliente.post("usuario", usuarioData);
    return response.data;
  } catch (error) {
    throw new Error(`Error al insertar usuario: ${error}`);
  }
};

export const getDirecciones = async () => {
  try {
    const response = await cliente.get("direcciones");
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener direcciones: ${error}`);
  }
};

// Insertar dirección
export const insertarDireccion = async (direccionData: any) => {
  try {
    const response = await cliente.post("direccion", direccionData);
    return response.data;
  } catch (error) {
    throw new Error(`Error al insertar dirección: ${error}`);
  }
};

export const getEspecialidades = async () => {
  try {
    const response = await cliente.get("especialidades");
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener especialidades: ${error}`);
  }
};

// Insertar especialidad
export const insertarEspecialidad = async (especialidadData: any) => {
  try {
    const response = await cliente.post("especialidad", especialidadData);
    return response.data;
  } catch (error) {
    throw new Error(`Error al insertar especialidad: ${error}`);
  }
};

export const getSegurosMedicos = async () => {
  try {
    const response = await cliente.get("seguros-medicos");
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener seguros médicos: ${error}`);
  }
};

// Insertar seguro médico
export const insertarSeguroMedico = async (seguroMedicoData: any) => {
  try {
    const response = await cliente.post("seguro-medico", seguroMedicoData);
    return response.data;
  } catch (error) {
    throw new Error(`Error al insertar seguro médico: ${error}`);
  }
};

export const getPuestos = async () => {
  try {
    const response = await cliente.get("puestos");
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener puestos: ${error}`);
  }
};

// Insertar puesto
export const insertarPuesto = async (puestoData: any) => {
  try {
    const response = await cliente.post("puesto", puestoData);
    return response.data;
  } catch (error) {
    throw new Error(`Error al insertar puesto: ${error}`);
  }
};

export const getTiposHabitacion = async () => {
  try {
    const response = await cliente.get("tipos-habitacion");
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener tipos de habitación: ${error}`);
  }
};

// Insertar tipo de habitación
export const insertarTipoHabitacion = async (tipoHabitacionData: any) => {
  try {
    const response = await cliente.post("tipo-habitacion", tipoHabitacionData);
    return response.data;
  } catch (error) {
    throw new Error(`Error al insertar tipo de habitación: ${error}`);
  }
};

export const getProveedores = async () => {
  try {
    const response = await cliente.get("proveedores");
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener proveedores: ${error}`);
  }
};

export const insertarProveedor = async (proveedorData: any) => {
  try {
    const response = await cliente.post("proveedor", proveedorData);
    return response.data;
  } catch (error) {
    throw new Error(`Error al insertar proveedor: ${error}`);
  }
};

export const getExamenes = async () => {
  try {
    const response = await cliente.get("examenes");
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener exámenes: ${error}`);
  }
};

export const insertarExamen = async (examenData: any) => {
  try {
    const response = await cliente.post("examen", examenData);
    return response.data;
  } catch (error) {
    throw new Error(`Error al insertar examen: ${error}`);
  }
};

export const getMedicos = async () => {
  try {
    const response = await cliente.get("medicos");
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener médicos: ${error}`);
  }
};

export const insertarMedico = async (medicoData: any) => {
  try {
    const response = await cliente.post("medico", medicoData);
    return response.data;
  } catch (error) {
    throw new Error(`Error al insertar médico: ${error}`);
  }
};

export const getPacientes = async () => {
  try {
    const response = await cliente.get("pacientes");
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener pacientes: ${error}`);
  }
};

export const insertarPaciente = async (pacienteData: any) => {
  try {
    const response = await cliente.post("paciente", pacienteData);
    return response.data;
  } catch (error) {
    throw new Error(`Error al insertar paciente: ${error}`);
  }
};

export const calcularEdadPaciente = async (fechaNacimiento: any) => {
  try {
    const response = await cliente.get("pacientes/calcular-edad", {
      params: { fechaNacimiento },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error al calcular edad del paciente: ${error}`);
  }
};

export const getResumenPacientesHospitalizaciones = async () => {
  try {
    const response = await cliente.get("pacientes/resumen-hospitalizaciones");
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener resumen de pacientes: ${error}`);
  }
};

export const getEmpleados = async () => {
  try {
    const response = await cliente.get("empleados");
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener empleados: ${error}`);
  }
};

export const insertarEmpleado = async (empleadoData: any) => {
  try {
    const response = await cliente.post("empleado", empleadoData);
    return response.data;
  } catch (error) {
    throw new Error(`Error al insertar empleado: ${error}`);
  }
};

export const getMedicamentos = async () => {
  try {
    const response = await cliente.get("medicamentos");
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener medicamentos: ${error}`);
  }
};

// Insertar medicamento
export const insertarMedicamento = async (medicamentoData: any) => {
  try {
    const response = await cliente.post("medicamento", medicamentoData);
    return response.data;
  } catch (error) {
    throw new Error(`Error al insertar medicamento: ${error}`);
  }
};

// Obtener stock de medicamentos
export const getStockMedicamentos = async () => {
  try {
    const response = await cliente.get("medicamentos/stock");
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener stock de medicamentos: ${error}`);
  }
};

// Verificar stock de un medicamento
export const verificarStockMedicamento = async (medicamentoID: any) => {
  try {
    const response = await cliente.get(
      `medicamentos/${medicamentoID}/verificar-stock`
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error al verificar stock del medicamento: ${error}`);
  }
};

export const getHabitaciones = async () => {
  try {
    const response = await cliente.get("habitaciones");
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener habitaciones: ${error}`);
  }
};

// Insertar habitación
export const insertarHabitacion = async (habitacionData: any) => {
  try {
    const response = await cliente.post("habitacion", habitacionData);
    return response.data;
  } catch (error) {
    throw new Error(`Error al insertar habitación: ${error}`);
  }
};

export const getPacientesSeguros = async () => {
  try {
    const response = await cliente.get("pacientes-seguros");
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener pacientes-seguros: ${error}`);
  }
};

// Insertar paciente-seguro
export const insertarPacienteSeguro = async (pacienteSeguroData: any) => {
  try {
    const response = await cliente.post("paciente-seguro", pacienteSeguroData);
    return response.data;
  } catch (error) {
    throw new Error(`Error al insertar paciente-seguro: ${error}`);
  }
};

export const getHospitalizaciones = async () => {
  try {
    const response = await cliente.get("hospitalizaciones");
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener hospitalizaciones: ${error}`);
  }
};

export const registrarHospitalizacion = async (hospitalizacionData: any) => {
  try {
    const response = await cliente.post("hospitalizacion", hospitalizacionData);
    return response.data;
  } catch (error) {
    throw new Error(`Error al registrar hospitalización: ${error}`);
  }
};

export const darAltaHospitalizacion = async (altaData: any) => {
  try {
    const response = await cliente.post("hospitalizaciones/alta", altaData);
    return response.data;
  } catch (error) {
    throw new Error(`Error al dar de alta hospitalización: ${error}`);
  }
};

export const getCostoEstancia = async (hospitalizacionID: any) => {
  try {
    const response = await cliente.get(
      `hospitalizaciones/${hospitalizacionID}/costo-estancia`
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener costo de estancia: ${error}`);
  }
};

export const getConsultasMedicas = async () => {
  try {
    const response = await cliente.get("consultas-medicas");
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener consultas médicas: ${error}`);
  }
};

export const insertarConsultaMedica = async (consultaMedicaData: any) => {
  try {
    const response = await cliente.post("consulta-medica", consultaMedicaData);
    return response.data;
  } catch (error) {
    throw new Error(`Error al insertar consulta médica: ${error}`);
  }
};

export const getResultadosLaboratorio = async () => {
  try {
    const response = await cliente.get("resultados-laboratorio");
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener resultados de laboratorio: ${error}`);
  }
};

// Insertar resultado de laboratorio
export const insertarResultadoLaboratorio = async (
  resultadoLaboratorioData: any
) => {
  try {
    const response = await cliente.post(
      "resultado-laboratorio",
      resultadoLaboratorioData
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error al insertar resultado de laboratorio: ${error}`);
  }
};

// Obtener resultado de laboratorio por ID
export const getResultadoLaboratorioPorID = async (resultadoID: any) => {
  try {
    const response = await cliente.get(`resultados-laboratorio/${resultadoID}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener resultado de laboratorio: ${error}`);
  }
};

export const getFacturas = async () => {
  try {
    const response = await cliente.get("facturas");
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener facturas: ${error}`);
  }
};

// Insertar factura
export const insertarFactura = async (facturaData: any) => {
  try {
    const response = await cliente.post("factura", facturaData);
    return response.data;
  } catch (error) {
    throw new Error(`Error al insertar factura: ${error}`);
  }
};

// Generar factura de hospitalización
export const generarFacturaHospitalizacion = async (hospitalizacionID: any) => {
  try {
    const response = await cliente.post("facturas/generar-hospitalizacion", {
      hospitalizacionID,
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error al generar factura de hospitalización: ${error}`);
  }
};

// Obtener total pagado de una factura
export const getTotalPagado = async (facturaID: any) => {
  try {
    const response = await cliente.get(`facturas/${facturaID}/total-pagado`);
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener total pagado: ${error}`);
  }
};

export const insertarPago = async (pagoData: any) => {
  try {
    const response = await cliente.post("pagos", pagoData);
    return response.data;
  } catch (error) {
    throw new Error(`Error al insertar pago: ${error}`);
  }
};

export const getHonorariosMedicos = async (fechaInicio: any, fechaFin: any) => {
  try {
    const response = await cliente.get("medicos/honorarios", {
      params: { fechaInicio, fechaFin },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener honorarios de médicos: ${error}`);
  }
};

export const getResumenMedicosConsultas = async () => {
  try {
    const response = await cliente.get("medicos/resumen-consultas");
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener resumen de médicos: ${error}`);
  }
};
