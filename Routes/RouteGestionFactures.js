// Variables Declaration 
const express = require("express");
const routerGestionFactures = express.Router();                     // this router : Facture
const controllerGestionFactures = require("../Controllers/ControllerGestionFactures");          // the controller of this router : Facture

//Routers of Facture service Declaration

// add a Facture
routerGestionFactures.post(
    "/gestionfacture/ajouter_facture/",
    controllerGestionFactures.addFacture
);

//recuperate all Factures
routerGestionFactures.get(
    "/gestionfacture/facture/",
    controllerGestionFactures.getFactures
);

// recuperate a facture by id
routerGestionFactures.get(
    "/gestionfacture/facture/:id",
    controllerGestionFactures.getFactureById
);

// recuperate a facture by id_louer
routerGestionFactures.get(
    "/gestionfacture/facture_by_louer/:id_louer",
    controllerGestionFactures.getFactureByIdLouer
);

// exports all methods of Facture Management Router
module.exports = routerGestionFactures;