const { Router } = require("express");
const {
  userCreatorHandler,
  getUserHandler,
  getAllUsersHandler,
  deleteUserByIdHandler,
  editUserHandler,
} = require("../handlers/usersHandlers");
const usersRouter = Router();

usersRouter.post("/create", userCreatorHandler);
usersRouter.put("/edit", editUserHandler);
usersRouter.get("/:id", getUserHandler);
usersRouter.get("/", getAllUsersHandler);
usersRouter.delete("/delete/:id", deleteUserByIdHandler);

module.exports = usersRouter;
