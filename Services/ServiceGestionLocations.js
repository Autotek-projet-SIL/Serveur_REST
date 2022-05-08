// Declaration de variables
const log = require("../config/Logger");
const modelLouer = require("../Models/ModelLouer");
const modelTrajet = require("../Models/ModelTrajet");
const modelFacture = require("../Models/ModelFacture");

//mettre a jour l'heure de debut de location lors du deveroillage
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

//mettre a jour l'etat de la location
const updateLocationSuiviLocation = async (request, response) => {
  try {
    await modelLouer.updateLocationSuiviLocation(request, response);
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

//Recuperer toutes les locations
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
    await modelLouer.addLocation(request, response);
  /*  if (request.body.status_demande_location == "accepte") {
    await modelLouer.updateVehicleDisponible(
        (num_chassis = request.body.numero_chassis),
        response,
        (id_louer = null),
        false
      );
    } else {
      response.sendStatus(response.statusCode);
    }*/
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

//recuperer la liste des locations terminés d'un locataire
const getLocationsTerminesByIdLocataire = async (request, response) => {
  try {
    await modelLouer.getLocationsTerminesByIdLocataire(request, response);
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
  updateLocationHeureDebut,
  getLocationsTerminesByIdLocataire,
  updateLocationSuiviLocation
};
