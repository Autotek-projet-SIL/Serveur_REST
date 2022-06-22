// Variables Declaration 
const express = require("express");
const routerGestionTaches = express.Router();               // this router : tache
const controllerGestionTaches = require("../Controllers/ControllerGestionTaches.js");  // the controller of this router : tache

// Router of service Tache Declaration

//add a Tache
routerGestionTaches.post(
  "/tache/ajouter_tache/",
  controllerGestionTaches.addTache
);

// get all Taches
routerGestionTaches.get(
  "/tache/get_taches/",
  controllerGestionTaches.getTaches
);

// get a Tache By id
routerGestionTaches.get(
  "/tache/get_tache_by_id/:id",
  controllerGestionTaches.getTacheById
);

//recuperate the liste of all taches by id AM
routerGestionTaches.get(
  "/tache/get_tache_byidam/:id",
  controllerGestionTaches.getTacheByIdAm
);

//Update etat avancement field in a Tache
routerGestionTaches.put(
  "/tache/modifier_etatavancement_tache/:id",
  controllerGestionTaches.updateEtatAvancementTache
);

//Update etat field in a Tache
routerGestionTaches.put(
  "/tache/modifier_etat_tache/:id",
  controllerGestionTaches.updateEtatTache
);

// Export all the Router of Taches Functions
module.exports = routerGestionTaches;
