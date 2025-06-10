// config/sessionStore.js

// 1. Importa 'session' de express-session aquí también.
import session from 'express-session';
// 2. Importa la fábrica. Le cambié el nombre para que sea más claro.
import MySQLStoreFactory from 'express-mysql-session';
import dbPool from './dbPool.js'; // Asegúrate que el nombre del archivo sea dbPool.js

// 3. Llama a la fábrica y pásale 'session' para obtener la clase real.
const MySQLStore = MySQLStoreFactory(session);

// Opciones para el almacén de sesiones (esto está bien).
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

// 4. Ahora sí, crea la instancia con la clase que te devolvió la fábrica.
// Esta línea ya no dará error.
const sessionStore = new MySQLStore(options, dbPool);

export default sessionStore;