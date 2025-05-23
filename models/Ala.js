import {Model, DataTypes} from 'sequelize';
import sequelize from '../config/db.js';

class Ala extends Model {}
Ala.init({
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'Ala',
    tableName: 'alas',
    timestamps: false,
});
export default Ala;