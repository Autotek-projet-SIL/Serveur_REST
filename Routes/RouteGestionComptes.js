// Variables declaration
const express = require("express");
const routerGestionComptes = express.Router();
const controllerGestionComptes = require("../Controllers/ControllerGestionComptes");

//Routers of GestionComptes service Declaration

//delete locataire
routerGestionComptes.delete(
  "/gestioncomptes/supprimer_locataire/:id",
  controllerGestionComptes.deleteLocataire
);

//delete decideur
routerGestionComptes.delete(
  "/gestioncomptes/supprimer_decideur/:id",
  controllerGestionComptes.deleteDecideur
);

//delete atc
routerGestionComptes.delete(
  "/gestioncomptes/supprimer_atc/:id",
  controllerGestionComptes.deleteATC
);

//delete am
routerGestionComptes.delete(
  "/gestioncomptes/supprimer_am/:id",
  controllerGestionComptes.deleteAM
);

//add locataire
routerGestionComptes.post(
  "/gestioncomptes/ajouter_locataire/",
  controllerGestionComptes.addLocataire
);

//add decideur
routerGestionComptes.post(
  "/gestioncomptes/ajouter_decideur/",
  controllerGestionComptes.addDecideur
);

//add atc
routerGestionComptes.post(
  "/gestioncomptes/ajouter_atc/",
  controllerGestionComptes.addATC
);

//add am
routerGestionComptes.post(
  "/gestioncomptes/ajouter_am/",
  controllerGestionComptes.addAM
);

// exports all methods
module.exports = routerGestionComptes;
