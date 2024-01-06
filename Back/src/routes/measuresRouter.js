const { Router } = require("express");
const { measureCreatorHandler } = require("../handlers/measuresHandlers");
const measuresRouter = Router();

measuresRouter.post("/create", measureCreatorHandler);

module.exports = measuresRouter;
