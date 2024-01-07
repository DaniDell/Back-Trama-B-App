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
const measureEditor = async (req, res) => {
  const {
    id,
    userId,
    deliveryDate,
    managedCottonBaseKg,
    managedPolyesterBaseKg,
    managedMixBaseKg,
    carbonFootprintResult,
    waterFootprintResult,
  } = req.body;
  try {
    const editee = await findByPk(id);
    if (!editee) {
      res
        .status(401)
        .json("No se encontró el regístro que se desea actualizar");
    }
    const response = await Measure.update({
      userId,
      deliveryDate,
      managedCottonBaseKg,
      managedPolyesterBaseKg,
      managedMixBaseKg,
      carbonFootprintResult,
      waterFootprintResult,
    });
    res.status(202).json(response + "Regístro editado con éxito");
  } catch (error) {
    console.log(error);
    res.status(402).json({ error: message.error });
  }
};
const getMeasure = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await findByPk(id);
    res.status(201).json(response);
  } catch (error) {
    res.status(401).json({ error: message.error });
  }
};
const getAllByX = async (req, res) => {
  const {
    userId,
    deliveryDate,
    managedCottonBaseKg,
    managedPolyesterBaseKg,
    managedMixBaseKg,
  } = req.body;
  try {
    if (userId) {
      const response = await findAll({ where: userId });
      res.status(201).json(response);
    }
    if (deliveryDate) {
      const response = await findAll({ where: deliveryDate });
      res.status(201).json(response);
    }
    if (managedCottonBaseKg) {
      const response = await findAll({ where: managedCottonBaseKg });
      res.status(201).json(response);
    }
    if (managedPolyesterBaseKg) {
      const response = await findAll({ where: managedPolyesterBaseKg });
      res.status(201).json(response);
    }
    if (managedMixBaseKg) {
      const response = await findAll({ where: managedMixBaseKg });
      res.status(201).json(response);
    }
  } catch (error) {
    res.status(401).json({ error: message.error });
  }
};
module.exports = { measureCreator, measureEditor, getMeasure, getAllByX };
