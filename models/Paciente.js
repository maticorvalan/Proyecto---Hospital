import {Model, DataTypes} from 'sequelize';
import sequelize from '../config/db.js';

class Paciente extends Model {}
Paciente.init({
    dni: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha_nacimiento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: true
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        },
        allowNull: true
    },
    idGenero: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    idProvincia: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    idMutual: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
    
}, {
    sequelize,
    modelName: 'Paciente',
    tableName: 'pacientes',
});



export default Paciente;