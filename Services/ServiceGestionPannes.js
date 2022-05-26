// Declaration de variables
const ModelPanne = require("../Models/ModelPanne.js");
const ModelTache = require("../Models/ModelTache.js");
const log = require("../config/Logger");

// Fonctions du service de gestion des pannes

// ajouter une panne
const addPanne = async (request, response) => {
  try {
  await  ModelPanne.addPanne(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

//recuperer la liste des pannes
const getPannes = async (request, response) => {
  try {
    await ModelPanne.getPannes(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

//recuperer une panne par son id
const getPanneById = async (request, response) => {
  try {
    await ModelPanne.getPanneById(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

//Exporter les fonctions du service de gestion des pannes
module.exports = {
    addPanne,
    getPannes,
    getPanneById
  
};
