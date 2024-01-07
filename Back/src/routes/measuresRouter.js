const { Router } = require("express");
const {
  measureCreatorHandler,
  measureEditorHandler,
  getMeasureHandler,
  getAllByXHandler,
} = require("../handlers/measuresHandlers");
const measuresRouter = Router();

measuresRouter.post("/create", measureCreatorHandler);
measuresRouter.put("/edit", measureEditorHandler);
measuresRouter.get("/:id", getMeasureHandler);
measuresRouter.get("/getby", getAllByXHandler);

module.exports = measuresRouter;
