import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProyectoDetalle from "./pages/ProyectoDetalle";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/proyecto/:id" element={<ProyectoDetalle />} />
    </Routes>
  );
}

export default App;