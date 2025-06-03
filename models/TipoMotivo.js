import {Model,DataTypes} from 'sequelize';
import sequelize from '../config/db.js';

class TipoMotivo extends Model {}

TipoMotivo.init({
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'TipoMotivo',
    tableName: 'tipos_motivo',
    timestamps: false
});

export default TipoMotivo;
