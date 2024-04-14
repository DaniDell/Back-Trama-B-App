require('dotenv').config();
const server = require("./src/server");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3002;

const allowedOrigins = ['https://hebra-circular.vercel.app', process.env.LOCAL_URL];

server.use((req, res, next) => {
  const origin = req.headers.origin;
  console.log(`Origin: ${origin}`); // Imprimir el origen de la solicitud

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    console.log(`Access-Control-Allow-Origin set to ${origin}`); // Imprimir la cabecera que se está estableciendo
  }

  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

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

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});