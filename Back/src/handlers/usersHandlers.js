const {
  userCreator,
  getUser,
  getAllUsers,
  deleteUserById,
  editUser,
  loginUser,
} = require("../controllers/usersControllers");

const userCreatorHandler = async (req, res) => {
  try {
    const response = await userCreator(req, res);
    res.status(201).json(response);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ error: 'El mail registrado ya se encuentra ingresado en nuestra base de datos.' });
    } else {
      res.status(500).json({ error: 'Ha ocurrido un error inesperado.' });
    }
  }
};

const editUserHandler = async (req, res) => {
  try {
    const response = await editUser(req, res);
    // No es necesario enviar una respuesta aquí
  } catch (error) {
    res.status(401).json("Usuario no editado");
  }
};



const getUserHandler = async (req, res) => {
  try {
    const response = await getUser(req, res);
    res.status(201).json(response);
  } catch (error) {
    res.status(401).json("Usuario no encontrado");
  }
};
const getAllUsersHandler = async (req, res) => {
  try {
    const response = await getAllUsers(req, res);
    res.status(201).json(response);
  } catch (error) {
    res.status(401).json("Usuario no encontrado");
  }
};
const deleteUserByIdHandler = async (req, res) => {
  try {
    const response = await deleteUserById(req, res);
    res.status(201).json(response);
  } catch (error) {
    res.status(401).json("Usuario no borrado");
  }
};
const loginUserHandler = async (req, res) => {
  try {
    const user = await loginUser(req, res);
    res.status(200).json(user.toJSON()); // Llama a toJSON aquí
  } catch (error) {
    if (error.message === 'No se encontró ningún usuario con ese correo electrónico.' || error.message === 'Contraseña incorrecta.') {
      res.status(401).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Ha ocurrido un error inesperado.' });
    }
  }
};;

module.exports = {
  userCreatorHandler,
  editUserHandler,
  getUserHandler,
  getAllUsersHandler,
  deleteUserByIdHandler,
  loginUserHandler,
};
