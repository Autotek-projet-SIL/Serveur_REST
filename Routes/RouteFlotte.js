// Variables Declaration 
const express = require("express");
const routerFlotte = express.Router();           // this router : Flotte
const controllerFlotte = require("../Controllers/ControllerFlotte");        // the controller of this router : Flotte

//Routers of Flotte service Declaration 

//recuperate all vehicules
routerFlotte.get(
    "/flotte/vehicule/",
    controllerFlotte.getVehicles
);

//recuperate all vehicules by id AM
routerFlotte.get(
    "/flotte/vehicule_am/:id",
    controllerFlotte.getVehiclesByAmID
);

//recuperate a vehicule by num_chassis
routerFlotte.get(
    "/flotte/detail_vehicule/:num_chassis",
    controllerFlotte.getVehicleDetail
);

//recuperate all vehicules types
routerFlotte.get(
    "/flotte/typevehicule/",
    controllerFlotte.getVehiclesTypes
);

//recuperate all vehicules marques
routerFlotte.get(
    "/flotte/marquevehicule/",
    controllerFlotte.getVehiclesMarques
);

//recuperate all vehicules models for a vehicule marque
routerFlotte.get(
    "/flotte/modelevehicule/:marque",
    controllerFlotte.getVehiclesModelsByMarque
);

//add a vehicule
routerFlotte.post(
    "/flotte/ajouter_vehicule/",
    controllerFlotte.addVehicle
);

//add a vehicule type
routerFlotte.post(
    "/flotte/ajouter_typevehicule/",
    controllerFlotte.addVehicleType
);

//update a vehicule
routerFlotte.put(
    "/flotte/modifier_vehicule/:num",
    controllerFlotte.updateVehicle
);

//update a vehicule availability
routerFlotte.put(
    "/flotte/modifier_dispo_vehicule/:num",
    controllerFlotte.updateVehicleAvaible
);

//update a vehicule AM 
routerFlotte.put(
    "/flotte/modifier_am_vehicule/:num",
    controllerFlotte.updateVehicleAM
);

//update a vehicule image
routerFlotte.put(
    "/flotte/modifier_image_vehicule/:num",
    controllerFlotte.updateVehicleImage
);

//update a vehicule type
routerFlotte.put(
    "/flotte/modifier_typevehicule/:id",
    controllerFlotte.updateVehicleType
);

//delete a vehicule 
routerFlotte.delete(
    "/flotte/supprimer_vehicule/:num",
    controllerFlotte.deleteVehicule
  );

//delete a vehicule type 
routerFlotte.delete(
    "/flotte/supprimer_typevehicule/:id",
    controllerFlotte.deleteVehiculeType
);

//recuperate all vehicules marques
routerFlotte.get(
    "/flotte/marque/",
    controllerFlotte.getMarques
);

//recuperate all vehicules models by id marque
routerFlotte.get(
    "/flotte/modele_marque/:id",
    controllerFlotte.getModelsByIdMarque
);

// exports all methods
module.exports = routerFlotte;