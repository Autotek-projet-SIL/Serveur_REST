// Declaration de variables
const express = require("express");
const routerPaiement = express.Router();
const controllerPaiement = require("../Controllers/ControllerPaiement");

//Declaration des routes du service paiement
routerPaiement.post(
  "/paiement/verifier_paiement/",
  controllerPaiement.verifierPaiement
);
routerPaiement.get(
  "/paiement/paiement_locataire/:id",
  controllerPaiement.getPaiementsByIdLocataire
);

// Exporter le router paiement
module.exports = routerPaiement;
