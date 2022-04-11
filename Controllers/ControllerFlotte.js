const ServiceFlotte = require("../Services/ServiceFlotte");
const firebaseVerifyToken = require("../config/firebase.js");
const log = require("../config/Logger");

// Fonctions du controlleur flotte
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

//Exporter les fonctions du controlleur flotte
module.exports = {
    getVehicles,
    getVehicleDetail
};