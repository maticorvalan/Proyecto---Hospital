import Usuario from "../models/Usuario.js";
import RolUsuario from "../models/RolUsuario.js";
import bcrypt from 'bcrypt';
import { Op } from "sequelize";

async function login(req, res) {
    console.log('Mensaje flash en res.locals.error_msg:', res.locals.error_msg);
    res.render('auth/login',{
        title: 'Login de Usuario',
    })
}

export default {
    login
}