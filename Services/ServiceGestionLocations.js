// Declaration de variables
const log = require("../config/Logger");
const modelLouer = require("../Models/ModelLouer");
const modelTrajet = require("../Models/ModelTrajet");
const modelFacture = require("../Models/ModelFacture");
// Fonctions du service gestion des locations

const updateLocationHeureDebut = async (request, response) => {
  try {
    await modelLouer.updateLocationHeureDebut(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

const endLocation = async (request, response) => {
  try {
    await modelLouer.endLocation(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

const updateLocationSuiviLocation = async (request, response) => {
  try {
    await modelLouer.updateLocationSuiviLocation(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

const getLocationsLocataire = async (request, response) => {
  try {
    await modelLouer.getLocationsLocataire(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

const getAllLocations = async (request, response) => {
  try {
    await modelLouer.getAllLocations(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

const getAllRegions = async (request, response) => {
  try {
    await modelLouer.getAllRegions(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

const getLocationsEnCours = async (request, response) => {
  try {
    await modelLouer.getLocationsEnCours(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

const getLocationsTermines = async (request, response) => {
  try {
    await modelLouer.getLocationsTermines(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

const addLocation = async (request, response) => {
  try {
    await modelLouer.addLocation(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

const getLocationById = async (request, response) => {
  try {
    await modelLouer.getLocationById(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

const getLocationsTerminesByIdLocataire = async (request, response) => {
  try {
    await modelLouer.getLocationsTerminesByIdLocataire(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

const getLocataireByNumeroChassis = async (request, response) => {
  try {
    await modelLouer.getLocataireByNumeroChassis(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

//Exporter les fonctions du service gestion des locations
module.exports = {
  getLocationsEnCours,
  getLocationsTermines,
  endLocation,
  addLocation,
  getLocationById,
  getLocationsLocataire,
  getAllLocations,
  updateLocationHeureDebut,
  getLocationsTerminesByIdLocataire,
  updateLocationSuiviLocation,
  getAllRegions,
  getLocataireByNumeroChassis
};
