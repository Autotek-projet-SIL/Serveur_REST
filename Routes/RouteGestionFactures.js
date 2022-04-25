// Declaration de variables
const express = require("express");
const routerGestionFactures = express.Router();
const controllerGestionFactures = require("../Controllers/ControllerGestionFactures");

//Declaration des routes du service Facture
routerGestionFactures.post(
    "/gestionfacture/ajouter_facture/",
    controllerGestionFactures.addFacture
);

routerGestionFactures.get(
    "/gestionfacture/facture/",
    controllerGestionFactures.getFactures
);
routerGestionFactures.get(
    "/gestionfacture/facture/:id",
    controllerGestionFactures.getFactureById
);

module.exports = routerGestionFactures;