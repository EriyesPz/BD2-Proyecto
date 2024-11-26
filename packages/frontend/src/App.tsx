import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginForm } from "../src/pages/login";
import { PaginaTabla } from "./pages/pacientes";
import { RegistroPaciente } from "./pages/registrar-pacientes";
import { PerfilPaciente } from "./pages/paciente";

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/pacientes" element={<PaginaTabla />} />
        <Route path="/registrar-paciente" element={<RegistroPaciente/>}/>
        <Route path="/paciente" element={<PerfilPaciente />}/>
      </Routes>
    </Router>
  );
};