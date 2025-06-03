// models/db.js
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  'hospitalhis',
  'root',
  '', {
  host: '192.168.1.18',
  dialect: 'mysql',
  logging: false
});

export default sequelize;
