// Declaration de variables
const ServiceGestionFactures = require("../Services/ServiceGestionFactures");
const firebaseVerifyToken = require("../config/firebase.js");
const log = require("../config/Logger");

// Fonctions du controlleur de gestion des factures

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

//Exporter les fonctions du controlleur de gestion des factures
module.exports = {
    addFacture,
    getFactures,
    getFactureById,
    getFactureByIdLouer,
};
