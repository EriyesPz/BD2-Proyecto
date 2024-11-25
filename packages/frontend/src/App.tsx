import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginForm } from "../src/pages/login";
import { PaginaTabla } from "./pages/pacientes";

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/pacientes" element={<PaginaTabla />} />
      </Routes>
    </Router>
  );
};