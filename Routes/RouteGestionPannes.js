// Variables Declaration
const express = require("express");
const routerGestionPannes = express.Router(); // this router : Pannes
const controllerGestionPannes = require("../Controllers/ControllerGestionPannes"); // the controller of this router : Pannes

// Router of service panne Declaration

//add a panne
routerGestionPannes.post(
  "/gestionpannes/ajouter_panne/",
  controllerGestionPannes.addPanne
);

// get all pannes
routerGestionPannes.get(
  "/gestionpannes/get_pannes/",
  controllerGestionPannes.getPannes
);

// get a panne by id
routerGestionPannes.get(
  "/gestionpannes/panne/:id",
  controllerGestionPannes.getPanneById
);

// Export all router Panne functions
module.exports = routerGestionPannes;
