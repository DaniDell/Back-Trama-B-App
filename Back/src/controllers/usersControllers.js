const { Op } = require("sequelize");
const { User, conn } = require("../db");
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar al usuario en la base de datos
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error('No se encontró ningún usuario con ese correo electrónico.');
    }

    // Comparar la contraseña proporcionada con la almacenada en la base de datos
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new Error('Contraseña incorrecta.');
    }

    // Si todo va bien, generar un token JWT para el usuario
    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });

    // Devolver el token
    return token;

  } catch (error) {
    console.error(error);
    throw new Error('Error al iniciar sesión.');
  }
};

const userCreator = async (req, res) => {
  const {
    name,
    email,
    password,
    photo,
    socialNetwork,
    productiveActivity,
    description,
    country,
    province,
    latitude,
    longitude,
    videoKey,
    mitigatedCarbonFootprint,
    mitigatedWaterFootprint,
  } = req.body;
  try {
    const response = await User.create({
      name,
      email,
      password,
      photo,
      socialNetwork,
      productiveActivity,
      description,
      country,
      province,
      latitude,
      longitude,
      videoKey,
      mitigatedCarbonFootprint,
      mitigatedWaterFootprint,
    });
    res.status(202).json(response);
  } catch (error) {
    console.log(error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ error: 'El mail proporcionado ya se encuentra registrado.' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const editUser = async (req, res) => {
  const {
    id,
    name,
    email,
    password,
    photo,
    socialNetwork,
    productiveActivity,
    description,
    country,
    province,
    latitude,
    longitude,
    videoKey,
    mitigatedCarbonFootprint,
    mitigatedWaterFootprint,
  } = req.body;
  try {
    const editee = await User.findByPk(id);
    if (!editee) {
      return res.status(401).json("No se encontró el Usuario");
    }
    const response = await editee.update({
      name,
      email,
      password,
      photo,
      socialNetwork,
      productiveActivity,
      description,
      country,
      province,
      latitude,
      longitude,
      videoKey,
      mitigatedCarbonFootprint,
      mitigatedWaterFootprint,
    });
    // Enviar la respuesta desde editUser
    return res.status(201).json("Usuario editado con éxito");
  } catch (error) {
    console.log(error);
    // No envíes la respuesta desde aquí
    throw error; // Re-lanza el error para que pueda ser manejado por el controlador superior
  }
};



const getUser = async (req, res) => {
  const { params } = req;

  try {
    let condition = {};

    if (params.id.length !== 36) {
      condition = {
        ...condition,
        name: {
          [Op.iLike]: `%${params.id}%`,
        },
      };
    }

    if (params.id.length == 36) {
      condition = {
        ...condition,
        id: {
          [Op.eq]: params.id,
        },
      };
    }

    const response = await User.findAll({ where: condition });
    res.status(201).json(response);
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const response = await User.findAll();
    res.status(201).json(response);
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: error.message });
  }
};

const deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await User.findByPk(id);
    if (response) {
      await response.destroy();
      res.status(201).json("Se ha eliminado el Usuario");
    }
    if (!response) {
      res.status(501).json("No se encontró el Usuario");
    }
  } catch (error) {
    console.log(error);
    res.status(401).json("Falló alguna otra cosa");
  }
};
module.exports = {
  userCreator,
  editUser,
  getUser,
  getAllUsers,
  deleteUserById,
  loginUser,
};
