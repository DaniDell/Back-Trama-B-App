const { DataTypes } = require("sequelize");
const bcrypt = require('bcrypt');
const saltRounds = process.env.BCRYPT_SALT_ROUNDS;

module.exports = (sequelize) => {
  const User = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      photo: { type: DataTypes.STRING },
      socialNetwork: { type: DataTypes.STRING },
      productiveActivity: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      description: {
        type: DataTypes.STRING(200),
      },
      country: DataTypes.STRING,
      province: DataTypes.STRING,
      latitude: DataTypes.FLOAT,
      longitude: DataTypes.FLOAT,
      videoKey: DataTypes.STRING,
      mitigatedCarbonFootprint: DataTypes.FLOAT,
      mitigatedWaterFootprint: DataTypes.FLOAT,
    },
    { 
      timestamps: false,
      hooks: {
        beforeCreate: async (user) => {
          const salt = await bcrypt.genSalt(saltRounds);
          user.password = await bcrypt.hash(user.password, salt);
        },
        beforeUpdate: async (user) => {
          if (user.changed('password')) {
            const salt = await bcrypt.genSalt(saltRounds);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
      }
    }
  );

  User.prototype.isValidPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  }

  User.prototype.toJSON = function () {
    const values = { ...this.get() };
    delete values.password;
    return values;
  };

  return User;
};