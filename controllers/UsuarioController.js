import Usuario from "../models/Usuario";
import Admision from "../models/Admision";
import RolUsuario from "../models/RolUsuario";
import { Op } from "sequelize";

async function listarUsuarios(req, res) {
    try {
        const usuarios = await Usuario.findAll({
            include: [RolUsuario]
        });
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        res.status(500).json({ error: "Error al obtener los usuarios" });
    }
}

