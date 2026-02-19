import { Router } from 'express';
import { createTrabajador, getTrabajadores } from './trabajadores.controller.js';

const router = Router();

router.post('/crear-trabajador', createTrabajador);
router.get('/trabajadores', getTrabajadores);

export default router;