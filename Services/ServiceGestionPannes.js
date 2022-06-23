// Variables Declaration
const ModelPanne = require("../Models/ModelPanne.js"); // Model Panne
const ModelTache = require("../Models/ModelTache.js"); // Model Tache
const log = require("../config/Logger"); // Display Configuration

// Functions of service panne Service Declaration

//add a panne
const addPanne = async (request, response) => {
  await ModelPanne.addPanne(request, response);
};

// get all pannes
const getPannes = async (request, response) => {
  await ModelPanne.getPannes(request, response);
};

// get a panne by id
const getPanneById = async (request, response) => {
  await ModelPanne.getPanneById(request, response);
};

// Export all Service Panne functions
module.exports = {
  addPanne,
  getPannes,
  getPanneById,
};
