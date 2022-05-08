// Declaration de variables
const express = require("express");
const routerStatistiques = express.Router();
const ControllerStatistiques = require("../Controllers/ControllerStatistiques");

//récupérer la liste des locations pour le service statistiques
routerStatistiques.get(
  "/statistiques/get_locations",
  ControllerStatistiques.getLocationStatistics
);
//récupérer la liste des demandes d'inscription pour le service statistiques
routerStatistiques.get(
    "/statistiques/getDemandeInscription",
    ControllerStatistiques.getDemandeInscriptionStatistics
  );
//récupérer la liste des factures pour le service statistiques
  routerStatistiques.get(
    "/statistiques/getFactures",
    ControllerStatistiques.getFactureStatistics
  );
//récupérer la liste des factures acceptes pour le service statistiques
routerStatistiques.get(
    "/statistiques/getLocationsAcceptes",
    ControllerStatistiques.getLocationsAcceptes
);
//récupérer la liste des factures acceptes pour le service statistiques
routerStatistiques.get(
    "/statistiques/getLocationsRejetes",
    ControllerStatistiques.getLocationsRejetes
);

module.exports = routerStatistiques ;
