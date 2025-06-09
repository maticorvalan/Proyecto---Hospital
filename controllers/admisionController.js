import Admision from '../models/Admision.js';
import Paciente from '../models/Paciente.js';
import Mutual from '../models/Mutual.js';
import TipoMutual from '../models/TipoMutual.js';
import TipoAdmision from '../models/TipoAdmision.js';
import TipoMotivo from '../models/TipoMotivo.js';
import Cama from '../models/Cama.js';
import Turno from '../models/Turno.js';
import Ala from '../models/Ala.js';
import Internacion from '../models/Internacion.js';
import Genero from '../models/Genero.js';
import Habitacion from '../models/Habitacion.js';
import {Op} from 'sequelize';


async function pagina(req, res) {
    const msjAdmision = req.session.admisionExitosa;
    const msjTurno = req.session.turnoExitoso
    delete req.session.admisionExitosa; // Elimina el mensaje de la sesión después de mostrarlo
    delete req.session.turnoExitoso;

    res.render('admision/main', {
        msjAdmision,
        msjTurno,
        title: 'Admisión - Hospital',
    });
};

// APARTADO DE NUEVA ADMISIÓN
async function nueva(req, res) {
    const tipoAdmision = await TipoAdmision.findAll({ where: { id: { [Op.gt]: 1 } } }); // Excluye el tipo de admisión "Emergencia"
    const tipoMotivo = await TipoMotivo.findAll();

    res.render('admision/nuevaAdmision', {
        title: 'Nueva Admisión',
        tiposAdmision: tipoAdmision,
        tiposMotivo: tipoMotivo,
    });
};

async function crear(req, res) {
    const idPaciente = req.session.idPaciente; // Obtiene el ID del paciente de la sesión
    const admision = req.body;
    
    try {
        if (admision.tipoAdmision == 2) {
            const turnoNuevo = await Turno.findOne({ where: { idPaciente } });
            const hoy = new Date();
            if(!turnoNuevo){
                req.flash('error','El paciente no tiene turno asignado');  
                return res.redirect('/admision/nuevo');
            }
            console.log(turnoNuevo.fecha);
            console.log(hoy);
            
            
            if (turnoNuevo.fecha !== hoy) {
                req.flash('warning','El paciente no tiene turno para hoy');
                return res.redirect('/admision/nuevo');
            }
            const fechaHoraTurno = new Date(`${turnoNuevo.fecha}T${turnoNuevo.hora}`);
            const diferenciaMin = (hoy - fechaHoraTurno) / 60000;
            console.log(diferenciaMin);
            
            if (diferenciaMin > 20) {
                req.flash('warning', 'El turno ya venció hace más de 20 minutos');
                turnoNuevo.estado = false;
                await turnoNuevo.save();
                return res.redirect('/admision/nuevo');
            }
        }
        const paciente = await Paciente.findByPk(idPaciente);
        const camaCompatible = await camaDisponible(paciente.idGenero);
        if (!camaCompatible) {
            req.flash('error','No hay camas disponibles en este momento')
            return res.status(400).send('No hay camas compatibles disponibles.');
        }

        const admisionNueva = await Admision.create({
            idPaciente: idPaciente,
            idTipoAdmision: admision.tipoAdmision,
            idTipoMotivo: admision.tipoMotivo,
            detalle: admision.detalleMotivo,
        });

        await Internacion.create({
            idCama: camaCompatible.id,
            idAdmision: admisionNueva.id,
            fechaIngreso: new Date(),
            estado: true
        });

        camaCompatible.estado = false; // Marca la cama como ocupada
        await camaCompatible.save();

        req.session.idPaciente = null; // Limpia el ID del paciente de la sesión
        const habitacion = camaCompatible.Habitacion.dataValues;
        req.session.admisionExitosa = {
            message: 'Admision creada con exito',
            nombre: paciente.nombre,
            apellido: paciente.apellido,
            cama: camaCompatible.numero,
            habitacion: habitacion.numero,
            ala: habitacion.Ala.dataValues.nombre
        };
        res.redirect('/admision');
    } catch (error) {
        console.error('Error al crear la admisión:', error);
        res.redirect('/admision/nuevo');
    }
}

async function camaDisponible(idGeneroPaciente){
    const camaDisponible = await Cama.findAll({
        where: { estado: true, numero: { [Op.lt]: 300 } },
        include: [ {
            model: Habitacion,
            include: [Ala]
        }]
    });

    for (const cama of camaDisponible) {
        const internaciones = await Internacion.findAll({
            include:[ {
                model:Admision,
                include: [{ model: Paciente}]
            },{
            model: Cama,
            where: {idHabitacion: cama.idHabitacion}
            }]
        
        });

        const generoCama= new Set(
            internaciones.map(i => i.Admision.Paciente.idGenero)
        );

        if (generoCama.size === 0 || (generoCama.size === 1 && generoCama.has(idGeneroPaciente))) {
            return cama;
        }
    }
    return null;
}

// APARTADO DE EMERGENCIA

async function emergencia(req, res) {
    res.render('admision/emergencia/main', {
        title: 'Emergencia - Hospital',
        mainClass: 'bg-white'
    });
}

async function nuevaEmergencia(req, res) {
    const tipoMotivo = await TipoMotivo.findAll();
    const genero = await Genero.findAll( {
        where: {
            id: { [Op.ne]: 3 } // Excluye el género "No Binario"
        }
    });

    res.render('admision/emergencia/nueva', {
        title: 'Nueva Emergencia',
        tiposAdmision: ['urgencia', 'consulta', 'internacion'],
        tiposMotivo: tipoMotivo,
        generos: genero
    });
}

async function crearEmergencia(req, res) {
    const paciente = req.body;
    let dniPaciente = '';
    if(req.body.nn === 'on') {
        dniPaciente = null;
    } else {
        dniPaciente = paciente.dni;
    }
    try {
        const nuevoPaciente = await Paciente.create({
            dni: dniPaciente,
            nombre: "Rick",
            apellido: "Grimes",
            idGenero: paciente.genero,
            telefono: paciente.telefono,
        });

        const camaDisponible = await Cama.findOne({
            where: {estado:true},
            include: [{
                model: Habitacion,
                required: true,
                include: [{
                    model: Ala,
                    required: true,
                    where: { nombre: 'Sur' } // Asegura que la cama esté en el ala de Emergencias
                }]
            }]
        });
        if (!camaDisponible) {
            return res.status(400).send('No hay camas disponibles en el ala de Emergencias.');
        }
        const admisionEmergencia = await Admision.create({
            idPaciente: nuevoPaciente.id,
            idTipoAdmision: 1, // Emergencia
            idTipoMotivo: paciente.tipoMotivo,
            detalle: paciente.detalleMotivo,
        });

        await Internacion.create({
            idCama: camaDisponible.id,
            idAdmision: admisionEmergencia.id,
            fechaIngreso: new Date(),
            estado: true
        });
        camaDisponible.estado = false; // Marca la cama como ocupada
        await camaDisponible.save();
        // Guarda el ID del nuevo paciente en la sesión para usarlo en la admisión
        req.session.idPaciente = nuevoPaciente.id;
        req.session.admisionExitosa = {
            message: 'Emergencia creada con exito',
            cama: camaDisponible.numero,
            habitacion: camaDisponible.Habitacion.numero,
            ala: camaDisponible.Habitacion.Ala.dataValues.nombre
        };

        res.redirect('/admision');
    } catch (error) {
        console.error('Error al crear el paciente:', error);
        res.redirect('/admision/emergencia/nueva');
    }
}

async function pacienteEmergencia(req,res) {
    const pacientes = await Paciente.findAll({
        include: [
            {
                model: Admision,
                where: { idTipoAdmision: 1},
                required: true,
                include: [
                    {
                        model: Internacion,
                        required: true,
                        include: [
                            {
                                model: Cama,
                                required: true,
                                include: [
                                    {
                                        model: Habitacion,
                                        required: true,
                                        include: [Ala]
                                    }
                                ]
                            }
                        ]
                    }
                ]
                
            },
            {
                model: Genero,
                required: true
            }
        ]});
    
    res.render('admision/emergencia/lista', {
        title: 'Pacientes en Emergencia',
        pacientes: pacientes
    });
}

// APARTADO DE TURNO

async function turno(req,res) {
    res.render('admision/turno/turno', {
        title: 'Turno - Hospital'
    });
}

async function buscarpaciente(req,res) {
    const {dni} = req.body;
    if (!dni) {
        console.log('No hay DNI');
    }
    try{
        const paciente = await Paciente.findOne({ where:{dni} });
        if(!paciente){
            console.log('No encontrado');
            
            req.flash('error','Paciente no encontrado!')
            return res.redirect('/admision/turno');
        }
        const success_msg = 'Paciente encontrado!'
        req.session.idPaciente = paciente.id
        res.render('admision/turno/turno', {
            paciente: paciente,
            success_msg
        });
    } catch(error) {
        console.error('Error al crear el turno', error);
        res.redirect('/admision/turno');
    }
}

async function nuevoTurno(req,res) {
    const turno = req.body;
    console.log(turno);
    
    try {
        const nuevoTurno = await Turno.create({
            fecha: turno.fechaTurno,
            hora: turno.hora,
            idPaciente: req.session.idPaciente,
            medico: turno.medico,
        })
        req.session.idPaciente = '';
        req.session.turnoExitoso = {
            message: 'Turno creado con exito!',
            paciente: turno.paciente,
            fecha: turno.fechaTurno,
            hora: turno.hora,
            medico: turno.medico
        };
        res.redirect('/admision');
    } catch (error) {
        console.error('Error al crear el turno:', error);
        req.flash('error', 'Hubo un problema al crear el turno');
        res.redirect('/admision/turno');
    }

}

export default {
    pagina,
    crear,
    nueva,
    emergencia,
    nuevaEmergencia,
    crearEmergencia,
    pacienteEmergencia,
    turno,
    buscarpaciente,
    nuevoTurno
};