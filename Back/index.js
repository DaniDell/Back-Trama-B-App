require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const server = express();

const PORT = process.env.PORT || 3002;

// Importa tus routers
const routers = require('./routers/index');

// Configuración de CORS
const corsOptions = {
  origin: ['https://hebra-circular.vercel.app', process.env.LOCAL_URL],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Permite cookies
  optionsSuccessStatus: 200 // Algunos navegadores antiguos (IE11, varios SmartTVs) se ahogan con 204
};

// Aplicar middleware CORS
server.use(cors(corsOptions));

// Asegúrate de que estás utilizando este middleware
server.use(express.json());

// Usa tus routers
server.use('/users', routers.usersRouter);
server.use('/measures', routers.measuresRouter);


// Middleware personalizado para imprimir un mensaje en la consola
server.use((req, res, next) => {
  console.log(`Received ${req.method} request from ${req.headers.origin} for ${req.path}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

mongoose
  .connect(
    process.env.MONGODB_URL
  )
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Error connection", error);
  });

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});