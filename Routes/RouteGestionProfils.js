// variable declaration
const express = require("express");
const routerGestionProfils = express.Router();
const controllerGestionProfils = require("../Controllers/ControllerGestionProfils");

//Routers of GestionProfils service Declaration

routerGestionProfils.get(
  "/gestionprofils/locataire/",
  controllerGestionProfils.getLocataires
);
routerGestionProfils.get(
  "/gestionprofils/locataire/:id",
  controllerGestionProfils.getLocataireById
);
routerGestionProfils.put(
  "/gestionprofils/modifier_locataire/:id",
  controllerGestionProfils.updateLocataire
);
routerGestionProfils.get(
  "/gestionprofils/atc/:id",
  controllerGestionProfils.getATCById
);
routerGestionProfils.get(
  "/gestionprofils/atc/",
  controllerGestionProfils.getATCs
);
routerGestionProfils.put(
  "/gestionprofils/modifier_atc/:id",
  controllerGestionProfils.updateATC
);
routerGestionProfils.put(
  "/gestionprofils/modifier_atc/modifier_photo/:id",
  controllerGestionProfils.updateATCPhoto
);
routerGestionProfils.put(
  "/gestionprofils/modifier_atc/modifier_mot_de_passe/:id",
  controllerGestionProfils.updateATCPassword
);
routerGestionProfils.put(
  "/gestionprofils/modifier_atc/modifier_statut/:id",
  controllerGestionProfils.updateATCStatut
);
routerGestionProfils.get(
  "/gestionprofils/decideur/:id",
  controllerGestionProfils.getDecideurById
);
routerGestionProfils.get(
  "/gestionprofils/decideur/",
  controllerGestionProfils.getDecideurs
);
routerGestionProfils.put(
  "/gestionprofils/modifier_decideur/:id",
  controllerGestionProfils.updateDecideur
);
routerGestionProfils.put(
  "/gestionprofils/modifier_decideur/modifier_mot_de_passe/:id",
  controllerGestionProfils.updateDecideurPassword
);
routerGestionProfils.put(
  "/gestionprofils/modifier_decideur/modifier_photo/:id",
  controllerGestionProfils.updateDecideurPhoto
);
routerGestionProfils.get(
  "/gestionprofils/am/:id",
  controllerGestionProfils.getAMById
);
routerGestionProfils.get(
  "/gestionprofils/am/",
  controllerGestionProfils.getAMs
);
routerGestionProfils.put(
  "/gestionprofils/modifier_am/:id",
  controllerGestionProfils.updateAM
);
routerGestionProfils.put(
  "/gestionprofils/modifier_am/modifier_photo/:id",
  controllerGestionProfils.updateAMPhoto
);
routerGestionProfils.put(
  "/gestionprofils/modifier_am/modifier_mot_de_passe/:id",
  controllerGestionProfils.updateAMPassword
);

// Exporter le router gestion des profils
module.exports = routerGestionProfils;
