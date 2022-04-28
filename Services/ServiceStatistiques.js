// Declaration de variables
const log = require("../config/Logger");
const modelLouer = require("../Models/ModelLouer");
const modelTrajet = require("../Models/ModelTrajet");
const modelFacture = require("../Models/ModelFacture");
const modelDemandeInscription = require("../Models/ModelDemandeInscription");


//récupérer la liste des locations acceptes pour le service stattistique
const getLocationsAcceptes = async (request, response) => {
  try {
    await modelLouer.getLocationsAcceptes(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};


//récupérer la liste des locations rejetes pour le service stattistique
const  getLocationsRejetes = async (request, response) => {
  try {
    await modelLouer.getLocationsRejetes(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};


//récupérer la liste des locations pour le service stattistiques 

const  getLocationStatistics = async (request, response) => {
  try {
    await modelLouer.getLocationStatistics(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

//récupérer la liste des demandes d'inscriptions pour le service statistiques

const  getDemandeInscriptionStatistics = async (request, response) => {
  try {
    await modelDemandeInscription.getDemandeInscriptionStatistics(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

//récupérer la liste des demandes d'inscriptions pour le service statistiques

const  getFactureStatistics = async (request, response) => {
  try {
    await modelFacture.getFactureStatistics(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};



//Exporter les fonctions du service gestion locations
module.exports = {
    getLocationStatistics,
    getDemandeInscriptionStatistics,
    getFactureStatistics,
    getLocationsRejetes,
    getLocationsAcceptes
};
