const mongoose = require("mongoose");

const measureSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  deliveryDate: {
    type: Date,
    required: true,
  },
  managedCottonBaseKg: {
    type: Number,
    required: true,
  },
  managedPolyesterBaseKg: {
    type: Number,
    required: true,
  },
  managedMixBaseKg: {
    type: Number,
    required: true,
  },
  carbonFootprintResult: {
    type: Number,
    required: true,
  },
  waterFootprintResult: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("Measure", measureSchema);
