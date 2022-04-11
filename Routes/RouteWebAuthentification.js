// Declaration de variables
const express = require("express");
const routerWebAuthentification = express.Router();
const controllerWebAuthentification = require("../Controllers/ControllerWebAuthentification.js");

//Declaration des routes du service authentification web
routerWebAuthentification.put(
  "/authentification_web/valider_demande/:email/demande/:id_demande_inscription",
  controllerWebAuthentification.validerDemandeInscription
);
routerWebAuthentification.put(
  "/authentification_web/refuser_demande/:email/demande/:id_demande_inscription",
  controllerWebAuthentification.refuserDemandeInscription
);
routerWebAuthentification.get(
  "/authentification_web/demandeinscription/",
  controllerWebAuthentification.getDemandesInscription
);
routerWebAuthentification.get(
  "/authentification_web/atc_connexion/:email",
  controllerWebAuthentification.getATCByEmail
);
routerWebAuthentification.get(
  "/authentification_web/decideur_connexion/:email",
  controllerWebAuthentification.getDecideurByEmail
);
module.exports = routerWebAuthentification;
