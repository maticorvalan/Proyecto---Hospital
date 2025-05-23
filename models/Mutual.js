import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.js";

class Mutual extends Model { }
Mutual.init({
    nombre: {
        type: DataTypes.ENUM('DOSEP', 'OSDE', 'PAMI', 'IOMA',
            'Federada Salud', 'Galeno', 'Swiss Medical', 'Sancor Salud'),
        allowNull: false
    },
    idTipoMutual: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Mutual',
    tableName: 'mutuales',
});
export default Mutual;