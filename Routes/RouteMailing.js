//variable declaration
const express = require("express");
const routerMailing = express.Router();
const controllerMailing = require("../Controllers/ControllerMailing");

//Routers of Mailing service Declaration
routerMailing.get(
  "/mailing/envoyer_facture/:id_louer",
  controllerMailing.getFactureDetailByID
);
 
// Exporter le router mailing
module.exports = routerMailing;
