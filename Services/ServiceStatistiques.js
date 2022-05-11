// Declaration de variables
const log = require("../config/Logger");
const modelLouer = require("../Models/ModelLouer");
const modelFacture = require("../Models/ModelFacture");
const modelDemandeInscription = require("../Models/ModelDemandeInscription");

// Fonctions du service statistiques
const getLocationsAcceptes = async (request, response) => {
  try {
    await modelLouer.getLocationsAcceptes(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

const getLocationsRejetes = async (request, response) => {
  try {
    await modelLouer.getLocationsRejetes(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

const getLocationStatistics = async (request, response) => {
  try {
    await modelLouer.getLocationStatistics(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

const getDemandeInscriptionStatistics = async (request, response) => {
  try {
    await modelDemandeInscription.getDemandeInscriptionStatistics(
      request,
      response
    );
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

const getFactureStatistics = async (request, response) => {
  try {
    await modelFacture.getFactureStatistics(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

//Exporter les fonctions du service statistiques
module.exports = {
  getLocationStatistics,
  getDemandeInscriptionStatistics,
  getFactureStatistics,
  getLocationsRejetes,
  getLocationsAcceptes,
};
