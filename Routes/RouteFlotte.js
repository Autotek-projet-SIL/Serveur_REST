const express = require("express");
const routerFlotte = express.Router();
const controllerFlotte = require("../Controllers/ControllerFlotte");

//Declaration des routes du service flotte
routerFlotte.get(
    "/flotte/vehicule/",
    controllerFlotte.getVehicles
);

routerFlotte.get(
    "/flotte/detail_vehicule/:num",
    controllerFlotte.getVehicleDetail
);

module.exports = routerFlotte;