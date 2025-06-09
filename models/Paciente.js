import {Model, DataTypes} from 'sequelize';
import sequelize from '../config/db.js';

class Paciente extends Model {}
Paciente.init({
    dni: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: 'unique_dni',
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
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue:'1900-01-01', // Fecha por defecto si no se proporciona
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: true
    },
    telefonoEmer:{
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
        defaultValue: 24 // No tiene provincia por defecto
    },
    idMutual: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0 // No tiene mutual por defecto
    }
    
}, {
    sequelize,
    modelName: 'Paciente',
    tableName: 'pacientes',
    indexes: [
        {
            name: 'unique_dni',
            unique: true,
            fields: ['dni']
        }
    ]
});



export default Paciente;