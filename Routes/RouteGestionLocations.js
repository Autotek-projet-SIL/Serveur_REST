// Variables declaration
const express = require("express");
const routerGestionLocations = express.Router();
const controllerGestionLocations = require("../Controllers/ControllerGestionLocations.js");

//Routers of GestionLocations service Declaration
routerGestionLocations.post(
  "/gestionlocations/ajouter_location/",
  controllerGestionLocations.addLocation
);

//recuperate all the locations finished
routerGestionLocations.get(
  "/gestionlocations/locations_termines",
  controllerGestionLocations.getLocationsTermines
);

//recuperate all the in progress locations
routerGestionLocations.get(
  "/gestionlocations/locations_encours",
  controllerGestionLocations.getLocationsEnCours
);
//end a locaation
routerGestionLocations.put(
  "/gestionlocations/end_location/:id",
  controllerGestionLocations.endLocation
);

//recuperate all the locations
routerGestionLocations.get(
  "/gestionlocations/locations",
  controllerGestionLocations.getAllLocations
);

//recuperate all the regions
routerGestionLocations.get(
  "/gestionlocations/regions",
  controllerGestionLocations.getAllRegions
);

//get location by id
routerGestionLocations.get(
  "/gestionlocations/location/:id",
  controllerGestionLocations.getLocationById
);
//recuperate locations by id locataire
routerGestionLocations.get(
  "/gestionlocations/get_locations_by_locataire/:id",
  controllerGestionLocations.getLocationsLocataire
);
//update heure de debut by id de location
routerGestionLocations.put(
  "/gestionlocations/update_location_heure_debut/:id",
  controllerGestionLocations.updateLocationHeureDebut
);

//update suivi de location
routerGestionLocations.put(
  "/gestionlocations/update_suivi_location/:id",
  controllerGestionLocations.updateLocationSuiviLocation
);
//recuperate  all  locations ended by locataire
routerGestionLocations.get(
  "/gestionlocations/get_locations_termines_by_locataire/:id",
  controllerGestionLocations.getLocationsTerminesByIdLocataire
);
//recuperate  locataire from location by numero de chassis
routerGestionLocations.get(
  "/gestionlocations/get_locataire_numero_chassis/:num",
  controllerGestionLocations.getLocataireByNumeroChassis
);

// export all methods
module.exports = routerGestionLocations;
