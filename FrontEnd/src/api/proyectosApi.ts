import axios from "./axios";

export interface ProyectoPayload {
  nombre: string;
  cliente: string;
  fechaInicio: string;
  fechaTermino: string;
}

export interface ProyectoUpdatePayload extends ProyectoPayload {
  trabajadores: number[]; 
}

// Crear Proyecto
export const crearProyecto = async (data: ProyectoPayload) => {
  const response = await axios.post("/api/crear-proyecto", data);
  return response.data;
};

// Obtener todos los proyectos
export const obtenerProyectos = async () => {
  const response = await axios.get("/api/proyectos");
  return response.data;
};

// Actualizar proyecto (con trabajadores)
export const actualizarProyecto = async (
  id: number,
  data: ProyectoUpdatePayload
) => {
  const response = await axios.put(`/api/proyectos/${id}`, data);
  return response.data;
};