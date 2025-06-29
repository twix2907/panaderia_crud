
require('dotenv').config();
const sql = require('mssql');

const config = {
  user: process.env.DB_USER, // ejemplo: adminuser@tu-servidor
  password: process.env.DB_PASS,
  server: process.env.DB_SERVER, // ejemplo: mipanaderia.database.windows.net
  database: process.env.DB_NAME,
  options: {
    encrypt: true, // Requerido para Azure
    trustServerCertificate: false // true solo para desarrollo local
  }
};

async function getConnection() {
  try {
    const pool = await sql.connect(config);
    return pool;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  sql,
  getConnection
};
