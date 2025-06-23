import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import Sequelize from 'sequelize';
import process from 'process';
import configFile from '../config/config.json' with { type: 'json' };
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = configFile[env];

// ✅ Load DB config into environment variables
process.env.DB_NAME = config.database;
process.env.DB_USER = config.username;
process.env.DB_PASS = config.password;
process.env.DB_HOST = config.host;
process.env.DB_DIALECT = config.dialect;

const db = {};

// ✅ Connect to DB using Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
  }
);

// ✅ Dynamically load all model files
const modelFiles = fs
  .readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      !file.endsWith('.test.js')
  );

for (const file of modelFiles) {
  const modelPath = path.join(__dirname, file);
  const modelUrl = pathToFileURL(modelPath).href;

  const { default: modelDefiner } = await import(modelUrl);
  const model = modelDefiner(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
}

// ✅ Setup model associations if any
for (const modelName of Object.keys(db)) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
}

// ✅ Test DB connection
try {
  await sequelize.sync();
  console.log('✅ Database connection successful');
} catch (error) {
  console.error('❌ Database connection failed:', error);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
