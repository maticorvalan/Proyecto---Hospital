import {Model, DataTypes} from 'sequelize';
import sequelize from '../config/db.js';

class EstadoAdmision extends Model {}
EstadoAdmision.init({
    nombre: {
        type: DataTypes.ENUM('Esperando Cama', 'Aceptado', 'Rechazado'),
        allowNull: false,
        defaultValue: 'Esperando Cama',
    },
}, {
    sequelize,
    modelName: 'EstadoAdmision',
    tableName: 'estado_admision',
    timestamps: false
});
export default EstadoAdmision;