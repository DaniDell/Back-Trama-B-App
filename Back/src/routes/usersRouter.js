const { Router } = require("express");
const { userCreatorHandler } = require("../handlers/usersHandlers");
const usersRouter = Router();

usersRouter.post("/create", userCreatorHandler);

module.exports = usersRouter;
