import {Model, DataTypes} from 'sequelize';
import sequelize from '../config/db.js';

class TipoAdmision extends Model {}
TipoAdmision.init({
    nombre: {
        type: DataTypes.ENUM('Emergencia','Turno','Derivado'),
        allowNull: false,
        defaultValue: 'Emergencia',
    },
}, {
    sequelize,
    modelName: 'TipoAdmision',
    tableName: 'tiposadmision',
    timestamps: false
});
export default TipoAdmision;