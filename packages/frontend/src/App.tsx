import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/sidebar";
import { LoginForm } from "../src/pages/login";
import { Pacientes, PerfilPaciente, RegistroPaciente } from "./pages/paciente";
import { DoctorsPage, RegistarDoctor, DoctorPerfil } from "./pages/doctores";
import {
  Hospitalizacion,
  HospitalizationDetalle,
  FormularioHospitalizacion,
} from "./pages/hospitalizacion";
import { ListaFacturas, Factura, Pago } from "./pages/facturacion";
import { Medicamentos, RegistroMedicamento, GestionProveedores } from "./pages/farmacia";
import {
  ListaExamenes,
  PacienteResultado,
  ExamenResultado,
} from "./pages/laboratorio";
import { AgendaConsulta, ProgramacionConsulta, RegistroConsulta } from "./pages/consultas";
import { HonorariosMedicos, ReporteInventarioMedicamentos } from "./pages/reportes";

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Login */}
        <Route path="/" element={<LoginForm />} />

        {/* Layout with Sidebar */}
        <Route element={<Layout />}>
          {/* Pacientes */}
          <Route path="/pacientes" element={<Pacientes />} />
          <Route path="/registrar-paciente" element={<RegistroPaciente />} />
          <Route path="/paciente" element={<PerfilPaciente />} />

          {/* Doctores */}
          <Route path="/doctores" element={<DoctorsPage />} />
          <Route path="/registrar-doctor" element={<RegistarDoctor />} />
          <Route path="/doctor" element={<DoctorPerfil />} />

          {/* Hospitalización */}
          <Route path="/hospitalizacion" element={<Hospitalizacion />} />
          <Route path="/detalle-hospitalizacion" element={<HospitalizationDetalle />} />
          <Route path="/registrar-hospitalizacion" element={<FormularioHospitalizacion />} />

          {/* Facturación */}
          <Route path="/facturas" element={<ListaFacturas />} />
          <Route path="/factura" element={<Factura />} />
          <Route path="/pago" element={<Pago />} />

          {/* Farmacia */}
          <Route path="/medicamentos" element={<Medicamentos />} />
          <Route path="/registrar-medicamento" element={<RegistroMedicamento />} />
          <Route path="/proveedores" element={<GestionProveedores />} />

          {/* Laboratorio */}
          <Route path="/examenes" element={<ListaExamenes />} />
          <Route path="/paciente-resultados" element={<PacienteResultado />} />
          <Route path="/registrar-resultado" element={<ExamenResultado />} />

          {/* Consultas */}
          <Route path="/agendar-consulta" element={<AgendaConsulta />} />
          <Route path="/programar-consulta" element={<ProgramacionConsulta />} />
          <Route path="/registrar-consulta" element={<RegistroConsulta />} />

          {/* Reportes */}
          <Route path="/honorarios-medicos" element={<HonorariosMedicos />} />
          <Route path="/inventario-medicamentos" element={<ReporteInventarioMedicamentos />} />
        </Route>
      </Routes>
    </Router>
  );
};
