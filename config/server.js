// Declaration de variables
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  next();
});
app.use(
  cors({
    origin: "*",
  })
);
const routeMobileAuthentification = require("../Routes/RouteMobileAuthentification.js");
const routeWebAuthentification = require("../Routes/RouteWebAuthentification.js");
const routeGestionProfils = require("../Routes/RouteGestionProfils.js");
const routeGestionComptes = require("../Routes/RouteGestionComptes.js");
const routeFlotte = require("../Routes/RouteFlotte.js");
const routeGestionLocations = require("../Routes/RouteGestionLocations.js");
const routeStatistiques = require("../Routes/RouteStatistiques.js");
const routeGestionFactures = require("../Routes/RouteGestionFactures.js");
const routePaiement=require("../Routes/RoutePaiement.js")
const routeDemandeSupport=require("../Routes/RouteDemandeSupport.js")

// Configurer le serveur pour utiliser toutes les routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  morgan("combined", {
    stream: fs.createWriteStream(
      path.join(__dirname, "../LogFiles/logTrafic.log"),
      { flags: "a" }
    ),
  })
);
app.use("/", routeMobileAuthentification);
app.use("/", routeWebAuthentification);
app.use("/", routeGestionProfils);
app.use("/", routeGestionComptes);
app.use("/", routeFlotte);
app.use("/", routeGestionLocations);
app.use("/",routeStatistiques);
app.use("/", routeGestionFactures);
app.use("/",routePaiement)
app.use("/",routeDemandeSupport)
app.get("/", (req, res) => {
  res.send("Autotek Web server");
});

// Demarrer le serveur
app.listen(port, () => console.log(`Server running on port ${port} ...`));

module.exports = {
  app,
};
