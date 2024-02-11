const {
  userCreator,
  getUser,
  getAllUsers,
  deleteUserById,
  editUser,
} = require("../controllers/usersControllers");

const userCreatorHandler = async (req, res) => {
  try {
    const response = await userCreator(req, res);
    res.status(201).json(response);
  } catch (error) {
    res.status(401).json("Usuario sin postear");
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

module.exports = {
  userCreatorHandler,
  editUserHandler,
  getUserHandler,
  getAllUsersHandler,
  deleteUserByIdHandler,
};
