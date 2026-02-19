import { Router } from 'express';
import { createProyecto, getProyectos,editarProyectos } from './proyectos.controller.js';

const router = Router();

router.post('/crear-proyecto', createProyecto);
router.get('/proyectos', getProyectos);
router.put("/proyectos/:id", editarProyectos);

export default router;