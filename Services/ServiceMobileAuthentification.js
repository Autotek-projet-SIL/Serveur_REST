// Declaration de variables
const modelLocataire = require("../Models/ModelLocataire");
const modelAM = require("../Models/ModelAM");
const modelDemandeInscription = require("../Models/ModelDemandeInscription");
const log = require("../config/Logger");

// Fonctions du service d'authentification mobile
const inscriptionLocataire = async (request, response) => {
  try {
    await modelLocataire.addLocataire(request, response);
    await modelDemandeInscription.addDemandeInscription(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

const connexionLocataire = async (request, response) => {
  try {
    await modelLocataire.getLocataireByEmail(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

const connexionAM = async (request, response) => {
  try {
    await modelAM.getAMByEmail(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

const envoyerDemandeInscription = async (request, response) => {
  try {
    await modelDemandeInscription.addDemandeInscription(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

// Exporter les fonctions du service d'authentification mobile
module.exports = {
  inscriptionLocataire,
  connexionLocataire,
  connexionAM,
  envoyerDemandeInscription,
};
