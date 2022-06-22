// Variables Declaration 
const ModelVehicle = require("../Models/ModelVehicule");          // the model of this service : Flotte
const log = require("../config/Logger");                           // Display configuration
const db = require("../config/firebase").db;                
const admin = require("../config/firebase").admin;                   // FireBase configuration
const { v4: uuidv4 } = require("uuid");
const storageRef = admin.storage().bucket("gs://autotek-8c725.appspot.com/");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const { newDb } = require("pg-mem");
const bucket = admin.storage().bucket();

//Functions of Flotte Service 

//recuperate all vehicules
const getVehicles = async (request, response) => {
  await ModelVehicle.getVehicles(request, response);
};

//recuperate all vehicules by id AM
const getVehiclesByAmID = async (request, response) => {
  await ModelVehicle.getVehiclesByAmID(request, response);
};

//recuperate a vehicule by num_chassis
const getVehicleDetail = async (request, response) => {
  await ModelVehicle.getVehicleByChassisNum(request, response);
};

//recuperate all vehicules types
const getVehiclesTypes = async (request, response) => {
  await ModelVehicle.getVehiclesTypes(request, response);
};

//recuperate all vehicules marques
const getVehiclesMarques = async (request, response) => {
  await ModelVehicle.getVehiclesMarques(request, response);
};

//recuperate all vehicules models for a vehicule marque
const getVehiclesModelsByMarque = async (request, response) => {
  await ModelVehicle.getVehiclesModelsByMarque(request, response);
};

//add a vehicule
const addVehicle = async (request, response) => {
  if (process.env.NODE_ENV === "production") {
    // remove the background of the image
    var result = await removeBgImage(                 
      request.body.image_vehicule,
      request.body.location_image
    );
    // delete the image with background
    await deleteImage(request.body.location_image);           
    request.body.image_vehicule = result;
  }
  await ModelVehicle.addVehicle(request, response);
};

//add a vehicule type
const addVehicleType = async (request, response) => {
  await ModelVehicle.addVehicleType(request, response);
};

//update a vehicule
const updateVehicle = async (request, response) => {
  await ModelVehicle.updateVehicle(request, response);
};

//update a vehicule AM
const updateVehicleAM = async (request, response) => {
  await ModelVehicle.updateVehicleAM(request, response);
};

//update a vehicule image
const updateVehicleImage = async (request, response) => {
  if (process.env.NODE_ENV === "production") {
    // remove the background of the image
    var result = await removeBgImage(                
      request.body.image_vehicule,
      request.body.location_image
    );
    // delete the image with background
    await deleteImage(request.body.location_image);
    request.body.image_vehicule = result;
  }
  await ModelVehicle.updateVehicleImage(request, response);
};

//update a vehicule type
const updateVehicleType = async (request, response) => {
  await ModelVehicle.updateVehicleType(request, response);
};

//delete a vehicule 
const deleteVehicule = async (request, response) => {
  await ModelVehicle.deleteVehicule(request, response);
};

//delete a vehicule type 
const deleteVehiculeType = async (request, response) => {
  await ModelVehicle.deleteVehiculeType(request, response);
};

//recuperate all vehicules marques
const getMarques = async (request, response) => {
  await ModelVehicle.getMarques(request, response);
};

//recuperate all vehicules models by id marque
const getModelsByIdMarque = async (request, response) => {
  await ModelVehicle.getModelsByIdMarque(request, response);
};

/*************    Functions CRUD vehicules in Firestore   *******************/

// Function add a vehicule in FireStore
const addVehicleFB = async (request, response) => {
  // verify if vehicule exist in fireStore
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
    // add a vehicule to dataStore
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
        arrive:false,
        loue:false,
        nom_locataire:""
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

//update a vehicule availability in firestore
const updateVehiculeAvaibleFB = async (request, response) => {
  // get the vehicule from dataStore if it exists
  const vehicule = await db
    .collection("CarLocation")
    .doc(request.body.numero_chassis)
    .get();
  if (vehicule.exists) {
    // update the field disponible of the vehicule in dataStore 
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

//Function delete a vehicule in FireStore
const deleteVehiculeFB = async (request, response) => {
  // delete the vehicule from DataStore
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

//Function to remove the background of an image
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

//Function to upload a file
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

//Function to delete an image
async function deleteImage(fileLocation) {
  storageRef.file(fileLocation).delete();
}

//Export functions of service flotte and vehicule manipulation in FireStore
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
