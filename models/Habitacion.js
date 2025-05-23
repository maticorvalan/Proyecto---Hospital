import {Model, DataTypes} from 'sequelize';
import sequelize from '../config/db.js';

class Habitacion extends Model {}
Habitacion.init({
    numero: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idAla: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cantidadCamas: {
        type: DataTypes.ENUM('1','2'),
        allowNull: false,
        defaultValue: '1'
    },
    
}, {
    sequelize,
    modelName: 'Habitacion',
    tableName: 'habitaciones',
    timestamps: false,
});
export default Habitacion;