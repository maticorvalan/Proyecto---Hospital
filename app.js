import express from 'express';
import path from 'path';
import models from './models/index.js';


const app = express();
const router = express.Router();
const PORT = process.env.PORT || 3000;
import indexRouter from './routes/index.js';
import admisionRouter from './routes/admision.js';

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));
app.use("/images", express.static("images"));
app.use(express.urlencoded({}));
app.use(express.json());
app.use('/', indexRouter);
app.use('/admision', admisionRouter);


// app.get(['/', '/inicio'], (req, res) => {
//   res.render('index', {});
// });

app.get('/login', (req, res) => {
  res.render('auth/login', {});
});

// app.get('/admision/pacientes/pacienteNuevo', (req, res) => {
//   //res.render('admision/main', {});
//   res.render('admision/pacientes/pacienteNuevo', { title: 'Formulario de Admisión', tiposAdmision: ['urgencia', 'consulta', 'internacion'] });
// });
// app.get('/admision/pacientes/dnipaciente', (req, res) => {
//   //res.render('admision/main', {});
//   res.render('admision/pacientes/dnipaciente');
// });

// app.get('/admision/emergencia', (req, res) => {
//   //res.render('admision/main', {});
//   res.render('admision/emergencia', { title: 'Formulario de Emergencia'});
// });
// app.get('/admision/main', (req, res) => {
//   //res.render('admision/main', {});
//   res.render('admision/main', { title: 'Formulario de Consulta'});
// });

models.sequelize.sync({ alter: true })
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.');
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  })