import {Model, DataTypes} from 'sequelize';
import sequelize from '../config/db.js';


class Cama extends Model {}
Cama.init({

    numero: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idHabitacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
}, {
    sequelize,
    modelName: 'Cama',
    tableName: 'camas',
    timestamps: false,
});
export default Cama;