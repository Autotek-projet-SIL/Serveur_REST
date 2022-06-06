// Declaration de variables
const express = require("express");
const routerGestionComptes = express.Router();
const controllerGestionComptes = require("../Controllers/ControllerGestionComptes");

//Declaration des routes du service Gestion des comptes
routerGestionComptes.delete(
  "/gestioncomptes/supprimer_locataire/:id",
  controllerGestionComptes.deleteLocataire
);
routerGestionComptes.delete(
  "/gestioncomptes/supprimer_decideur/:id",
  controllerGestionComptes.deleteDecideur
);
routerGestionComptes.delete(
  "/gestioncomptes/supprimer_atc/:id",
  controllerGestionComptes.deleteATC
);
routerGestionComptes.delete(
  "/gestioncomptes/supprimer_am/:id",
  controllerGestionComptes.deleteAM
);
routerGestionComptes.post(
  "/gestioncomptes/ajouter_locataire/",
  controllerGestionComptes.addLocataire
);
routerGestionComptes.post(
  "/gestioncomptes/ajouter_decideur/",
  controllerGestionComptes.addDecideur
);
routerGestionComptes.post(
  "/gestioncomptes/ajouter_atc/",
  controllerGestionComptes.addATC
);
routerGestionComptes.post(
  "/gestioncomptes/ajouter_am/",
  controllerGestionComptes.addAM
);

// Exporter le router gestion des comptes
module.exports = routerGestionComptes;
