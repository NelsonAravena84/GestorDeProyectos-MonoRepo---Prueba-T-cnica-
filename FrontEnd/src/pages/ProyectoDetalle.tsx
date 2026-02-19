import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Paper,
    Container,
    Divider,
    TextField,
    Button,
    Fade,
    MenuItem,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { actualizarProyecto, obtenerProyectos, } from "../api/proyectosApi";
import { obtenerTrabajadores } from "../api/trabajadoresApi";
import { House, Pencil } from "lucide-react";

interface Trabajador {
    id: number;
    nombre: string;
}

interface Proyecto {
    id: number;
    nombre: string;
    cliente: string;
    fechaInicio: string;
    fechaTermino: string;
    trabajadores?: { trabajador: Trabajador }[];
}

export default function ProyectoDetalle() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [proyectosList, setProyectosList] = useState<Proyecto[]>([]);

    const [proyectoActual, setProyectoActual] = useState<Proyecto | null>(null);
    const [trabajadores, setTrabajadores] = useState<Trabajador[]>([]);
    const [isEditing, setIsEditing] = useState(false);

    const [editForm, setEditForm] = useState({
        nombre: "",
        cliente: "",
        fechaInicio: "",
        fechaTermino: "",
        trabajadores: [] as number[],
    });

    useEffect(() => {
        const cargar = async () => {
            if (!id) return;

            const [proyectos, listaTrabajadores] = await Promise.all([
                obtenerProyectos(),
                obtenerTrabajadores(),
            ]);

            const proyecto = proyectos.find((p: Proyecto) => p.id === Number(id));
            if (!proyecto) return;
            setProyectosList(proyectos);
            setProyectoActual(proyecto);
            setTrabajadores(listaTrabajadores);

            setEditForm({
                nombre: proyecto.nombre,
                cliente: proyecto.cliente,
                fechaInicio: proyecto.fechaInicio.split("T")[0],
                fechaTermino: proyecto.fechaTermino?.split("T")[0] || "",
                trabajadores: proyecto.trabajadores?.map((t: { trabajador: Trabajador }) => t.trabajador.id) || [],
            });
        };

        cargar();
    }, [id]);

    const handleGuardar = async () => {
        if (!id) return;

        await actualizarProyecto(Number(id), editForm);
        setIsEditing(false);

        const proyectos = await obtenerProyectos();
        const actualizado = proyectos.find((p: Proyecto) => p.id === Number(id));
        if (actualizado) setProyectoActual(actualizado);
    };

    if (!proyectoActual) return null;


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
  
    return (
        <>
            <AppBar position="static" elevation={0} sx={{ bgcolor: "black" }}>
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Typography variant="h6" fontWeight="bold">
                        Panel de Administración
                    </Typography>
                </Toolbar>
            </AppBar>

            <Divider sx={{ bgcolor: "white" }} />

            <Container maxWidth="xl" sx={{ mt: 6 }}>
                <Box display="grid" gridTemplateColumns="300px 1px 1fr">

                    {/* Sidebar */}
                    <Paper sx={{ p: 3, bgcolor: "black", border: "1px solid white" }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                sx={{ color: "#2CFF05", mb: 3 }}
                            >
                                Proyectos
                            </Typography>

                            <Box sx={{ cursor: "pointer" }} onClick={() => navigate("/")}>
                                <House color="#2CFF05" />
                            </Box>
                        </Box>

                        {proyectosList.map((proyecto) => (
                            <Paper
                                key={proyecto.id}
                                onClick={() => navigate(`/proyecto/${proyecto.id}`)}
                                elevation={Number(id) === proyecto.id ? 8 : 2}
                                sx={{
                                    p: 2,
                                    mb: 2,
                                    cursor: "pointer",
                                    bgcolor: Number(id) === proyecto.id ? "#1a1a1a" : "black",
                                    border: Number(id) === proyecto.id ? "1px solid #2CFF05" : "1px solid white",
                                    transition: "0.2s",
                                    "&:hover": {
                                        borderColor: "#2CFF05",
                                    },
                                }}
                            >
                                <Typography variant="subtitle1" fontWeight="bold" sx={{ color: "#2CFF05" }}>
                                    {proyecto.nombre}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "white" }}>
                                    Cliente: {proyecto.cliente}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "gray" }}>
                                    Inicio: {proyecto.fechaInicio.split("T")[0]}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "gray" }}>
                                    Término: {proyecto.fechaTermino?.split("T")[0] || "Sin fecha"}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "gray" }}>
                                    Trabajadores: {proyecto.trabajadores?.length
                                        ? proyecto.trabajadores.map((t) => t.trabajador.nombre).join(", ")
                                        : "Ninguno"}
                                </Typography>
                            </Paper>
                        ))}
                    </Paper>

                    <Divider orientation="vertical" flexItem sx={{ bgcolor: "white" }} />

                    {/* Contenido */}
                    <Box pl={4}>

                        {/* Info principal */}
                        <Paper sx={{ p: 6, bgcolor: "black", border: "1px solid white" }}>
                            <Box display="flex" justifyContent="space-between">
                                <Typography variant="h4" sx={{ color: "#2CFF05" }}>
                                    {proyectoActual.nombre}
                                </Typography>

                                <Box
                                    sx={{ cursor: "pointer" }}
                                    onClick={() => setIsEditing(!isEditing)}
                                >
                                    <Pencil color="#2CFF05" />
                                </Box>
                            </Box>

                            <Typography sx={{ color: "white", mt: 2 }}>
                                Cliente: {proyectoActual.cliente}
                            </Typography>

                            <Typography sx={{ color: "white" }}>
                                Inicio: {proyectoActual.fechaInicio}
                            </Typography>

                            <Typography sx={{ color: "white" }}>
                                Término: {proyectoActual.fechaTermino}
                            </Typography>

                            <Typography sx={{ color: "white" }}>
                                Trabajadores:{" "}
                                {proyectoActual.trabajadores?.length
                                    ? proyectoActual.trabajadores
                                        .map((t) => t.trabajador.nombre)
                                        .join(", ")
                                    : "Ninguno"}
                            </Typography>
                        </Paper>

                        {/* Form edición */}
                        <Fade in={isEditing}>
                            <Box mt={4}>
                                {isEditing && (
                                    <Paper
                                        sx={{
                                            p: 6,
                                            bgcolor: "black",
                                            border: "1px solid #2CFF05",
                                        }}
                                    >
                                        <Typography sx={{ color: "#2CFF05", mb: 3 }}>
                                            Editar Proyecto
                                        </Typography>

                                        <Box display="grid" gap={3}>

                                            <TextField
                                                label="Nombre"
                                                value={editForm.nombre}
                                                onChange={(e) =>
                                                    setEditForm({ ...editForm, nombre: e.target.value })
                                                }
                                                fullWidth
                                                sx={darkTextField}
                                            />

                                            <TextField
                                                label="Cliente"
                                                value={editForm.cliente}
                                                onChange={(e) =>
                                                    setEditForm({ ...editForm, cliente: e.target.value })
                                                }
                                                fullWidth
                                                sx={darkTextField}
                                            />

                                            {/* 🔥 MULTI SELECT CON SCROLL */}
                                            <TextField
                                                select
                                                label="Trabajadores"
                                                value={editForm.trabajadores}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    setEditForm({
                                                        ...editForm,
                                                        trabajadores: (typeof value === "string" ? value.split(",") : value as number[]).map(Number),
                                                    });
                                                }}
                                                SelectProps={{
                                                    multiple: true,
                                                    renderValue: (selected) =>
                                                        (selected as number[])
                                                            .map((id) => trabajadores.find((t) => t.id === id)?.nombre)
                                                            .filter(Boolean)
                                                            .join(", "),
                                                    MenuProps: {
                                                        PaperProps: {
            style: { maxHeight: 250, backgroundColor: "#111", color: "white" },                                                        },
                                                    },
                                                }}
                                                fullWidth
                                                sx={darkTextField}
                                            >
                                                {trabajadores.map((trabajador) => (
                                                    <MenuItem
                                                        key={trabajador.id}
                                                        value={trabajador.id}
                                                        sx={{
                                                            bgcolor: editForm.trabajadores.includes(trabajador.id) ? "#2CFF0522" : "inherit",
                                                            color: editForm.trabajadores.includes(trabajador.id) ? "#2CFF05" : "inherit",
                                                        }}
                                                    >
                                                        {trabajador.nombre}
                                                    </MenuItem>
                                                ))}
                                            </TextField>

                                            <Button
                                                variant="contained"
                                                onClick={handleGuardar}
                                                sx={{
                                                    mt: 2,
                                                    bgcolor: "#2CFF05",
                                                    color: "black",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                Guardar Cambios
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