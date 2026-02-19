import axios from './axios';

//Crear Trabajador
export const crearTrabajador = async (data: {
    nombre: string; 
    rol: string;
    seniority: string;
}) =>{
    const response = await axios.post("/api/crear-trabajador", data);
    return response.data;
}



//Obtener Trabajador
export const obtenerTrabajadores = async () => {
  const response = await axios.get("/api/trabajadores");
  return response.data;
};