// Declaration de variables
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");

// Configurer le serveur pour travailler avec JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurer la politique de securite pour l'acces au serveur
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

// Declaration de toutes les routes
const routeMobileAuthentification = require("../Routes/RouteMobileAuthentification.js");
const routeWebAuthentification = require("../Routes/RouteWebAuthentification.js");
const routeGestionProfils = require("../Routes/RouteGestionProfils.js");
const routeGestionComptes = require("../Routes/RouteGestionComptes.js");
const routeFlotte = require("../Routes/RouteFlotte.js");
const routeMailing = require("../Routes/RouteMailing");
const routeGestionLocations = require("../Routes/RouteGestionLocations.js");
const routeStatistiques = require("../Routes/RouteStatistiques.js");
const routeGestionFactures = require("../Routes/RouteGestionFactures.js");
const routePaiement = require("../Routes/RoutePaiement.js");

// Configurer le serveur pour utiliser morgan
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

// Configurer le serveur pour utiliser toutrs les routes
app.use("/", routeMobileAuthentification);
app.use("/", routeWebAuthentification);
app.use("/", routeGestionProfils);
app.use("/", routeGestionComptes);
app.use("/", routeFlotte);
app.use("/", routeMailing);
app.use("/", routeGestionLocations);
app.use("/", routeStatistiques);
app.use("/", routeGestionFactures);
app.use("/", routePaiement);
app.get("/", (req, res) => {
  res.send("Autotek Web server");
});

// Demarrer le serveur sur le port 3000
app.listen(port, () => console.log("Server running on port 3000 ..."));

// Exporter l'instance de l'application créé
module.exports = {
  app,
};
