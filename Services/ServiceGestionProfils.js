// Declaration de variables
const ModelLocataire = require("../Models/ModelLocataire");
const ModelATC = require("../Models/ModelATC");
const ModelDecideur = require("../Models/ModelDecideur");
const ModelAM = require("../Models/ModelAM");
const log = require("../config/Logger");

// Functions of service profils management
const getLocataireById = async (request, response) => {
  await ModelLocataire.getLocataireById(request, response);
};

// get locataires
const getLocataires = async (request, response) => {
  await ModelLocataire.getLocataires(request, response);
};
  
//update locataire
const updateLocataire = async (request, response) => {
  await ModelLocataire.updateLocataire(request, response);
};

//get atc by id
const getATCById = async (request, response) => {
  await ModelATC.getATCById(request, response);
};

//get all atc
const getATCs = async (request, response) => {
  await ModelATC.getATCs(request, response);
};

//update atc
const updateATC = async (request, response) => {
  await ModelATC.updateATC(request, response);
};

//update atc photo
const updateATCPhoto = async (request, response) => {
  await ModelATC.updateATCPhoto(request, response);
};

//update atc password
const updateATCPassword = async (request, response) => {
  await ModelATC.updateATCPassword(request, response);
};

//update atc statut
const updateATCStatut = async (request, response) => {
  await ModelATC.updateATCStatut(request, response);
};

//get decideur by id
const getDecideurById = async (request, response) => {
  await ModelDecideur.getDecideurById(request, response);
};

//get all decideurs
const getDecideurs = async (request, response) => {
  await ModelDecideur.getDecideurs(request, response);
};

//update decideur
const updateDecideur = async (request, response) => {
  await ModelDecideur.updateDecideur(request, response);
};

//update decideur photo
const updateDecideurPhoto = async (request, response) => {
  await ModelDecideur.updateDecideurPhoto(request, response);
};

//update decideur photo
const updateDecideurPassword = async (request, response) => {
  await ModelDecideur.updateDecideurPassword(request, response);
};

//get am by id
const getAMById = async (request, response) => {
  await ModelAM.getAMById(request, response);
};

//get ams
const getAMs = async (request, response) => {
  await ModelAM.getAMs(request, response);
};

//update am
const updateAM = async (request, response) => {
  await ModelAM.updateAM(request, response);
};

//update am photo
const updateAMPhoto = async (request, response) => {
  await ModelAM.updateAMPhoto(request, response);
};

//update am password
const updateAMPassword = async (request, response) => {
  await ModelAM.updateAMPassword(request, response);
};

//export functions
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
