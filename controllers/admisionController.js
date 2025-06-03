import Admision from '../models/Admision.js';
import Paciente from '../models/Paciente.js';
import Mutual from '../models/Mutual.js';
import TipoMutual from '../models/TipoMutual.js';
import TipoAdmision from '../models/TipoAdmision.js';
import {Op} from 'sequelize';


async function pagina(req, res) {
    res.render('admision/main')};


async function nuevo(req, res) {
    const tipoAdmision = await TipoAdmision.findAll({ where: { id: { [Op.gt]: 1 } } }); // Excluye el tipo de admisión "Emergencia"
    res.render('admision/nuevaAdmision', { tipoAdmision: tipoAdmision});
}


export default {
    pagina,
    nuevo
};