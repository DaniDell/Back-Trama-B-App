const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("measure", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    deliveryDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    managedCottonBaseKg: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    managedPolyesterBaseKg: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    managedMixBaseKg: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    carbonFootprintResult: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    waterFootprintResult: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });
};
