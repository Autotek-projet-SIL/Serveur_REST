// Declaration de variables
const express = require("express");
const routerGestionPannes = express.Router();
const controllerGestionPannes = require("../Controllers/ControllerGestionPannes");

//Declaration des routes du service panne


routerGestionPannes.post(
    "/gestionpannes/ajouter_panne/",
    controllerGestionPannes.addPanne
);

routerGestionPannes.get(
    "/gestionpannes/get_pannes/",
    controllerGestionPannes.getPannes
);

routerGestionPannes.get(
    "/gestionpannes/panne/:id",
    controllerGestionPannes.getPanneById
);


// Exporter le router gestion des Pannes
module.exports = routerGestionPannes;