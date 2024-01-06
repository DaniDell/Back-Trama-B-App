const { Router } = require("express");
const usersRouter = require("./usersRouter");
const measuresRouter = require("./measuresRouter");

const router = Router();

router.use("/users", usersRouter);
router.use("/measures", measuresRouter);

module.exports = router;
