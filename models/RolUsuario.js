import {Model, DataTypes} from 'sequelize';
import sequelize from '../config/db.js';

class RolUsuario extends Model {}
RolUsuario.init({
    nombre: {
        type: DataTypes.ENUM('Administrador', 'Medico', 'Enfermero', 'Recepcionista'),
        allowNull: false,
        defaultValue: 'Recepcionista'
    },
}, {
    sequelize,
    modelName: 'RolUsuario',
    tableName: 'rolusuarios',
    timestamps: false
});
export default RolUsuario;