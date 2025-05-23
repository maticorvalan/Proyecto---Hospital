import {Model, DataTypes} from 'sequelize';
import sequelize from '../config/db.js';

class Provincia extends Model {}
Provincia.init({
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    codigo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idLocalidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Provincia',
    tableName: 'provincias',
    timestamps: false
});
export default Provincia;