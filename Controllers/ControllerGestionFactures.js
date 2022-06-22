// Variables Declaration 
const ServiceGestionFactures = require("../Services/ServiceGestionFactures");            // the Service of this Controller : Facture
const firebaseVerifyToken = require("../config/firebase.js");                         // FireBase Configurations
const log = require("../config/Logger");                                              // Display Configuration

//Functions of Facture Management Controller  

// add a Facture
const addFacture = async (request, response) => {
  await firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await ServiceGestionFactures.addFacture(request, response);
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

//recuperate all Factures
const getFactures = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await ServiceGestionFactures.getFactures(request, response);
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

// recuperate a facture by id
const getFactureById = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await ServiceGestionFactures.getFactureById(request, response);
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

// recuperate a facture by id_louer
const getFactureByIdLouer = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await ServiceGestionFactures.getFactureByIdLouer(request, response);
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

//Export Controller functions of Factures management
module.exports = {
  addFacture,
  getFactures,
  getFactureById,
  getFactureByIdLouer,
};
