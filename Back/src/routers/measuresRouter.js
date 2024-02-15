const { Router } = require("express");
const {
  measureCreatorHandler,
  measureEditorHandler,
  getMeasureHandler,
  getAllByXHandler,
  deleteMeasureHandler,
} = require("../handlers/measuresHandlers");
const authenticateUser = require("../middlewares/authMiddleware"); // Importar authenticateUser se usa en todas las rutas
const measuresRouter = Router();

measuresRouter.post("/create", measureCreatorHandler);
measuresRouter.put("/edit", measureEditorHandler);
measuresRouter.get("/getby", authenticateUser, getAllByXHandler);
measuresRouter.get("/:id", getMeasureHandler);
measuresRouter.delete("/:id", deleteMeasureHandler);

module.exports = measuresRouter;
