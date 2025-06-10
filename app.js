import express from 'express';
import path from 'node:path';
import models from './models/index.js';
import session from 'express-session';
import flash from 'connect-flash';
import passport from 'passport';
import { configurePassport } from './config/auth.js';

const app = express();
const router = express.Router();
const PORT = process.env.PORT;

import indexRouter from './routes/index.js';
import admisionRouter from './routes/admision.js';
import authRouter from './routes/auth.js';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/images", express.static(path.join(__dirname,"images")));
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
// Middleware para Autenticacion 
app.use(passport.initialize());
app.use(passport.session());
configurePassport(passport);


app.locals.formatDate = (date) => {
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return localDate.toISOString().split('T')[0];
};

app.use('/login', authRouter);
app.use('/', indexRouter);
app.use('/admision', admisionRouter);



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

export default app;