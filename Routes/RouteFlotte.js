const express = require("express");
const routerFlotte = express.Router();
const controllerFlotte = require("../Controllers/ControllerFlotte");

//Declaration des routes du service flotte
routerFlotte.get(
    "/flotte/vehicule/",
    controllerFlotte.getVehicles
);
routerFlotte.get(
    "/flotte/vehicule_am/:id",
    controllerFlotte.getVehiclesByAmID
);
routerFlotte.get(
    "/flotte/detail_vehicule/:num_chassis",
    controllerFlotte.getVehicleDetail
);
routerFlotte.get(
    "/flotte/typevehicule/",
    controllerFlotte.getVehiclesTypes
);
routerFlotte.get(
    "/flotte/marquevehicule/",
    controllerFlotte.getVehiclesMarques
);
routerFlotte.get(
    "/flotte/modelevehicule/:marque",
    controllerFlotte.getVehiclesModelsByMarque
);
routerFlotte.post(
    "/flotte/ajouter_vehicule/",
    controllerFlotte.addVehicle
);
routerFlotte.post(
    "/flotte/ajouter_typevehicule/",
    controllerFlotte.addVehicleType
);
routerFlotte.put(
    "/flotte/modifier_vehicule/:num",
    controllerFlotte.updateVehicle
);
routerFlotte.put(
    "/flotte/modifier_dispo_vehicule/:num",
    controllerFlotte.updateVehicleAvaible
);
routerFlotte.put(
    "/flotte/modifier_am_vehicule/:num",
    controllerFlotte.updateVehicleAM
);
routerFlotte.put(
    "/flotte/modifier_image_vehicule/:num",
    controllerFlotte.updateVehicleImage
);
routerFlotte.put(
    "/flotte/modifier_typevehicule/:id",
    controllerFlotte.updateVehicleType
);
routerFlotte.delete(
    "/flotte/supprimer_vehicule/:num",
    controllerFlotte.deleteVehicule
  );
routerFlotte.delete(
    "/flotte/supprimer_typevehicule/:id",
    controllerFlotte.deleteVehiculeType
  );

module.exports = routerFlotte;