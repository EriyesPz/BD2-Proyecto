import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Layout } from "./components/layout/sidebar";
import { PacientesPage } from "./pages/pacientes";
import { MedicosPage } from "./pages/medicos";
import { HospitalizacionesPage } from "./pages/hospitalizaciones";
import { CrearHospitalizacionPage } from "./pages/crearHospitalizacion";
import { CrearHospitalizacionConFacturaPage } from "./pages/crearHospitalizacionFactura";
import { DarAltaHospitalizacionPage } from "./pages/altaHospitalizacion";
import { HospitalizacionDetailPage } from "./pages/detalleHospitalizacion";
import { HabitacionesPage } from "./pages/habitaciones";
import { HonorariosMedicosPage } from "./pages/honorariosMedicos";
import { RegistrarMedicamentoAplicadoPage } from "./pages/medicamentosAplicados";
import { RegistrarAlimentoSuministradoPage } from "./pages/alimentoSuministrado";
import { PagarFacturaPage } from "./pages/pagarFactura";
import { FacturasPage } from "./pages/facturas";
import { ConsultoriosPage } from "./pages/consultorios";
import { ConsultorioDetailPage } from "./pages/consultorioDetalle";
import { CrearConsultorioPage } from "./pages/crearConsultorio";
import { RegistrarVisitaMedicaPage } from "./pages/visitasMedicas";
import { RegistrarExamenMedicoPage } from "./pages/examenMedico";
import { ConsultasPage } from "./pages/consultas";

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/pacientes" />} />
          <Route path="pacientes" element={<PacientesPage />} />
          <Route path="medicos" element={<MedicosPage />} />
          <Route path="hospitalizaciones" element={<HospitalizacionesPage />} />
          <Route path="hospitalizacion/crear" element={<CrearHospitalizacionPage />} />
          <Route path="hospitalizacion/crear-factura" element={<CrearHospitalizacionConFacturaPage />} />
          <Route path="hospitalizacion/dar-alta" element={<DarAltaHospitalizacionPage />} />
          <Route path="hospitalizacion/:hospitalizacionID" element={<HospitalizacionDetailPage />} />
          <Route path="habitaciones" element={<HabitacionesPage />} />
          <Route path="honorarios-medicos" element={<HonorariosMedicosPage />} />
          <Route path="medicamentos-aplicados" element={<RegistrarMedicamentoAplicadoPage />} />
          <Route path="alimento-suministrado" element={<RegistrarAlimentoSuministradoPage />} />
          <Route path="pagar-factura" element={<PagarFacturaPage />} />
          <Route path="facturas" element={<FacturasPage />} />
          <Route path="consultorios" element={<ConsultoriosPage />} />
          <Route path="consultorio/:consultorioID" element={<ConsultorioDetailPage />} />
          <Route path="crear-consultorio" element={<CrearConsultorioPage />} />
          <Route path="visita-medica" element={<RegistrarVisitaMedicaPage />} />
          <Route path="examen-medico" element={<RegistrarExamenMedicoPage />} />
          <Route path="consultas" element={<ConsultasPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
