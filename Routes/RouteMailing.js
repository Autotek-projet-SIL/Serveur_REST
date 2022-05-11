const express = require("express");
const routerMailing = express.Router();
const controllerMailing = require("../Controllers/ControllerMailing");

//Declaration des routes du service Mailing
routerMailing.get(
  "/mailing/envoyer_facture/:id_facture",
  controllerMailing.getFactureDetailByID
);

// Exporter le router mailing
module.exports = routerMailing;
