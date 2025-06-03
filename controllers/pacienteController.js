import Paciente from '../models/Paciente.js';
import Provincia from '../models/Provincia.js';
import Localidad from '../models/Localidad.js';
import Mutual from '../models/Mutual.js';
import Genero from '../models/Genero.js';
import TipoMutual from '../models/TipoMutual.js';

async function formulario(req, res) {
    res.render('admision/pacientes/dnipaciente');
}

async function buscar(req,res) {
    const {dni} = req.body;
    if (!dni) {
        return res.status(400).send('DNI es requerido');
    }
    try{
        const pacienteEncontrado = await Paciente.findOne(
            { where: {dni},
            include:[{ model: Provincia, as: 'provincia' }, Mutual, Genero]
         }
            );
        if (!pacienteEncontrado) {
            //Si no encuentra al paciente redirige con el dni ingresado
            return res.redirect(`/admision/nuevo-paciente?dni=${dni}`);
        }
        res.render('admision/pacientes/paciente', { pacienteEncontrado });
    }
    catch (error) {
        console.error('Error al buscar el paciente:', error);
        res.status(500).send('Error interno del servidor');
    }   
}

async function nuevoPaciente(req, res) {
    const { dni } = req.query; // Obtiene el DNI de la query string
    const provincias = await Provincia.findAll({ include: [{ model: Localidad, as: 'Localidades' }] });
    const mutuales = await Mutual.findAll({ include: [TipoMutual] });
    const generos = await Genero.findAll();
    if (!dni) {
        return res.status(400).send('DNI es requerido');
    }
    res.render('admision/pacientes/pacienteNuevo', {
        title: 'Formulario de Admisión',
        tiposAdmision: ['urgencia', 'consulta', 'internacion'],
        dni: dni,
        provincias: provincias,
        mutuales: mutuales,
        generos: generos,
    });
}

export default {
    formulario,
    buscar,
    nuevoPaciente,
};