const { Router } = require("express");
const {
  measureCreatorHandler,
  measureEditorHandler,
  getMeasureHandler,
  getAllByXHandler,
} = require("../handlers/measuresHandlers");
const authenticateUser = require('../middlewares/authMiddleware'); // Importar authenticateUser se usa en todas las rutas
const measuresRouter = Router();

measuresRouter.post("/create", authenticateUser, measureCreatorHandler);
measuresRouter.put("/edit", authenticateUser, measureEditorHandler);
measuresRouter.get("/getby",authenticateUser,  getAllByXHandler);
measuresRouter.get("/:id", authenticateUser, getMeasureHandler);

module.exports = measuresRouter;
