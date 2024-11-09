import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginForm } from "../src/pages/login";

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
      </Routes>
    </Router>
  );
};