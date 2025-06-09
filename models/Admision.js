import {Model, DataTypes} from 'sequelize';
import sequelize from '../config/db.js';


class Admision extends Model {}
Admision.init({
    idPaciente: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1, // Asignar un usuario por defecto
    },
    idTipoAdmision: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    idEstadoAdmision: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1, // Asignar un estado de admisión por defecto
    },
    idTurno: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    derivado: {
        type: DataTypes.STRING,
        allowNull: true
    },
    detalle: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    sequelize,
    modelName: 'Admision',
    tableName: 'admisiones',
});
export default Admision;