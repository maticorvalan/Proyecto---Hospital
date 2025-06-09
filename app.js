import express from 'express';
import path from 'path';
import models from './models/index.js';
import session from 'express-session';
import flash from 'connect-flash';

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
// Configuración de la sesión
app.use(session({
  secret: 'corven',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Cambiar a true en producción
}));
app.use(flash()); // Configuración de connect-flash para mensajes flash
// Middleware para pasar mensajes flash a las vistas
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success');
  res.locals.error_msg = req.flash('error');
  res.locals.warning_msg = req.flash('warning');
  next();
});

app.locals.formatDate = (date) => {
  return date.toLocaleDateString('es-ES'); // Ajusta el locale según necesites
};

app.use('/', indexRouter);
app.use('/admision', admisionRouter);



app.get('/login', (req, res) => {
  res.render('auth/login', {});
});


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