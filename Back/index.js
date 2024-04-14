require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const server = express();
const { createServer } = require("node:http");
const PORT = process.env.PORT || 3002;



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

const httpServer = createServer(server);


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

  httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});