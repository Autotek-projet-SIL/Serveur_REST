
//// Declaration de variables
const express = require("express");
const routerGestionLocations = express.Router();
const controllerGestionLocations = require("../Controllers/ControllerGestionLocations.js");

//Declaration des routes du service authentification web
routerGestionLocations.post(
  "/gestionlocations/ajouter_location/",
  controllerGestionLocations.addLocation
);

//récupérer toutes les locations termines
routerGestionLocations.get(
  "/gestionlocations/locations_termines",
  controllerGestionLocations.getLocationsTermines
);
//récupérer toutes les locations en cours
routerGestionLocations.get(
  "/gestionlocations/locations_encours",
  controllerGestionLocations.getLocationsEnCours
);

//Terminer une location
routerGestionLocations.put(
  "/gestionlocations/end_location/:id",
  controllerGestionLocations.endLocation
);
/* routerGestionLocations.put(
        "/gestionlocations/modifier_location/:id",
        controllerGestionLocations.updateLocataire
      );
*/

//ajouter une location
routerGestionLocations.post(
  "/gestionlocations/ajouter_location/",
  controllerGestionLocations.addLocation
);

//get location by id
routerGestionLocations.get(
  "/gestionlocations/location/:id",
  controllerGestionLocations.getLocationById
);

// récuperer les locations en cours d'un locataire
routerGestionLocations.get(
  "/gestionlocations/get_locations_by_locataire/:id",
  controllerGestionLocations.getLocationsLocataire
);

module.exports = routerGestionLocations;
