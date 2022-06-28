// Variables Declaration
const express = require("express");
const routerDemandeSupport = express.Router(); // this router : DemandeSupport
const controllerDemandeSupport = require("../Controllers/ControllerDemandeSupport"); // the controller of this router : DemandeSupport

//Routers of DemandeSupport service Declaration
 
//recuperate all support requests
routerDemandeSupport.get(
  "/demande_support/demande_support",
  controllerDemandeSupport.getDemandeSupport
);

//recuperate a support request by id
routerDemandeSupport.get(
  "/demande_support/demande_support/:id",
  controllerDemandeSupport.getDemandeSupportById
);

//recuperate all support requests for a location
routerDemandeSupport.get(
  "/demande_support/demande_support_louer/:id_louer",
  controllerDemandeSupport.getDemandeSupportLouer
);

//add a support request
routerDemandeSupport.post(
  "/demande_support/ajouter_demande_support/",
  controllerDemandeSupport.addDemandeSupport
);

//Response to a support request
routerDemandeSupport.put(
  "/demande_support/repondre_demande_support/:email/demande/:id",
  controllerDemandeSupport.responseDemandeSupport
);

// exports all methods
module.exports = routerDemandeSupport;
