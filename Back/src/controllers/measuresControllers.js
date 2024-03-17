const Measure = require("../models/Measure");
// const { Op } = require("sequelize");
const mongoose = require("mongoose");

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
    const newMeasure = new Measure({
      userId,
      deliveryDate,
      managedCottonBaseKg,
      managedPolyesterBaseKg,
      managedMixBaseKg,
      carbonFootprintResult,
      waterFootprintResult,
    });
    const response = await newMeasure.save({
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
    console.log(5555);
    res.status(401).json({ error: message.error });
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
    const editee = await Measure.findById(id);
    if (!editee) {
      return res
        .status(404)
        .json("No se encontró el registro que se desea actualizar");
    }
    editee.userId = userId;
    editee.managedCottonBaseKg = managedCottonBaseKg;
    editee.managedPolyesterBaseKg = managedPolyesterBaseKg;
    editee.managedMixBaseKg = managedMixBaseKg;
    editee.carbonFootprintResult = carbonFootprintResult;
    editee.waterFootprintResult = waterFootprintResult;
    const response = await editee.save();
    res.status(200).json("Registro editado con éxito" + response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getMeasure = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Measure.findById(id);
    res.status(201).json(response);
  } catch (error) {
    res.status(401).json({ error: message.error });
  }
};
const getAllByUserId = async (req, res) => {
  const { userId } = req.body;
  try {
    const response = await Measure.find({ userId: userId });
    res.status(201).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// const getAllByX = async (req, res) => {
//   const {
//     userId,
//     startDate,
//     endDate,
//     managedCottonBaseKg,
//     managedPolyesterBaseKg,
//     managedMixBaseKg,
//   } = req.body;

//   try {
//     if (userId) {
//       const response = await Measure.findAll({ where: { userId: userId } });
//       res.status(201).json(response);
//     }
//     if (startDate && endDate) {
//       const start = new Date(startDate);
//       const end = new Date(endDate);

//       start.setHours(0, 0, 0, 0);
//       end.setHours(23, 59, 59, 999);
//       console.log(start);
//       console.log(end);

//       const response = await Measure.findAll({
//         where: {
//           createdAt: {
//             [Op.between]: [start, end],
//           },
//         },
//       });
//       console.log(response);
//       res.status(201).json(response);
//     }

//     if (managedCottonBaseKg) {
//       const response = await Measure.findAll({
//         where: { managedCottonBaseKg: managedCottonBaseKg },
//       });
//       res.status(201).json(response);
//     }
//     if (managedPolyesterBaseKg) {
//       const response = await Measure.findAll({
//         where: { managedPolyesterBaseKg: managedPolyesterBaseKg },
//       });
//       res.status(201).json(response);
//     }
//     if (managedMixBaseKg) {
//       const response = await Measure.findAll({
//         where: { managedMixBaseKg: managedMixBaseKg },
//       });
//       res.status(201).json(response);
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(402).json({ error: message.error });
//   }
// };

const deleteMeasure = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Measure.findById(id);
    if (response) {
      await response.deleteOne();
      res.status(201).json("Se ha eliminado el registro");
    } else {
      res.status(501).json("No se encontró el registro");
    }
  } catch (error) {
    console.error(error);
    res.status(402).json({ error: message.error });
  }
};

module.exports = {
  measureCreator,
  measureEditor,
  getMeasure,
  getAllByUserId,
  // getAllByX,
  deleteMeasure,
};
