import {Model, DataTypes} from 'sequelize';
import sequelize from '../config/db.js';

class Genero extends Model {}
Genero.init({
    nombre: {
        type: DataTypes.ENUM('Masculino', 'Femenino','No Binario', 'No especificado'),
        allowNull: false,
        defaultValue: 'No especificado'
    },
}, {
    sequelize,
    modelName: 'Genero',
    tableName: 'generos',
    timestamps: false
});
export default Genero;