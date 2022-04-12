// Declaration de variables
const ModelLocataire = require("../Models/ModelLocataire.js");
const ModelDecideur = require("../Models/ModelDecideur.js");
const ModelATC = require("../Models/ModelATC.js");
const ModelAM = require("../Models/ModelAM.js");
const log = require("../config/Logger");

// Fonctions du service de gestion des comptes

const deleteLocataire = async (request, response) => {
  try {
    await ModelLocataire.deleteLocataire(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

const deleteATC = async (request, response) => {
  try {
    await ModelATC.deleteATC(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

const deleteDecideur = async (request, response) => {
  try {
    await ModelDecideur.deleteDecideur(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

const deleteAM = async (request, response) => {
  try {
    await ModelAM.deleteAM(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

const addLocataire = async (request, response) => {
  try {
    await ModelLocataire.addLocataire(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

const addATC = async (request, response) => {
  try {
    await ModelATC.addATC(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

const addDecideur = async (request, response) => {
  try {
    await ModelDecideur.addDecideur(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

const addAM = async (request, response) => {
  try {
    await ModelAM.addAM(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

//Exporter les fonctions du service de gestion des comptes
module.exports = {
  deleteAM,
  deleteDecideur,
  deleteATC,
  deleteLocataire,
  addAM,
  addDecideur,
  addATC,
  addLocataire,
};
