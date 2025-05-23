import {Model, DataTypes} from 'sequelize';
import sequelize from '../config/db.js';

class Localidad extends Model {}
Localidad.init({
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    codigo: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'Localidad',
    tableName: 'localidades',
    timestamps: false
});

export default Localidad;