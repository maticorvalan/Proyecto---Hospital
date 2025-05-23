import {Model, DataTypes} from 'sequelize';
import sequelize from '../config/db.js';


class Internacion extends Model {}
Internacion.init({
    fechaIngreso: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fechaSalida: {
        type: DataTypes.DATE,
        allowNull: true
    },
    idAdmision: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    idCama: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Internacion',
    tableName: 'internaciones',
    timestamps: false,
});
export default Internacion;