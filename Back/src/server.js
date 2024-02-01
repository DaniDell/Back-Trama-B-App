const express = require("express");
const router = require("./routers/index");
// const { auth } = require("express-oauth2-jwt-bearer");
const app = express();

// const jwtCheck = auth({
//   audience: "tramabtextil@gmail.com",
//   issuerBaseURL: "https://dev-qdibpp58r7xpjz3z.uk.auth0.com/",
//   tokenSigningAlg: "RS256",
// });
// enforce on all endpoints
// app.use(jwtCheck);
app.use(express.json());
// app.get("/authorized", function (req, res) {
// res.send("Secured Resource");
// });

app.use(router);

module.exports = app;
