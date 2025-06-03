import {Model, DataTypes} from 'sequelize';
import sequelize from '../config/db.js';

class Usuario extends Model {}
Usuario.init({
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        },
        allowNull: false,
        unique: 'unique_email'
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idRolUsuario: {
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
    modelName: 'Usuario',
    tableName: 'usuarios',
    indexes: [
        {
            name: 'unique_email',
            unique: true,
            fields: ['email']
        }
    ],
});
export default Usuario;