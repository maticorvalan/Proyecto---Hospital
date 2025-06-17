// models/db.js
import { Sequelize } from "sequelize";
import 'dotenv/config'
import mysql2 from 'mysql2';

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    dialectModule: mysql2,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    logging: false
});


export default sequelize;
