// Declaration de variables
const ModelLocataire = require("../Models/ModelLocataire.js");
const ModelDecideur = require("../Models/ModelDecideur.js");
const ModelATC = require("../Models/ModelATC.js");
const ModelAM = require("../Models/ModelAM.js");
const log = require("../config/Logger");

// Fonctions du service de gestion des comptes
const deleteLocataire = async (request, response) => {
  await ModelLocataire.deleteLocataire(request, response);
};

const deleteATC = async (request, response) => {
  await ModelATC.deleteATC(request, response);
};

const deleteDecideur = async (request, response) => {
  await ModelDecideur.deleteDecideur(request, response);
};

const deleteAM = async (request, response) => {
  await ModelAM.deleteAM(request, response);
};

const addLocataire = async (request, response) => {
  await ModelLocataire.addLocataire(request, response);
};

const addATC = async (request, response) => {
  await ModelATC.addATC(request, response);
};

const addDecideur = async (request, response) => {
  await ModelDecideur.addDecideur(request, response);
};

const addAM = async (request, response) => {
  await ModelAM.addAM(request, response);
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
