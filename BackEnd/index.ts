import express from "express";
import cors from "cors";
import proyectosRoutes from "./src/features/proyectos/proyectos.routes.js";
import trabajadoresRoutes from "./src/features/trabajadores/trabajadores.routes.js";

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// Rutas
app.use("/api", proyectosRoutes);
app.use("/api", trabajadoresRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log("Current working dir:", process.cwd());
});