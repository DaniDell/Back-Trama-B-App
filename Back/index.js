require('dotenv').config();
const server = require("./src/server");
const mongoose = require("mongoose");
const cors = require('cors'); // Importa el paquete cors
const PORT = process.env.PORT || 3002;
const { createServer } = require("node:http");

// Configura CORS
server.options('*', cors({
  origin: ['http://localhost:5173', 'https://hebra-circular.vercel.app/'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: true
}));

// Middleware personalizado para imprimir un mensaje en la consola
server.use((req, res, next) => {
  console.log(`Received ${req.method} request from ${req.origin} for ${req.path}`);
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

const httpServer = createServer(server);

console.log(PORT);
httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});