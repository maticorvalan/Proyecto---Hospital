import express from 'express';
import admisionController from '../controllers/admisionController.js';
import pacienteController from '../controllers/pacienteController.js';
import { ensureAuthenticated } from '../middlewares/authMiddleware.js';
const router = express.Router();

// Rutas para Admisión
router.get('/', ensureAuthenticated ,admisionController.pagina);
router.get('/nuevo', admisionController.nueva);
router.post('/nuevo', admisionController.crear);

// Rutas para Pacientes
router.get('/buscar' , pacienteController.formulario);
router.post('/buscar', pacienteController.buscar);
router.get('/paciente', pacienteController.paciente);
router.post('/paciente', pacienteController.updatePaciente);
router.get('/nuevo-paciente', pacienteController.formularioNuevo);
router.post('/nuevo-paciente', pacienteController.nuevoPaciente);

// Rutas para emergencia
router.get('/emergencia', admisionController.emergencia);
router.get('/emergencia/nueva', admisionController.nuevaEmergencia);
router.post('/emergencia/nueva', admisionController.crearEmergencia);
router.get('/emergencia/pacientes', admisionController.pacienteEmergencia);

// Rutas para turno
router.get('/turno', admisionController.turno);
router.post('/turno', admisionController.buscarpaciente);
router.post('/nuevo-turno', admisionController.nuevoTurno);
export default router;