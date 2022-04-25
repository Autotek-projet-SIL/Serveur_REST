// Declaration de variables
const ModelFacture = require("../Models/ModelFacture.js");
const log = require("../config/Logger");

// Fonctions du service de gestion des factures
const addFacture = async (request, response) => {
  try {
    await ModelFacture.addFacture(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    response.sendStatus(500);
  }
};

const getFactures = async (request, response) => {
    try {
      await ModelFacture.getFactures(request, response);
    } catch (error) {
      log.loggerConsole.error(error);
      response.sendStatus(500);
    }
};

const getFactureById = async (request, response) => {
    try {
      await ModelFacture.getFactureById(request, response);
    } catch (error) {
      log.loggerConsole.error(error);
      response.sendStatus(500);
    }
};

//Exporter les fonctions du service de gestion des factures
module.exports = {
  addFacture,
  getFactures,
  getFactureById,
};
