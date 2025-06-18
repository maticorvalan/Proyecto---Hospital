// config/sessionStore.js

import session from 'express-session';
// 2. Importa la fábrica
import MySQLStoreFactory from 'express-mysql-session';
import dbPool from './dbPool.js';

// 3. Llama a la fábrica y pásale 'session' para obtener la clase real.
const MySQLStore = MySQLStoreFactory(session);

// Opciones para el almacén de sesiones
const options = {
  createDatabaseTable: true,
  schema: {
    tableName: 'sessions',
    columnNames: {
      session_id: 'session_id',
      expires: 'expires',
      data: 'data'
    }
  }
};

const sessionStore = new MySQLStore(options, dbPool);

export default sessionStore;