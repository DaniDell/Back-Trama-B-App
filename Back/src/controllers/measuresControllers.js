const { Measure } = require("../db");
const { Op } = require("sequelize");

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
    managedCottonBaseKg,
    managedPolyesterBaseKg,
    managedMixBaseKg,
    carbonFootprintResult,
    waterFootprintResult,
  } = req.body;
  try {
    const editee = await Measure.findByPk(id);
    if (!editee) {
      res
        .status(401)
        .json("No se encontró el registro que se desea actualizar");
    }
    const response = await Measure.update({
      userId,
      managedCottonBaseKg,
      managedPolyesterBaseKg,
      managedMixBaseKg,
      carbonFootprintResult,
      waterFootprintResult,
    });
    res.status(202).json(response + "registro editado con éxito");
  } catch (error) {
    console.log(error);
    res.status(402).json({ error: message.error });
  }
};
const getMeasure = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Measure.findByPk(id);
    res.status(201).json(response);
  } catch (error) {
    res.status(401).json({ error: message.error });
  }
};
const getAllByX = async (req, res) => {
  const {
    userId,
    startDate,
    endDate,
    managedCottonBaseKg,
    managedPolyesterBaseKg,
    managedMixBaseKg,
  } = req.body;

  try {
    if (userId) {
      const response = await Measure.findAll({ where: { userId: userId } });
      res.status(201).json(response);
    }
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
      console.log(start);
      console.log(end);

      const response = await Measure.findAll({
        where: {
          createdAt: {
            [Op.between]: [start, end],
          },
        },
      });
      console.log(response);
      res.status(201).json(response);
    }

    if (managedCottonBaseKg) {
      const response = await Measure.findAll({
        where: { managedCottonBaseKg: managedCottonBaseKg },
      });
      res.status(201).json(response);
    }
    if (managedPolyesterBaseKg) {
      const response = await Measure.findAll({
        where: { managedPolyesterBaseKg: managedPolyesterBaseKg },
      });
      res.status(201).json(response);
    }
    if (managedMixBaseKg) {
      const response = await Measure.findAll({
        where: { managedMixBaseKg: managedMixBaseKg },
      });
      res.status(201).json(response);
    }
  } catch (error) {
    console.log(error);
    res.status(402).json({ error: message.error });
  }
};
module.exports = { measureCreator, measureEditor, getMeasure, getAllByX };
