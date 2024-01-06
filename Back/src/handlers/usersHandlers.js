const { userCreator } = require("../controllers/usersControllers");

const userCreatorHandler = async (req, res) => {
  try {
    const response = await userCreator(req, res);
    res.status(201).json(response);
  } catch (error) {
    res.status(401).json("Usuario sin postear");
  }
};

module.exports = { userCreatorHandler };
