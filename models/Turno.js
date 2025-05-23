import {Model, DataTypes} from 'sequelize';
import sequelize from '../config/db.js';

class Turno extends Model {}
Turno.init({
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false
    },
    idPaciente: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    medico: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
}, {
    sequelize,
    modelName: 'Turno',
    tableName: 'turnos',
});
export default Turno;