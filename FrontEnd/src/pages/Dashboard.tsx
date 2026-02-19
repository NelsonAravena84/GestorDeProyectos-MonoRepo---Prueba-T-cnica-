import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Paper,
  TextField,
  Container,
  Fade,
  Divider,
} from "@mui/material";
import { useState, useEffect } from "react";
import ActionCards from "../components/ActionCards";
import { crearProyecto, obtenerProyectos } from "../api/proyectosApi";
import { crearTrabajador } from "../api/trabajadoresApi";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [activeForm, setActiveForm] = useState<
    "proyecto" | "trabajador" | null
  >(null);

  const [trabajadorForm, setTrabajadorForm] = useState({
    nombre: "",
    rol: "",
    seniority: "",
  });

  const [proyectoForm, setProyectoForm] = useState({
    nombre: "",
    cliente: "",
    fechaInicio: "",
    fechaTermino: "",
  });

  // 🔹 Ahora guardamos objetos completos
  const [proyectosList, setProyectosList] = useState<any[]>([]);

  const darkTextField = {
    "& .MuiInputBase-input": { color: "white" },
    "& .MuiInputLabel-root": { color: "white" },
    "& .MuiInputLabel-root.Mui-focused": { color: "#2CFF05" },
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "white" },
      "&:hover fieldset": { borderColor: "#2CFF05" },
      "&.Mui-focused fieldset": { borderColor: "#2CFF05" },
    },
  };

  const handleGuardarTrabajador = async () => {
    try {
      await crearTrabajador(trabajadorForm);

      setTrabajadorForm({
        nombre: "",
        rol: "",
        seniority: "",
      });
    } catch (error) {
      console.error("Error al crear trabajador:", error);
    }
  };

  const handleGuardarProyecto = async () => {
    try {
      await crearProyecto(proyectoForm);

      // 🔹 Agregamos objeto completo
      setProyectosList([...proyectosList, proyectoForm]);

      setProyectoForm({
        nombre: "",
        cliente: "",
        fechaInicio: "",
        fechaTermino: "",
      });
    } catch (error) {
      console.error("Error al crear proyecto:", error);
    }
  };

  useEffect(() => {
    const cargarProyectos = async () => {
      try {
        const data = await obtenerProyectos();
        setProyectosList(data);
      } catch (error) {
        console.error("Error al obtener proyectos:", error);
      }
    };

    cargarProyectos();
  }, []);


  const navigate = useNavigate()

  return (
    <>
      <AppBar position="static" elevation={0} sx={{ bgcolor: "black" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" fontWeight="bold">
            Panel de Administración
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Gestión de Proyectos y Trabajadores
          </Typography>
        </Toolbar>
      </AppBar>

      <Divider sx={{ bgcolor: "white" }} />

      <Container maxWidth="xl" sx={{ mt: 6, mb: 6 }}>
        <Box
          display="grid"
          gridTemplateColumns={{
            xs: "1fr",
            md: "300px 1px 1fr",
          }}
          alignItems="stretch"
        >
          {/* 🔹 Sidebar */}
          <Paper
            elevation={6}
            variant="outlined"
            sx={{
              p: 3,
              bgcolor: "black",
              borderColor: "white",
              height: "fit-content",
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              mb={2}
              sx={{ color: "white" }}
            >
              Proyectos
            </Typography>

            <Box display="flex" flexDirection="column" gap={2}>
              {proyectosList.length === 0 ? (
                <Typography variant="body2" sx={{ color: "gray" }}>
                  No hay proyectos creados
                </Typography>
              ) : (
                proyectosList.map((proyecto, index) => (
                  <Paper
                    key={index}
                    variant="outlined"
                    sx={{
                      p: 2,
                      bgcolor: "#111",
                      borderColor: "white",
                      cursor: "pointer",
                      transition: "0.2s",
                      "&:hover": {
                        borderColor: "#2CFF05",
                        transform: "scale(1.02)",
                      },
                    }}
                    onClick={() => navigate(`/proyecto/${proyecto.id}`)}                  >


                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      sx={{ color: "#2CFF05" }}
                    >
                      {proyecto.nombre}
                    </Typography>

                    <Typography variant="body2" sx={{ color: "white" }}>
                      Cliente: {proyecto.cliente}
                    </Typography>

                    <Typography variant="body2" sx={{ color: "gray" }}>
                      Inicio: {proyecto.fechaInicio}
                    </Typography>

                    <Typography variant="body2" sx={{ color: "gray" }}>
                      Término: {proyecto.fechaTermino}
                    </Typography>
                  </Paper>
                ))
              )}
            </Box>
          </Paper>

          {/* 🔹 Divider Vertical */}
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              bgcolor: "rgba(255,255,255,0.3)",
              display: { xs: "none", md: "block" },
            }}
          />

          {/* 🔹 Contenido Principal */}
          <Box pl={{ md: 4 }} mt={{ xs: 4, md: 0 }}>
            <Box
              display="grid"
              gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }}
              gap={4}
            >
              <ActionCards
                titulo="Crear Proyecto"
                descripcion="Registra un nuevo proyecto con fechas y cliente asociado."
                onClick={() => setActiveForm("proyecto")}
              />

              <ActionCards
                titulo="Crear Trabajador"
                descripcion="Agrega un nuevo trabajador al sistema."
                onClick={() => setActiveForm("trabajador")}
              />
            </Box>

            <Fade in={activeForm !== null}>
              <Box mt={8}>
                {activeForm === "proyecto" && (
                  <Paper
                    elevation={6}
                    variant="outlined"
                    sx={{
                      p: 6,
                      borderRadius: 4,
                      bgcolor: "black",
                      borderColor: "white",
                    }}
                  >
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      mb={4}
                      sx={{ color: "white" }}
                    >
                      Nuevo Proyecto
                    </Typography>

                    <Box display="grid" gap={3}>
                      <TextField
                        label="Nombre del Proyecto"
                        fullWidth
                        sx={darkTextField}
                        value={proyectoForm.nombre}
                        onChange={(e) =>
                          setProyectoForm({
                            ...proyectoForm,
                            nombre: e.target.value,
                          })
                        }
                      />

                      <TextField
                        label="Cliente"
                        fullWidth
                        sx={darkTextField}
                        value={proyectoForm.cliente}
                        onChange={(e) =>
                          setProyectoForm({
                            ...proyectoForm,
                            cliente: e.target.value,
                          })
                        }
                      />

                      <TextField
                        label="Fecha Inicio"
                        type="date"
                        sx={darkTextField}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        value={proyectoForm.fechaInicio}
                        onChange={(e) =>
                          setProyectoForm({
                            ...proyectoForm,
                            fechaInicio: e.target.value,
                          })
                        }
                      />

                      <TextField
                        label="Fecha Término"
                        type="date"
                        sx={darkTextField}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        value={proyectoForm.fechaTermino}
                        onChange={(e) =>
                          setProyectoForm({
                            ...proyectoForm,
                            fechaTermino: e.target.value,
                          })
                        }
                      />

                      <Button
                        variant="contained"
                        size="large"
                        sx={{ mt: 2, borderRadius: 2, bgcolor: "green" }}
                        onClick={handleGuardarProyecto}
                      >
                        Guardar Proyecto
                      </Button>
                    </Box>
                  </Paper>
                )}

                {activeForm === "trabajador" && (
                  <Paper
                    elevation={6}
                    variant="outlined"
                    sx={{
                      p: 6,
                      borderRadius: 4,
                      bgcolor: "black",
                      borderColor: "white",
                    }}
                  >
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      mb={4}
                      sx={{ color: "white" }}
                    >
                      Nuevo Trabajador
                    </Typography>

                    <Box display="grid" gap={3}>
                      <TextField
                        label="Nombre Completo"
                        fullWidth
                        sx={darkTextField}
                        value={trabajadorForm.nombre}
                        onChange={(e) =>
                          setTrabajadorForm({
                            ...trabajadorForm,
                            nombre: e.target.value,
                          })
                        }
                      />

                      <TextField
                        label="Rol"
                        fullWidth
                        sx={darkTextField}
                        value={trabajadorForm.rol}
                        onChange={(e) =>
                          setTrabajadorForm({
                            ...trabajadorForm,
                            rol: e.target.value,
                          })
                        }
                      />

                      <TextField
                        label="Seniority"
                        fullWidth
                        sx={darkTextField}
                        value={trabajadorForm.seniority}
                        onChange={(e) =>
                          setTrabajadorForm({
                            ...trabajadorForm,
                            seniority: e.target.value,
                          })
                        }
                      />

                      <Button
                        variant="contained"
                        size="large"
                        sx={{ mt: 2, borderRadius: 2, bgcolor: "green" }}
                        onClick={handleGuardarTrabajador}
                      >
                        Guardar Trabajador
                      </Button>
                    </Box>
                  </Paper>
                )}
              </Box>
            </Fade>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Dashboard;