require("dotenv").config();
const mongoose = require("mongoose");

const User = require("../models/User");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
if (SECRET_KEY) {
  console.log('OK');
} else {
  console.log('SECRET_KEY is not set');
}
const userCreator = async (req, res) => {
  const {
    name,
    email,
    password,
    // photo,
    // socialNetwork,
    // productiveActivity,
    // description,
    country,
    province,
    // latitude,
    // longitude,
    // videoKey,
    // mitigatedCarbonFootprint,
    // mitigatedWaterFootprint,
  } = req.body;
  try {
    const newUser = new User({
      name,
      email,
      password,
      // photo,
      // socialNetwork,
      // productiveActivity,
      // description,
      country,
      province,
      // latitude,
      // longitude,
      // videoKey,
      // mitigatedCarbonFootprint,
      // mitigatedWaterFootprint,
    });
    const response = await newUser.save();

    res.status(202).json(response);
  } catch (error) {
    console.log(error);
    if (error.name === 'MongoServerError' && error.code === 11000) {
      res
        .status(400)
        .json({ error: "El mail proporcionado ya se encuentra registrado." });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const loginUserHandler = async (req, res) => {
  try {
    // Lógica de inicio de sesión

    // Si todo va bien, envía la respuesta y retorna
    return res.json({ token, userId: user._id });
  } catch (error) {
    console.error(error);

    // Si algo sale mal, envía una respuesta de error y retorna
    return res.status(500).json({ error: 'An error occurred' });
  }
};

const editUser = async (req, res) => {
  const {
    id,
    name,
    email,
    password,
    // photo,
    // socialNetwork,
    // productiveActivity,
    // description,
    country,
    province,
    // latitude,
    // longitude,
    // videoKey,
    // mitigatedCarbonFootprint,
    // mitigatedWaterFootprint,
  } = req.body;

  try {
    // Find the user in the database by id
    const editee = await User.findById(id);

    if (!editee) {
      return res.status(401).json("No se encontró el Usuario");
    }

    editee.name = name;
    editee.email = email;
    editee.password = password;
    editee.country = country;
    editee.province = province;

    const response = await editee.save();

    return res.status(201).json("Usuario editado con éxito" + response);
  } catch (error) {
    console.error(error);
    // Do not send the response from here
    throw error; // Re-throw the error so it can be handled by the higher-level controller
  }
};

const getUser = async (req, res) => {
  const { params } = req;
  try {
    let condition = {};

    if (params.id.length !== 24) {
      condition = {
        ...condition,
        name: { $regex: new RegExp(params.id, "i") },
      };
    }

    if (params.id.length === 24) {
      condition = {
        ...condition,
        _id: new mongoose.Types.ObjectId(params.id),
      };
    }

    const response = await User.find(condition);
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const response = await User.find();
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: error.message });
  }
};

const deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await User.findById(id);
    if (response) {
      await response.deleteOne();
      res.status(201).json("Se ha eliminado el Usuario");
    } else {
      res.status(501).json("No se encontró el Usuario");
    }
  } catch (error) {
    console.log(error);
    res.status(401).json("Falló alguna otra cosa");
  }
};
module.exports = {
  userCreator,
  loginUser,
  editUser,
  getUser,
  getAllUsers,
  deleteUserById,
};
