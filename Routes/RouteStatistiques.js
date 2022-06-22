// Variable declaration
const express = require("express");
const routerStatistiques = express.Router();
const ControllerStatistiques = require("../Controllers/ControllerStatistiques");


routerStatistiques.get(
  "/statistiques/get_locations",
  ControllerStatistiques.getLocationStatistics
);

routerStatistiques.get(
    "/statistiques/getDemandeInscription",
    ControllerStatistiques.getDemandeInscriptionStatistics
  );


  routerStatistiques.get(
    "/statistiques/getFactures",
    ControllerStatistiques.getFactureStatistics
  );


routerStatistiques.get(
    "/statistiques/getLocationsAcceptes",
    ControllerStatistiques.getLocationsAcceptes
);

routerStatistiques.get(
    "/statistiques/getLocationsRejetes",
    ControllerStatistiques.getLocationsRejetes
);


module.exports = routerStatistiques ;
