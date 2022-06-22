// Declaration of variables
const serviceStatistiques = require("../Services/ServiceStatistiques.js");
const firebaseVerifyToken = require("../config/firebase.js");
const log = require("../config/Logger");

// Statistics controller functions

//get accepted locations
const getLocationsAcceptes = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await serviceStatistiques.getLocationsAcceptes(request, response);
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

//get rejected locations
const getLocationsRejetes = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await serviceStatistiques.getLocationsRejetes(request, response);
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};


//get Location Statistics
const getLocationStatistics = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await serviceStatistiques.getLocationStatistics(request, response);
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};


//get Request Registration Statistics
const getDemandeInscriptionStatistics = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await serviceStatistiques.getDemandeInscriptionStatistics(
        request,
        response
      );
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};


//get Facture Statistics
const getFactureStatistics = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await serviceStatistiques.getFactureStatistics(request, response);
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

// Export the functions of the statistics controller
module.exports = {
  getLocationStatistics,
  getDemandeInscriptionStatistics,
  getFactureStatistics,
  getLocationsAcceptes,
  getLocationsRejetes,
};
