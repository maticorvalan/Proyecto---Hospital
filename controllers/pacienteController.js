import Paciente from '../models/Paciente.js';
import Provincia from '../models/Provincia.js';
import Localidad from '../models/Localidad.js';
import Mutual from '../models/Mutual.js';
import Genero from '../models/Genero.js';
import TipoMutual from '../models/TipoMutual.js';
import TipoAdmision from '../models/TipoAdmision.js';
import TipoMotivo from '../models/TipoMotivo.js';
import { Op } from 'sequelize';
import Admision from '../models/Admision.js';

async function formulario(req, res) {
    res.render('admision/pacientes/dnipaciente');
}

async function buscar(req,res) {
    const {dni} = req.body;
    if (!dni || dni.length != 8) {
        req.flash('error', 'Ingrese un DNI valido (8 numeros)');
        return res.status(400).redirect('/admision/buscar');
    }
    try{
        const pacienteEncontrado = await Paciente.findOne(
            { where: {dni},
            include:[{ model: Provincia, as: 'provincia' }, Mutual, Genero]
         }
            );
        if (!pacienteEncontrado) {
            //Si no encuentra al paciente redirige con el dni ingresado
            req.session.dniPaciente = dni; // Guarda el DNI en la sesión
            req.flash('error', 'Paciente no encontrado. Por favor, registre un nuevo paciente.');
            return res.redirect('/admision/nuevo-paciente');
        }
        req.session.idPaciente = pacienteEncontrado.id; // Guarda el ID del paciente en la sesión
        req.flash('success', 'Paciente encontrado exitosamente');
        res.redirect('/admision/paciente')
    }
    catch (error) {
        console.error('Error al buscar el paciente:', error);
        res.status(500).send('Error interno del servidor');
    }   
}

async function formularioNuevo(req, res) {
    const dni = req.session.dniPaciente; // Obtiene el DNI del paciente de la sesión
    const provincias = await Provincia.findAll({ include: [{ model: Localidad, as: 'Localidades' }] });
    const mutuales = await Mutual.findAll({ include: [TipoMutual] });
    const generos = await Genero.findAll();
    res.render('admision/pacientes/pacienteNuevo', {
        title: 'Formulario de Admisión',
        dni: dni,
        provincias: provincias,
        mutuales: mutuales,
        generos: generos,
    });
}

async function nuevoPaciente(req, res) {
    const nuevoPaciente = req.body;
    const hoy = req.app.locals.formatDate(new Date());

    if (nuevoPaciente.fechaNacimiento > hoy) {
        req.flash('error', 'La fecha de nacimiento no puede ser mayor al día de hoy');   
        return res.status(400).redirect('/admision/nuevo-paciente');
    }
    req.session.dniPaciente = null; // Limpia el DNI de la sesión después de usarlo
    try {
        const paciente = await Paciente.create({
            dni: nuevoPaciente.dni,
            nombre: nuevoPaciente.nombre,
            apellido: nuevoPaciente.apellido,
            fecha_nacimiento: nuevoPaciente.fechaNacimiento,
            idProvincia: nuevoPaciente.provincia,
            idMutual: nuevoPaciente.mutuales,
            idGenero: nuevoPaciente.genero,
            direccion: nuevoPaciente.direccion,
            telefono: nuevoPaciente.telefono,
            telefonoEmer: nuevoPaciente.telefonoEmer,
            email: nuevoPaciente.email
        });
        req.flash('success', 'Paciente creado exitosamente');
        req.session.idPaciente = paciente.id;
        return res.redirect('/admision/nuevo');
    } catch (error) {
        req.flash('error', 'Error al crear el paciente: ' + error.message);
        res.status(500).send('Error interno del servidor');
    }
}

async function paciente(req, res) {
    const idPaciente = req.session.idPaciente;
    const provincias = await Provincia.findAll({ include: [{ model: Localidad, as: 'Localidades' }] });
    const mutuales = await Mutual.findAll({ include: [TipoMutual] });
    const generos = await Genero.findAll();
    if (!idPaciente) {
        return res.status(400).send('ID de paciente no encontrado en la sesión');
    }
    try {
        const pacienteEncontrado = await Paciente.findByPk(idPaciente, {
            include: [
                { model: Provincia, as: 'provincia', include: [{model: Localidad, as: 'Localidades'}] },
                { model: Mutual, include: [TipoMutual] },
                { model: Genero }
            ]
        });
        if (!paciente) {
            return res.status(404).send('Paciente no encontrado');
        }
        req.session.pacienteEncontrado = pacienteEncontrado;
        res.render('admision/pacientes/paciente', {
             pacienteEncontrado,
             provincias: provincias,
             mutuales: mutuales,
             generos: generos,
            });
    } catch (error) {
        console.error('Error al obtener el paciente:', error);
        res.status(500).send('Error interno del servidor');
    }
}

async function updatePaciente(req,res){
    const paciente = req.body;
    const pacienteAnterior = req.session.pacienteEncontrado;
    delete req.session.pacienteEncontrado;
    try {
        const admitido = await Admision.findOne({
            where: {idPaciente: pacienteAnterior.id}
        })
        if (admitido) {
            req.flash('error','El paciente ya se encuentra admitido');
            return res.redirect('/admision/paciente');
        }
        
    } catch (error) {
        console.error('Error al obtener el paciente:', error);
        res.status(500).send('Error interno del servidor');
    }
    const cambio =
                paciente.nombre[0] !== pacienteAnterior.nombre ||
                paciente.nombre[1] !== pacienteAnterior.apellido ||
                paciente.fecha !== pacienteAnterior.fecha_nacimiento ||
                parseInt(paciente.genero) !== pacienteAnterior.idGenero ||
                parseInt(paciente.provincia) !== pacienteAnterior.idProvincia ||
                paciente.direccion !== pacienteAnterior.direccion ||
                paciente.telefono !== pacienteAnterior.telefono ||
                paciente.telefonoEmer !== pacienteAnterior.telefonoEmer ||
                paciente.email !== pacienteAnterior.email ||
                parseInt(paciente.mutuales) !== pacienteAnterior.idMutual;
    req.session.idPaciente = pacienteAnterior.id;
    if(cambio){
        try {
            const update = await Paciente.update({
                nombre: paciente.nombre[0],
                apellido: paciente.nombre[1],
                fecha_nacimiento: paciente.fecha,
                idGenero: paciente.genero,
                idProvincia: paciente.provincia,
                direccion: paciente.direccion,
                telefono: paciente.telefono,
                telefonoEmer: paciente.telefonoEmer,
                email: paciente.email,
                idMutual: paciente.mutuales
                }, {
                    where: { id: pacienteAnterior.id }
                });
                req.flash('success', 'Paciente actualizado exitosamente');
                return res.redirect('/admision/nuevo');
            
        } catch (error) {
            console.error('Error al obtener el paciente:', error);
            res.status(500).send('Error interno del servidor');
        }
    }
    res.redirect(('/admision/nuevo'));

    
}

export default {
    formulario,
    buscar,
    formularioNuevo,
    nuevoPaciente,
    paciente,
    updatePaciente
};