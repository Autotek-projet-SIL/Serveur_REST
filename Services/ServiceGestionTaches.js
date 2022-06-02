// Declaration de variables

const ModelTache = require("../Models/ModelTache.js");
const log = require("../config/Logger");

// Fonctions du service de gestion des taches

// ajouter une tache
const addTache = async (request, response) => {
  await ModelTache.addTache(request, response);
};

//recuperer la liste des taches
const getTaches = async (request, response) => {
  await ModelTache.getTaches(request, response);
};

//recuperer la liste des taches par am
const getTacheByIdAm = async (request, response) => {
  await ModelTache.getTacheByIdAm(request, response);
};

//mettre a jour l'etat d'avancement d'une tache
const updateEtatAvancementTache = async (request, response) => {
  await ModelTache.updateEtatAvancementTache(request, response);
};

//mettre a jour l'etat  d'une tache
const updateEtatTache = async (request, response) => {
  await ModelTache.updateEtatTache(request, response);
};

//Exporter les fonctions du service de gestion des taches
module.exports = {
  addTache,
  getTaches,
  getTacheByIdAm,
  updateEtatTache,
  updateEtatAvancementTache,
};
