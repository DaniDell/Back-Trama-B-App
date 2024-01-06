const { Measure } = require("../db");

const measureCreator = async (req, res) => {
  const {
    userId,
    deliveryDate,
    managedCottonBaseKg,
    managedPolyesterBaseKg,
    managedMixBaseKg,
    carbonFootprintResult,
    waterFootprintResult,
  } = req.body;
  try {
    const response = await Measure.create({
      userId,
      deliveryDate,
      managedCottonBaseKg,
      managedPolyesterBaseKg,
      managedMixBaseKg,
      carbonFootprintResult,
      waterFootprintResult,
    });
    res.status(202).json(response);
  } catch (error) {
    console.log(error);
    res.status(402).json({ error: message.error });
  }
};
module.exports = { measureCreator };
