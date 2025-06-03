import sequelize from '../config/db.js';
import Paciente from './Paciente.js';
import Admision from './Admision.js';
import Ala from './Ala.js';
import Cama from './Cama.js';
import EstadoAdmision from './EstadoAdmision.js';
import Genero from './Genero.js';
import Habitacion from './Habitacion.js';
import Internacion from './Internacion.js';
import Localidad from './Localidad.js';
import Mutual from './Mutual.js';
import Provincia from './Provincia.js';
import RolUsuario from './RolUsuario.js';
import TipoAdmision from './TipoAdmision.js';
import TipoMutual from './TipoMutual.js';
import Turno from './Turno.js';
import Usuario from './Usuario.js';
import TipoMotivo from './TipoMotivo.js';


// Definición de las relaciones entre los modelos
// Paciente
Paciente.belongsTo(Genero, { foreignKey: 'idGenero' });
Paciente.belongsTo(Provincia, { foreignKey: 'idProvincia', as : 'provincia' });
Paciente.belongsTo(Mutual, { foreignKey: 'idMutual' });
Paciente.hasMany(Turno, { foreignKey: 'idPaciente' });
Paciente.hasMany(Admision, { foreignKey: 'idPaciente' });
// Admision
Admision.belongsTo(Paciente, { foreignKey: 'idPaciente' });
Admision.belongsTo(Usuario, { foreignKey: 'idUsuario' });
Admision.belongsTo(EstadoAdmision, { foreignKey: 'idEstadoAdmision' });
Admision.belongsTo(TipoAdmision, { foreignKey: 'idTipoAdmision' });
Admision.belongsTo(Turno, { foreignKey: 'idTurno' });
Admision.hasMany(Internacion, { foreignKey: 'idAdmision' });
Admision.belongsTo(TipoMotivo, { foreignKey: 'idTipoMotivo' });
// Ala
Ala.hasMany(Habitacion, { foreignKey: 'idAla' });
// Cama
Cama.belongsTo(Habitacion, { foreignKey: 'idHabitacion' });
Cama.hasMany(Internacion, { foreignKey: 'idCama' });
// EstadoAdmision
EstadoAdmision.hasMany(Admision, { foreignKey: 'idEstadoAdmision' });
// Genero
Genero.hasMany(Paciente, { foreignKey: 'idGenero' });
// Habitacion
Habitacion.belongsTo(Ala, { foreignKey: 'idAla' });
Habitacion.hasMany(Cama, { foreignKey: 'idHabitacion' });
// Internacion
Internacion.belongsTo(Admision, { foreignKey: 'idAdmision' });
Internacion.belongsTo(Cama, { foreignKey: 'idCama' });
// Localidad
Localidad.belongsTo(Provincia, { foreignKey: 'idProvincia' });
// Mutual
Mutual.hasMany(Paciente, { foreignKey: 'idMutual' });
Mutual.belongsTo(TipoMutual, { foreignKey: 'idTipoMutual' });
// Provincia
Provincia.hasMany(Paciente, { foreignKey: 'idProvincia' });
Provincia.hasMany(Localidad, { foreignKey: 'idProvincia', as: 'Localidades' });
// RolUsuario
RolUsuario.hasMany(Usuario, { foreignKey: 'idRolUsuario' });
// TipoAdmision
TipoAdmision.hasMany(Admision, { foreignKey: 'idTipoAdmision' });
// TipoMotivo
TipoMotivo.hasMany(Admision, { foreignKey: 'idTipoMotivo' });
// TipoMutual
TipoMutual.hasMany(Mutual, { foreignKey: 'idTipoMutual' });
// Turno
Turno.belongsTo(Paciente, { foreignKey: 'idPaciente' });
Turno.hasOne(Admision, { foreignKey: 'idTurno' });
// Usuario
Usuario.belongsTo(RolUsuario, { foreignKey: 'idRolUsuario' });
Usuario.hasMany(Admision, { foreignKey: 'idUsuario' });


// Exportación de los modelos
const models = {
    sequelize,
    Paciente,
    Admision,
    Ala,
    Cama,
    EstadoAdmision,
    Genero,
    Habitacion,
    Internacion,
    Localidad,
    Mutual,
    Provincia,
    RolUsuario,
    TipoAdmision,
    TipoMutual,
    Turno,
    Usuario
};
export default models;