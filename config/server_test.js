// Variables Declarations
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 4000;
// Routes Declarations
const routeMobileAuthentification = require("../Routes/RouteMobileAuthentification.js");
const routeWebAuthentification = require("../Routes/RouteWebAuthentification.js");
const routeGestionProfils = require("../Routes/RouteGestionProfils.js");
const routeGestionComptes = require("../Routes/RouteGestionComptes.js");
const routeFlotte = require("../Routes/RouteFlotte.js");
const routeGestionLocations = require("../Routes/RouteGestionLocations.js");
const routeStatistiques = require("../Routes/RouteStatistiques.js");
const routeGestionFactures = require("../Routes/RouteGestionFactures.js");
const routeGestionPannes = require("../Routes/RouteGestionPannes.js");
const routeGestionTaches = require("../Routes/RouteGestionTaches.js");
const routePaiement = require("../Routes/RoutePaiement.js");
const routeMailing = require("../Routes/RouteMailing");
const routeDemandeSupport = require("../Routes/RouteDemandeSupport.js");

// Server Configuration to use all the routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", routeMobileAuthentification);
app.use("/", routeWebAuthentification);
app.use("/", routeGestionProfils);
app.use("/", routeGestionComptes);
app.use("/", routeFlotte);
app.use("/", routeGestionLocations);
app.use("/", routeStatistiques);
app.use("/", routeGestionFactures);
app.use("/", routePaiement);
app.use("/", routeMailing);
app.use("/", routeDemandeSupport);
app.use("/", routeGestionPannes);
app.use("/", routeGestionTaches);
app.get("/", (req, res) => {
  res.send("Autotek Web server");
});

// launch the server in the port 4000
app.listen(port, () => console.log("Server running on port 4000 ..."));

// Export the created application instance
module.exports = {
  app,
};
