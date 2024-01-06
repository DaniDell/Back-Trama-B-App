const { measureCreator } = require("../controllers/measuresControllers");

const measureCreatorHandler = async (req, res) => {
  try {
    const response = await measureCreator(req, res);
    res.status(201).json(response);
  } catch (error) {
    res.status(401).json("Devolución sin cargar");
  }
};

module.exports = { measureCreatorHandler };
