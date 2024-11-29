import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginForm } from "../src/pages/login";
import { PaginaTabla } from "./pages/pacientes";
import { RegistroPaciente } from "./pages/registrar-pacientes";
import { PerfilPaciente } from "./pages/paciente";
import { DoctorsPage } from "./pages/medicos";
import { RegistarDoctor } from "./pages/registrar-doctor";
import { DoctorPerfil } from "./pages/doctor";
import { Hospitalizacion } from "./pages/hospitalizacion";
import { HospitalizationDetalle } from "./pages/detalle-hospitalizacion";
import { FormularioHospitalizacion } from "./pages/registro-hospitalizacion";
import { ListaFacturas } from "./pages/facturas";
import { Factura } from "./pages/factura";
import { Pago } from "./pages/pago";
import { Medicamentos, RegistroMedicamento } from "./pages/farmacia";
import { ListaExamenes } from "./pages/laboratorio";

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm/>}/>
        <Route path="/pacientes" element={<PaginaTabla/>} />
        <Route path="/registrar-paciente" element={<RegistroPaciente/>}/>
        <Route path="/paciente" element={<PerfilPaciente/>}/>
        <Route path="/doctores" element={<DoctorsPage/>}/>
        <Route path="/registrar-doctor" element={<RegistarDoctor/>}/>
        <Route path="/doctor" element={<DoctorPerfil />}/>
        <Route path="/hospitalizacion" element={<Hospitalizacion/>}/>
        <Route path="/detalle-hospitalizacion" element={<HospitalizationDetalle/>}/>
        <Route path="/registrar-hospitalizacion" element={<FormularioHospitalizacion/>}/>
        <Route path="/facturas" element={<ListaFacturas/>}/>
        <Route path="/factura" element={<Factura/>}/>
        <Route path="/pago" element={<Pago/>}/>
        <Route path="/medicamentos" element={<Medicamentos/>}/>
        <Route path="/registrar-medicamento" element={<RegistroMedicamento/>}/>
        <Route path="/examenes" element={<ListaExamenes/>}/>
      </Routes>
    </Router>
  );
};