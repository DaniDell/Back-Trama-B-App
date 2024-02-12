const { Router } = require("express");
const {
  userCreatorHandler,
  getUserHandler,
  getAllUsersHandler,
  deleteUserByIdHandler,
  editUserHandler,
  loginUserHandler,
} = require("../handlers/usersHandlers");
const usersRouter = Router();

usersRouter.post("/create", userCreatorHandler);
usersRouter.put("/edit", editUserHandler);
usersRouter.get("/:id", getUserHandler);
usersRouter.get("/", getAllUsersHandler);
usersRouter.delete("/delete/:id", deleteUserByIdHandler);
usersRouter.post("/login", loginUserHandler); // Agrega la ruta de inicio de sesión

module.exports = usersRouter;
