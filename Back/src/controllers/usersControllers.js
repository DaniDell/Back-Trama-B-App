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

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error(
        "No se encontró ningún usuario con ese correo electrónico."
      );
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new Error("Contraseña incorrecta.");
    }

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "6h" });

    // Establece el estado a 200 (OK) y devuelve el token y el ID del usuario en la respuesta
    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    console.error(error);
    // Establece el estado a 500 (Error interno del servidor) antes de lanzar el error
    res.status(500);
    throw error;
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
