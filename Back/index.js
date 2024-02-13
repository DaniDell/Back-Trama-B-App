require("dotenv").config();

const server = require("./src/server.js");
const { conn } = require("./src/db.js");
const { Client } = require('pg');
const port = process.env.PORT || 3002;

// Crea un nuevo cliente de PostgreSQL
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

// Intenta conectarte a la base de datos
client.connect(err => {
  if (err) {
    console.error('Error de conexión', err.stack);
  } else {
    console.log('Conectado exitosamente');
  }
});

// Syncing all the models at once.
conn
  .sync({ alter: true })
  .then(() => {
    server.listen(port, () => {
      console.log(`Server at ${port}`); // eslint-disable-line no-console
      console.log("Running on port ", port);
    });
  })
  .catch((error) => {
    console.error("Unable to sync models:", error);
  });