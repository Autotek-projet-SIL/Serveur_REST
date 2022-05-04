// Declaration de variables
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 4000;
const routeMobileAuthentification = require("../Routes/RouteMobileAuthentification.js");
const routeWebAuthentification = require("../Routes/RouteWebAuthentification.js");
const routeGestionProfils = require("../Routes/RouteGestionProfils.js");
const routeGestionComptes = require("../Routes/RouteGestionComptes.js");
const routeFlotte = require("../Routes/RouteFlotte.js");
const routeGestionLocations = require("../Routes/RouteGestionLocations.js");
const routeStatistiques = require("../Routes/RouteStatistiques.js");
const routeGestionFactures = require("../Routes/RouteGestionFactures.js");
const routePaiement=require("../Routes/RoutePaiement.js")

// Configurer le serveur pour utiliser toutes les routes
app.use("/", routeMobileAuthentification);
app.use("/", routeWebAuthentification);
app.use("/", routeGestionProfils);
app.use("/", routeGestionComptes);
app.use("/", routeFlotte);
app.use("/", routeGestionLocations);
app.use("/",routeStatistiques);
app.use("/", routeGestionFactures);
app.use("/",routePaiement)
app.get("/", (req, res) => {
  res.send("Autotek Web server");
});

// Demarrer le serveur
app.listen(port, () => console.log("Server running on port 3000 ..."));

module.exports = {
  app,
};