// Declaration de variables
const ModelLocataire = require("../Models/ModelLocataire");
const ModelATC = require("../Models/ModelATC");
const ModelDecideur = require("../Models/ModelDecideur");
const ModelAM = require("../Models/ModelAM");
const log = require("../config/Logger");

// Fonctions du service de gestion des profils
const getLocataireById = async (request, response) => {
  try {
    await ModelLocataire.getLocataireById(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

const getLocataires = async (request, response) => {
  try {
    await ModelLocataire.getLocataires(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

const updateLocataire = async (request, response) => {
  try {
    await ModelLocataire.updateLocataire(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

const getATCById = async (request, response) => {
  try {
    await ModelATC.getATCById(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

const getATCs = async (request, response) => {
  try {
    await ModelATC.getATCs(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

const updateATC = async (request, response) => {
  try {
    await ModelATC.updateATC(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

const updateATCPhoto = async (request, response) => {
  try {
    await ModelATC.updateATCPhoto(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

const updateATCPassword = async (request, response) => {
  try {
    await ModelATC.updateATCPassword(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

const updateATCStatut = async (request, response) => {
  try {
    await ModelATC.updateATCStatut(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

const getDecideurById = async (request, response) => {
  try {
    await ModelDecideur.getDecideurById(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

const getDecideurs = async (request, response) => {
  try {
    await ModelDecideur.getDecideurs(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

const updateDecideur = async (request, response) => {
  try {
    await ModelDecideur.updateDecideur(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

const updateDecideurPhoto = async (request, response) => {
  try {
    await ModelDecideur.updateDecideurPhoto(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

const updateDecideurPassword = async (request, response) => {
  try {
    await ModelDecideur.updateDecideurPassword(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

const getAMById = async (request, response) => {
  try {
    await ModelAM.getAMById(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

const getAMs = async (request, response) => {
  try {
    await ModelAM.getAMs(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

const updateAM = async (request, response) => {
  try {
    await ModelAM.updateAM(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

const updateAMPhoto = async (request, response) => {
  try {
    await ModelAM.updateAMPhoto(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

const updateAMPassword = async (request, response) => {
  try {
    await ModelAM.updateAMPassword(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

//Exporter les fonctions du service de gestion des profils
module.exports = {
  getLocataires,
  updateLocataire,
  getATCs,
  updateATC,
  updateATCPhoto,
  updateATCPassword,
  updateATCStatut,
  getDecideurs,
  updateDecideur,
  updateDecideurPassword,
  updateDecideurPhoto,
  getAMs,
  updateAM,
  updateAMPhoto,
  updateAMPassword,
  getAMById,
  getATCById,
  getDecideurById,
  getLocataireById,
};
