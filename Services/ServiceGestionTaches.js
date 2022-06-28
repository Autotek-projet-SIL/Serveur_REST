// Variables Declaration
const ModelTache = require("../Models/ModelTache.js"); // Model Tache
const log = require("../config/Logger"); // Display Configuration

// Functions of service Tache Declaration

//add a Tache
const addTache = async (request, response) => {
  await ModelTache.addTache(request, response);
};

// get all Taches
const getTaches = async (request, response) => {
  await ModelTache.getTaches(request, response);
};

// get a Tache By id
const getTacheById = async (request, response) => {
  await ModelTache.getTacheById(request, response);
};

//recuperate the liste of all taches by id AM
const getTacheByIdAm = async (request, response) => {
  await ModelTache.getTacheByIdAm(request, response);
};

//Update etat avancement field in a Tache
const updateEtatAvancementTache = async (request, response) => {
  await ModelTache.updateEtatAvancementTache(request, response);
};

//Update etat field in a Tache
const updateEtatTache = async (request, response) => {
  await ModelTache.updateEtatTache(request, response);
};
 
// Export all the Service of Taches Functions
module.exports = {
  addTache,
  getTaches,
  getTacheByIdAm,
  updateEtatTache,
  getTacheById,
  updateEtatAvancementTache,
};
