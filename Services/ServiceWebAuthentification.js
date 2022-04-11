// Declaration de variables
const ModelJustificatif = require("../Models/ModelJustificatif.js");
const ModelDemandeInscription = require("../Models/ModelDemandeInscription.js");
const ModelLocataire = require("../Models/ModelLocataire.js");
const ModelATC = require("../Models/ModelATC");
const ModelDecideur = require("../Models/ModelDecideur");
const log = require("../config/Logger");

// Fonctions du service d'authentification web

const validerDemandeInscription = async (request, response) => {
  try {
    await ModelDemandeInscription.updateDemandeInscription(
      request,
      response,
      "validee"
    );
    await ModelLocataire.updateLocataireStatus(request, response, true);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

const refuserDemandeInscription = async (request, response) => {
  try {
    await ModelDemandeInscription.updateDemandeInscription(
      request,
      response,
      "refusee"
    );
    await ModelJustificatif.addJustificatif(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

const getDemandesInscription = async (request, response) => {
  try {
    await ModelDemandeInscription.getDemandesInscription(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

const getDecideurByEmail = async (request, response) => {
  try {
    await ModelDecideur.getDecideurByEmail(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

const getATCByEmail = async (request, response) => {
  try {
    await ModelATC.getATCByEmail(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

//Exporter les fonctions du service d'authentification web
module.exports = {
  validerDemandeInscription,
  refuserDemandeInscription,
  getDemandesInscription,
  getDecideurByEmail,
  getATCByEmail,
};
