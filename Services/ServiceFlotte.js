const ModelVehicle = require("../Models/ModelVehicule");
const log = require("../config/Logger");
const db = require("../config/firebase").db
const admin=require("../config/firebase").admin
// Fonctions du service flotte
const getVehicles = async (request, response) => {
  await ModelVehicle.getVehicles(request, response);
};

const getVehiclesByAmID = async (request, response) => {
  await ModelVehicle.getVehiclesByAmID(request, response);
};

const getVehicleDetail = async (request, response) => {
  await ModelVehicle.getVehicleByChassisNum(request, response);
};

const getVehiclesTypes = async (request, response) => {
  await ModelVehicle.getVehiclesTypes(request, response);
};

const getVehiclesMarques = async (request, response) => {
  await ModelVehicle.getVehiclesMarques(request, response);
};
const getVehiclesModelsByMarque = async (request, response) => {
  await ModelVehicle.getVehiclesModelsByMarque(request, response);
};

const addVehicle = async (request, response) => {
  await ModelVehicle.addVehicle(request, response);
};

const addVehicleType = async (request, response) => {
  await ModelVehicle.addVehicleType(request, response);
};

const updateVehicle = async (request, response) => {
  await ModelVehicle.updateVehicle(request, response);
};

const updateVehicleAM = async (request, response) => {
  await ModelVehicle.updateVehicleAM(request, response);
};

const updateVehicleImage = async (request, response) => {
  await ModelVehicle.updateVehicleImage(request, response);
};

const updateVehicleType = async (request, response) => {
  await ModelVehicle.updateVehicleType(request, response);
};
const deleteVehicule = async (request, response) => {
  await ModelVehicle.deleteVehicule(request, response);
};

const deleteVehiculeType = async (request, response) => {
  await ModelVehicle.deleteVehiculeType(request, response);
};

const getMarques = async (request, response) => {
  await ModelVehicle.getMarques(request, response);
};

const getModelsByIdMarque = async (request, response) => {
  await ModelVehicle.getModelsByIdMarque(request, response);
};

/*************    Fonctions CRUD sur Firestore pour véhicule    *******************/

// Fonctipn d'ajout d'un véhicule sur FireStore
const addVehicleFB = async (request, response) => {
  const vehicule = await db
    .collection("CarLocation")
    .doc(request.body.num_chassis)
    .get();
  if (vehicule.exists) {
    response.statusCode=500
    log.loggerConsole.error("Le vehicule existe deja dans firebase");
    log.loggerFile.error("Le vehicule existe deja dans firebase");
  } else {
    let data = {
      location: new admin.firestore.GeoPoint(0, 0),
    };
    await db
      .collection("CarLocation")
      .doc(request.body.num_chassis)
      .set({
        batterie: 100,
        temperature: 0,
        kilometrage: 0,
        destination: data.location,
        latitude: 0.0,
        longitude: 0.0,
        disponible: request.body.disponible,
        locataire_uid: "",
        vitesse: 0.0,
        deverrouiller: false,
        etat: "en attente",
      })
      .then((response) => {
        console.log("Vehicle added successfully:", response);
      })
      .catch((error) => {
        response.statusCode=500
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
      });
  }
};

// Mettre a jour la disponibilte d'un véhicule dans firestore
const updateVehiculeAvaibleFB = async (request, response) => {
  const vehicule = await db
    .collection("CarLocation")
    .doc(request.body.numero_chassis)
    .get();
  if (vehicule.exists) {
    let temp = !vehicule.data().disponible;
    const liam = await db
      .collection("CarLocation")
      .doc(request.body.numero_chassis)
      .update({
        disponible: temp,
      })
      .then((response) => {
        console.log("Vehicle updated successfully");
      })
      .catch((error) => {
        response.statusCode=500
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
      });
  }
};

//Fonction de suppression d'un véhicule sur FireStore
const deleteVehiculeFB = async (request, response) => {
  await db
    .collection("CarLocation")
    .doc(request.params.num)
    .delete()
    .then((response) => {
      console.log("Vehicle deleted successfully:", response);
    })
    .catch((error) => {
      response.statusCode=500
      log.loggerConsole.error("Le vehicule n'exsite pas dans firebase");
      log.loggerFile.error("Le vehicule n'exsite pas dans firebase");
    });
};

//Exporter les fonctions du service flotte
module.exports = {
  getVehicles,
  getVehiclesByAmID,
  getVehicleDetail,
  getVehiclesTypes,
  getVehiclesMarques,
  getVehiclesModelsByMarque,
  addVehicle,
  addVehicleType,
  updateVehicle,
  updateVehicleImage,
  updateVehicleAM,
  updateVehicleType,
  deleteVehicule,
  deleteVehiculeType,
  getMarques,
  getModelsByIdMarque,
  addVehicleFB,
  updateVehiculeAvaibleFB,
  deleteVehiculeFB,
};
