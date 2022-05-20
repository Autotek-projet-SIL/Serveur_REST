// Declaration de variables
const express = require("express");
const routerDemandeSupport = express.Router();
const controllerDemandeSupport = require("../Controllers/ControllerDemandeSupport");

//Declaration des routes du service demande de support
//récupérer toutes les demandes de support
routerDemandeSupport.get(
    "/demande_support/demande_support",
    controllerDemandeSupport.getDemandeSupport
);
//récupérer une demande de support par l'id
routerDemandeSupport.get(
    "/demande_support/demande_support/:id",
    controllerDemandeSupport.getDemandeSupportById
);
//récupérer toutes les demandes de support d'un location
routerDemandeSupport.get(
    "/demande_support/demande_support_louer/:id_louer",
    controllerDemandeSupport.getDemandeSupportLouer
);
//Ajouter un demande de support
routerDemandeSupport.post(
    "/demande_support/ajouter_demande_support/",
    controllerDemandeSupport.addDemandeSupport
);
//Mettre a jour le champs reponse d'un demande de support
routerDemandeSupport.put(
    "/demande_support/repondre_demande_support/:id",
    controllerDemandeSupport.responseDemandeSupport
);

module.exports = routerDemandeSupport;
