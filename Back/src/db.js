require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DATABASE_URL } = process.env;

console.log(DATABASE_URL);

const sequelize = new Sequelize(DATABASE_URL, {
  logging: false,
  native: false,
});


const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));



let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { User, Measure } = sequelize.models;

// Establecer las relaciones entre los modelos
User.hasMany(Measure, { foreignKey: 'userId' }); // Un usuario tiene muchas medidas
Measure.belongsTo(User, { foreignKey: 'userId' }); // Cada medida pertenece a un solo usuario

// Intentar sincronizar cada modelo individualmente
async function syncTables() {
  try {
    await User.sync();
    console.log("Tabla User creada");
    await Measure.sync();
    console.log("Tabla Measure creada");
  } catch (error) {
    console.log(error);
  }
}

syncTables();

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};