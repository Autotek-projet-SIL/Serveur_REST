// Variables Declaration 
const ServiceFlotte = require("../Services/ServiceFlotte");         // the service of this controller : Flotte
const firebaseVerifyToken = require("../config/firebase.js");         // FireBase configuration
const log = require("../config/Logger");                          // Display configuration

//Controller of Flotte service Declaration 

//recuperate all vehicules
const getVehicles = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await ServiceFlotte.getVehicles(request, response);
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

//recuperate all vehicules by id AM
const getVehiclesByAmID = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await ServiceFlotte.getVehiclesByAmID(request, response);
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

//recuperate a vehicule by num_chassis
const getVehicleDetail = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await ServiceFlotte.getVehicleDetail(request, response);
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

//recuperate all vehicules types
const getVehiclesTypes = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await ServiceFlotte.getVehiclesTypes(request, response);
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

//recuperate all vehicules marques
const getVehiclesMarques = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await ServiceFlotte.getVehiclesMarques(request, response);
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

//recuperate all vehicules models for a vehicule marque
const getVehiclesModelsByMarque = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await ServiceFlotte.getVehiclesModelsByMarque(request, response);
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

//add a vehicule
const addVehicle = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      if (process.env.NODE_ENV === "production") {
        await ServiceFlotte.addVehicleFB(request, response);
      }
      if (response.statusCode != 500) {
        await ServiceFlotte.addVehicle(request, response);
      }
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

//add a vehicule type
const addVehicleType = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await ServiceFlotte.addVehicleType(request, response);
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

//update a vehicule
const updateVehicle = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await ServiceFlotte.updateVehicle(request, response);
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

//update a vehicule availability
const updateVehicleAvaible = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await ServiceFlotte.updateVehiculeAvaibleFB(request, response);
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

//update a vehicule AM
const updateVehicleAM = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await ServiceFlotte.updateVehicleAM(request, response);
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

//update a vehicule image
const updateVehicleImage = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await ServiceFlotte.updateVehicleImage(request, response);
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

//update a vehicule type
const updateVehicleType = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await ServiceFlotte.updateVehicleType(request, response);
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

//delete a vehicule 
const deleteVehicule = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      if (process.env.NODE_ENV === "production") {
        await ServiceFlotte.deleteVehiculeFB(request, response);        //delete vehicule from firebase
      }
      if (response.statusCode != 500) {
        await ServiceFlotte.deleteVehicule(request, response);          // delete vehicule from database
      }
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

//recuperate all vehicules marques
const getMarques = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await ServiceFlotte.getMarques(request, response);
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

//recuperate all vehicules models by id marque
const getModelsByIdMarque = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await ServiceFlotte.getModelsByIdMarque(request, response);
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

//delete a vehicule type 
const deleteVehiculeType = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await ServiceFlotte.deleteVehiculeType(request, response);
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

//Export controller Flotte functions 
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
  updateVehicleAvaible,
  updateVehicleImage,
  updateVehicleAM,
  updateVehicleType,
  deleteVehicule,
  deleteVehiculeType,
  getMarques,
  getModelsByIdMarque,
};
