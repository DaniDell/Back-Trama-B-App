require("dotenv").config();
const { createServer } = require("node:http");
const app = require("./server");
const PORT = process.env.PORT || 3002;

const mongoose = require("mongoose");
// const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
// const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const connectionAddress = `mongodb+srv://tramabtextil:cPU9hvL7NLrQpnBf@tramab.yr30zqd.mongodb.net/`;

// Conecta a MongoDB primero
mongoose
  .connect(connectionAddress)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Error connection", error);
  });
