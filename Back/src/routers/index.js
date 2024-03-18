const { Router } = require("express");
const usersRouter = require("./usersRouter");
const measuresRouter = require("./measuresRouter");

const router = Router();

router.use("/users", usersRouter);
router.use("/measures", measuresRouter);

router.get("/", (req, res) => {
    res.send("Backend is working con MongoDb!");
  });

module.exports = router;
