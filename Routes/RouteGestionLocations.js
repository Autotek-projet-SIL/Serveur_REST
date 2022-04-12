// Declaration de variables
const express = require("express");
const routerGestionLocations = express.Router();
const controllerGestionLocations = require("../Controllers/ControllerGestionLocations.js");




//Declaration des routes du service authentification web
routerGestionLocations.post(
  "/gestionlocations/ajouter_location/",
  controllerGestionLocations.addLocation
);
routerGestionLocations.get(
  "/gestionlocations/locations_termines",
  controllerGestionLocations.getLocationsTermines
  );
  routerGestionLocations.get(
    "/gestionlocations/locations_encours",
    controllerGestionLocations.getLocationsTermines
    );
    routerGestionLocations.put(
      "/gestionlocations/end_location/",
      controllerGestionLocations.endLocation
    );
module.exports =routerGestionLocations;
