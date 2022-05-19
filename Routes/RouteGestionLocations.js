// Declaration de variables
const express = require("express");
const routerGestionLocations = express.Router();
const controllerGestionLocations = require("../Controllers/ControllerGestionLocations.js");

//Declaration des routes du service gestion des locations
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
//recuperer toutes les locations
routerGestionLocations.get(
  "/gestionlocations/locations",
  controllerGestionLocations.getAllLocations
);
//recuperer toutes les regions
routerGestionLocations.get(
  "/gestionlocations/regions",
  controllerGestionLocations.getAllRegions
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
//Mettre a jour l'heure de debut lors de deverouillage par l'id de location
routerGestionLocations.put(
  "/gestionlocations/update_location_heure_debut/:id",
  controllerGestionLocations.updateLocationHeureDebut
);

//Mettre a jour le suivi de location
routerGestionLocations.put(
  "/gestionlocations/update_suivi_location/:id",
  controllerGestionLocations.updateLocationSuiviLocation
);
//recuperer toutes les  locations termines d'un locataire
routerGestionLocations.get(
  "/gestionlocations/get_locations_termines_by_locataire/:id",
  controllerGestionLocations.getLocationsTerminesByIdLocataire
);
//recuperer le locataire d'une location par numero de chassis
routerGestionLocations.get(
  "/gestionlocations/get_locataire_numero_chassis/:num",
  controllerGestionLocations.getLocataireByNumeroChassis
);

// Exporter le router gestion des locations
module.exports = routerGestionLocations;
