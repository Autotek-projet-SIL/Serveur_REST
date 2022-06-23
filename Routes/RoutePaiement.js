//vaariable declaration
const express = require("express");
const routerPaiement = express.Router();
const controllerPaiement = require("../Controllers/ControllerPaiement");

//Routers of Paiement service Declaration

routerPaiement.post(
  "/paiement/verifier_paiement/",
  controllerPaiement.verifierPaiement
);
routerPaiement.get(
  "/paiement/paiement_locataire/:id",
  controllerPaiement.getPaiementsByIdLocataire
);

// Export methods
module.exports = routerPaiement;
