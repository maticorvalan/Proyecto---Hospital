import Usuario from "../models/Usuario.js";
import RolUsuario from "../models/RolUsuario.js";
import bcrypt from 'bcrypt';
import { Op } from "sequelize";

async function login(req, res) {
    res.render('auth/login',{
        title: 'Login de Usuario',
    })
}


async function logout(req, res) {
    try {
        req.logout(err => {
            if (err) {
                console.error('Error al cerrar sesión con Passport:', err);
                return res.status(500).send('Hubo un problema al cerrar la sesión.');
            }
            req.session.destroy(err => {
                if (err) {
                    console.error('Error al destruir la sesión:', err);
                    return res.status(500).send('Hubo un problema al cerrar la sesión.');
                }
                res.redirect('/login');
            });
        });
    } catch (error) {
        console.error('Error inesperado al cerrar sesión:', error);
        res.status(500).send('Hubo un error inesperado al cerrar la sesión.');
    }
}
export default {
    login,
    logout
}