// Declaration de variables
const ModelLocataire = require("../Models/ModelLocataire");
const ModelATC = require("../Models/ModelATC");
const ModelDecideur = require("../Models/ModelDecideur");
const ModelAM = require("../Models/ModelAM");
const log = require("../config/Logger");

// Fonctions du service de gestion des profils
const getLocataireById = async (request, response) => {
  await ModelLocataire.getLocataireById(request, response);
};

const getLocataires = async (request, response) => {
  await ModelLocataire.getLocataires(request, response);
};

const updateLocataire = async (request, response) => {
  await ModelLocataire.updateLocataire(request, response);
};

const getATCById = async (request, response) => {
  await ModelATC.getATCById(request, response);
};

const getATCs = async (request, response) => {
  await ModelATC.getATCs(request, response);
};

const updateATC = async (request, response) => {
  await ModelATC.updateATC(request, response);
};

const updateATCPhoto = async (request, response) => {
  await ModelATC.updateATCPhoto(request, response);
};

const updateATCPassword = async (request, response) => {
  await ModelATC.updateATCPassword(request, response);
};

const updateATCStatut = async (request, response) => {
  await ModelATC.updateATCStatut(request, response);
};

const getDecideurById = async (request, response) => {
  await ModelDecideur.getDecideurById(request, response);
};

const getDecideurs = async (request, response) => {
  await ModelDecideur.getDecideurs(request, response);
};

const updateDecideur = async (request, response) => {
  await ModelDecideur.updateDecideur(request, response);
};

const updateDecideurPhoto = async (request, response) => {
  await ModelDecideur.updateDecideurPhoto(request, response);
};

const updateDecideurPassword = async (request, response) => {
  await ModelDecideur.updateDecideurPassword(request, response);
};

const getAMById = async (request, response) => {
  await ModelAM.getAMById(request, response);
};

const getAMs = async (request, response) => {
  await ModelAM.getAMs(request, response);
};

const updateAM = async (request, response) => {
  await ModelAM.updateAM(request, response);
};

const updateAMPhoto = async (request, response) => {
  await ModelAM.updateAMPhoto(request, response);
};

const updateAMPassword = async (request, response) => {
  await ModelAM.updateAMPassword(request, response);
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
