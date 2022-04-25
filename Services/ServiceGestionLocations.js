// Declaration de variables
const log = require("../config/Logger");
const modelLouer = require("../Models/ModelLouer");
const modelTrajet = require("../Models/ModelTrajet");
const modelFacture = require("../Models/ModelFacture");



//
//terminer une location
const updateLocationHeureDebut = async (request, response) => {
  try {
    await modelLouer.updateLocationHeureDebut(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

//terminer une location
const endLocation = async (request, response) => {
  try {
    await modelLouer.endLocation(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

//récupérer la liste des locations en cours d'un locataire
const getLocationsLocataire = async (request, response) => {
  try {
    await modelLouer.getLocationsLocataire(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};


//Recuperer toutes le locations
const getAllLocations = async (request, response) => {
  try {
    await modelLouer.getAllLocations(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

//Recuperer la liste des locations en cours
const getLocationsEnCours = async (request, response) => {
  try {
    await modelLouer.getLocationsEnCours(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

//Recuperer la liste des locations termines
const getLocationsTermines = async (request, response) => {
  try {
    await modelLouer.getLocationsTermines(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

//Ajouter une location

const addLocation = async (request, response) => {
  try {
  
    await modelTrajet.addTrajet(request, response);
    await modelLouer.addLocation(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

//recuperer une location par son id
const getLocationById = async (request, response) => {
  try {
    await modelLouer.getLocationById(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

//Exporter les fonctions du service gestion locations
module.exports = {
  getLocationsEnCours,
  getLocationsTermines,
  endLocation,
  addLocation,
  getLocationById,
  getLocationsLocataire,
  getAllLocations,
  updateLocationHeureDebut
};
