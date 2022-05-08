// Declaration de variables
const express = require("express");
const routerPaiement = express.Router();
const controllerPaiement = require("../Controllers/ControllerPaiement");

//Declaration des routes du service Facture
routerPaiement.post(
  "/paiement/verifier_paiement/",
  controllerPaiement.verifierPaiement
);
routerPaiement.get(
  "/paiement/paiement_locataire/:id",
  controllerPaiement.getPaiementsByIdLocataire
);

module.exports = routerPaiement;
