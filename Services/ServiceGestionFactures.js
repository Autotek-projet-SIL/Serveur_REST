// Declaration de variables
const ModelFacture = require("../Models/ModelFacture.js");
const log = require("../config/Logger");

// Fonctions du service de gestion des factures
const addFacture = async (request, response) => {
  await ModelFacture.addFacture(request, response);
};

const getFactures = async (request, response) => {
  await ModelFacture.getFactures(request, response);
};

const getFactureById = async (request, response) => {
  await ModelFacture.getFactureById(request, response);
};

const getFactureByIdLouer = async (request, response) => {
  await ModelFacture.getFactureByIdLouer(request, response);
};

//Exporter les fonctions du service de gestion des factures
module.exports = {
  addFacture,
  getFactures,
  getFactureById,
  getFactureByIdLouer,
};
