const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('user', {
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
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        photo: DataTypes.STRING,
        socialNetwork: DataTypes.STRING,
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
    },{timestamps: false});
};
