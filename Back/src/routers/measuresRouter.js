const { Router } = require("express");
const {
  measureCreatorHandler,
  measureEditorHandler,
  getMeasureHandler,
  getAllByUserIdHandler,
  // getAllByXHandler,
  deleteMeasureHandler,
} = require("../handlers/measuresHandlers");
const authenticateUser = require("../middlewares/authMiddleware"); // Importar authenticateUser se usa en todas las rutas
const measuresRouter = Router();

measuresRouter.post("/create", authenticateUser, measureCreatorHandler);
measuresRouter.put("/edit", authenticateUser, measureEditorHandler);
measuresRouter.get("/getby",  getAllByUserIdHandler);
// measuresRouter.get("/getbyX", authenticateUser, getAllByXHandler);
measuresRouter.get("/:id", authenticateUser, getMeasureHandler);
measuresRouter.delete("/:id", authenticateUser, deleteMeasureHandler);

module.exports = measuresRouter;
