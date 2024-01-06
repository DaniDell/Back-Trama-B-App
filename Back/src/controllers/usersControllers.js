const { User, conn } = require("../db");

const userCreator = async (req, res) => {
  const {
    name,
    email,
    password,
    photo,
    socialNetwork,
    productiveActivity,
    description,
    country,
    province,
    latitude,
    longitude,
    videoKey,
    mitigatedCarbonFootprint,
    mitigatedWaterFootprint,
  } = req.body;
  try {
    const response = await User.create({
      name,
      email,
      password,
      photo,
      socialNetwork,
      productiveActivity,
      description,
      country,
      province,
      latitude,
      longitude,
      videoKey,
      mitigatedCarbonFootprint,
      mitigatedWaterFootprint,
    });
    res.status(202).json(response);
  } catch (error) {
    console.log(error);
    res.status(402).json({ error: message.error });
  }
};
module.exports = { userCreator };
