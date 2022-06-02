// Declaration de variables
const express = require("express");
const routerGestionTaches = express.Router();
const controllerGestionTaches = require("../Controllers/ControllerGestionTaches.js");

//Declaration des routes du service Tache
routerGestionTaches.post(
  "/tache/ajouter_tache/",
  controllerGestionTaches.addTache
);
routerGestionTaches.get(
  "/tache/get_taches/",
  controllerGestionTaches.getTaches
);
//récupérer la liste des taches par id Am
routerGestionTaches.get(
  "/tache/get_tache_byidam/:id",
  controllerGestionTaches.getTacheByIdAm
);
//Update l'etat d'avancement d'une tache
routerGestionTaches.put(
  "/tache/modifier_etatavancement_tache/:id",
  controllerGestionTaches.updateEtatAvancementTache
);
//Update l'etat d'une tache
routerGestionTaches.put(
  "/tache/modifier_etat_tache/:id",
  controllerGestionTaches.updateEtatTache
);
// Exporter le router gestion des Pannes
module.exports = routerGestionTaches;
