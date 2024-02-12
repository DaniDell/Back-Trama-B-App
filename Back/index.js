require("dotenv").config();

const server = require("./src/server.js");
const { conn } = require("./src/db.js");
const port = process.env.PORT || 3002;

// Syncing all the models at once.
conn
  .sync({ alter: true })
  .then(() => {
    server.listen(port, () => {
      console.log(`Server at ${port}`); // eslint-disable-line no-console
      console.log("Running on port ", port);
    });
  })
  .catch((error) => {
    console.error("Unable to sync models:", error);
  });