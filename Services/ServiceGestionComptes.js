//variable declaration
const ModelLocataire = require("../Models/ModelLocataire.js");
const ModelDecideur = require("../Models/ModelDecideur.js");
const ModelATC = require("../Models/ModelATC.js");
const ModelAM = require("../Models/ModelAM.js");
const log = require("../config/Logger");

// Functions of   gestiondescomptes Service

//delete locataire
const deleteLocataire = async (request, response) => {
  await ModelLocataire.deleteLocataire(request, response);
};

//delete atc
const deleteATC = async (request, response) => {
  await ModelATC.deleteATC(request, response);
};

//delete decideur
const deleteDecideur = async (request, response) => {
  await ModelDecideur.deleteDecideur(request, response);
};

//delete am
const deleteAM = async (request, response) => {
  await ModelAM.deleteAM(request, response);
};

//add locataire
const addLocataire = async (request, response) => {
  await ModelLocataire.addLocataire(request, response);
};

//add atc
const addATC = async (request, response) => {
  await ModelATC.addATC(request, response);
};

//add decideur
const addDecideur = async (request, response) => {
  await ModelDecideur.addDecideur(request, response);
};

//add am
const addAM = async (request, response) => {
  await ModelAM.addAM(request, response);
};

//export methods
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
