import express from 'express';
import admisionController from '../controllers/admisionController.js';
import pacienteController from '../controllers/pacienteController.js';
const router = express.Router();

router.get('/', admisionController.pagina);
router.get('/nuevo', admisionController.nuevo);

// Rutas para Pacientes
router.get('/buscar' , pacienteController.formulario);
router.post('/buscar', pacienteController.buscar);
router.get('/nuevo-paciente', pacienteController.nuevoPaciente);

export default router;