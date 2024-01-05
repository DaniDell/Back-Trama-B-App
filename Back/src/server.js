const express = require('express');
const app = express();
app.use(express.json());

// Aquí puedes definir tus rutas, por ejemplo:
// const routes = require('./routes');
// app.use(routes);

module.exports = app;