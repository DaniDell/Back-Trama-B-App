const { Router } = require("express");
const {
  userCreatorHandler,
  getUserHandler,
  getAllUsersHandler,
  deleteUserByIdHandler,
  editUserHandler,
  loginUserHandler,
} = require("../handlers/usersHandlers");
const authenticateUser = require('../middlewares/authMiddleware'); // Importar authenticateUser
const usersRouter = Router();

usersRouter.post("/create", userCreatorHandler);
usersRouter.put("/edit", authenticateUser, editUserHandler); // Usar authenticateUser en la ruta de edición
usersRouter.get("/:id", authenticateUser, getUserHandler); // Usar authenticateUser en la ruta de obtener usuario por ID
usersRouter.get("/", authenticateUser, getAllUsersHandler); // Usar authenticateUser en la ruta de obtener todos los usuarios
usersRouter.delete("/delete/:id", authenticateUser, deleteUserByIdHandler); // Usar authenticateUser en la ruta de eliminación
usersRouter.post("/login", loginUserHandler); // Agrega la ruta de inicio de sesión

module.exports = usersRouter;
