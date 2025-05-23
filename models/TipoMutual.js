import {Model, DataTypes} from 'sequelize';
import sequelize from '../config/db.js';

class TipoMutual extends Model {}
TipoMutual.init({
    nombre: {
        type: DataTypes.ENUM('Basico', 'Completo', 'Premium'),
        allowNull: false,
        defaultValue: 'Basico'
    }
}, {
    sequelize,
    modelName: 'TipoMutual',
    tableName: 'tipomutuales',
    timestamps: false
});
export default TipoMutual;