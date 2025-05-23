import express from 'express';
import path from 'path';
import models from './models/index.js';


const app = express();
const router = express.Router();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));
app.use("/images", express.static("images"));
app.use(express.urlencoded({}));
app.use(express.json());


app.get(['/', '/inicio'], (req, res) => {
  res.render('index', {});
});

app.get('/login', (req, res) => {
  res.render('auth/login', {});
});

app.get('/admision/main', (req, res) => {
  //res.render('admision/main', {});
  res.render('admision/main', { title: 'Formulario de Admisión', tiposAdmision: ['urgencia', 'consulta', 'internacion'] });
});

models.sequelize.sync({ force: true })
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.');
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  })