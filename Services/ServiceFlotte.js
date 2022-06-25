const ModelVehicle = require("../Models/ModelVehicule");
const log = require("../config/Logger");
const db = require("../config/firebase").db;
const admin = require("../config/firebase").admin;
const { v4: uuidv4 } = require("uuid");
const storageRef = admin.storage().bucket("gs://autotek-8c725.appspot.com/");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const { newDb } = require("pg-mem");
const bucket = admin.storage().bucket();

// Fleet service functions

//Retrieve the list of fleet vehicles
const getVehicles = async (request, response) => {
  await ModelVehicle.getVehicles(request, response);
};


// Retrieve the list of vehicles assigned to an AM
const getVehiclesByAmID = async (request, response) => {
  await ModelVehicle.getVehiclesByAmID(request, response);
};


//get the vehicul detail
const getVehicleDetail = async (request, response) => {
  await ModelVehicle.getVehicleByChassisNum(request, response);
};


// Retrieve the list of vehicle types
const getVehiclesTypes = async (request, response) => {
  await ModelVehicle.getVehiclesTypes(request, response);
};

// Retrieve the list of vehicle brands
const getVehiclesMarques = async (request, response) => {
  await ModelVehicle.getVehiclesMarques(request, response);
};

// Retrieve vehicle models for a brand
const getVehiclesModelsByMarque = async (request, response) => {
  await ModelVehicle.getVehiclesModelsByMarque(request, response);
};


// add a vehicule
const addVehicle = async (request, response) => {
  if (process.env.NODE_ENV === "production") {
    var result = await removeBgImage(
      request.body.image_vehicule,
      request.body.location_image
    );

//delete image
    await deleteImage(request.body.location_image);
    request.body.image_vehicule = result;

    let image_upload = request.body.location_image.replace(".", "_rmbg.");
    request.body.location_image = image_upload;
  }
  await ModelVehicle.addVehicle(request, response);
};

//add Vehicle Type
const addVehicleType = async (request, response) => {
  await ModelVehicle.addVehicleType(request, response);
};

//update Vehicle infos
const updateVehicle = async (request, response) => {
  await ModelVehicle.updateVehicle(request, response);
};

//// Assign am to a vehicle
const updateVehicleAM = async (request, response) => {
  await ModelVehicle.updateVehicleAM(request, response);
};

//// Assign am to a vehicle
const updateVehicleImage = async (request, response) => {
  if (process.env.NODE_ENV === "production") {
    let old_imagePath = await ModelVehicle.getVehicleImagePathByChassisNum(
      request,
      response
    );
    await deleteImage(old_imagePath);

    var result = await removeBgImage(
      request.body.image_vehicule,
      request.body.location_image
    );

    await deleteImage(request.body.location_image);
    request.body.image_vehicule = result;
    let image_upload = request.body.location_image.replace(".", "_rmbg.");
    request.body.location_image = image_upload;
  }
  await ModelVehicle.updateVehicleImage(request, response);
};


// Update vehicle type information
const updateVehicleType = async (request, response) => {
  await ModelVehicle.updateVehicleType(request, response);
};

//delete vehicule
const deleteVehicule = async (request, response) => {
  if (process.env.NODE_ENV === "production") {
    let old_imagePath = await ModelVehicle.getVehicleImagePathByChassisNum(
      request,
      response
    );
    await deleteImage(old_imagePath);
  }
  await ModelVehicle.deleteVehicule(request, response);
};


// Delete a type of vehicle
const deleteVehiculeType = async (request, response) => {
  await ModelVehicle.deleteVehiculeType(request, response);
};


//Retrieve the list of vehicle brands
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
    response.statusCode = 500;
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
        latitude: 36.70580896383114,
        longitude: 3.1735785330610558,
        disponible: request.body.disponible,
        locataire_uid: "",
        vitesse: 0.0,
        deverrouiller: false,
        etat: "en attente",
        arrive: false,
        loue: false,
        nom_locataire: "",
      })
      .then((response) => {
        console.log("Vehicle added successfully:", response);
      })
      .catch((error) => {
        response.statusCode = 500;
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
        response.statusCode = 500;
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
      response.statusCode = 500;
      log.loggerConsole.error("Le vehicule n'exsite pas dans firebase");
      log.loggerFile.error("Le vehicule n'exsite pas dans firebase");
    });
};

async function removeBgImage(image_url, image_location) {
  return new Promise(function (resolve, reject) {
    const formData = new FormData();
    formData.append("size", "auto");
    formData.append("image_url", image_url);

    axios({
      method: "post",
      url: "https://api.remove.bg/v1.0/removebg",
      data: formData,
      responseType: "arraybuffer",
      headers: {
        ...formData.getHeaders(),
        "X-Api-Key": process.env.rmbg_api_key,
      },
      encoding: null,
    })
      .then(async (response) => {
        if (response.status != 200)
          return console.error("Error:", response.status, response.statusText);
        let image_upload = image_location.replace(".", "_rmbg.");
        fs.writeFileSync(image_upload, response.data);
        let new_url = await uploadFile(image_upload);
        resolve(new_url);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
async function uploadFile(filename) {
  const [file, meta] = await bucket.upload(filename, {
    destination: filename,
    resumable: false,
    public: true,
    metadata: {
      metadata: {
        firebaseStorageDownloadTokens: uuidv4(),
      },
    },
  });

  return meta.mediaLink;
}
async function deleteImage(fileLocation) {
  storageRef.file(fileLocation).delete();
}

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
