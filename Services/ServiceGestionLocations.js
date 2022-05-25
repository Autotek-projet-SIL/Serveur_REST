// Declaration de variables
const log = require("../config/Logger");
const modelLouer = require("../Models/ModelLouer");
const modelTrajet = require("../Models/ModelTrajet");
const modelFacture = require("../Models/ModelFacture");

// Fonctions du service gestion des locations

const updateLocationHeureDebut = async (request, response) => {
  await modelLouer.updateLocationHeureDebut(request, response);
};

const endLocation = async (request, response) => {
  await modelLouer.endLocation(request, response);
};

const updateLocationSuiviLocation = async (request, response) => {
  await modelLouer.updateLocationSuiviLocation(request, response);
};

const getLocationsLocataire = async (request, response) => {
  await modelLouer.getLocationsLocataire(request, response);
};

const getAllLocations = async (request, response) => {
  await modelLouer.getAllLocations(request, response);
};

const getAllRegions = async (request, response) => {
  await modelLouer.getAllRegions(request, response);
};

const getLocationsEnCours = async (request, response) => {
  await modelLouer.getLocationsEnCours(request, response);
};

const getLocationsTermines = async (request, response) => {
  await modelLouer.getLocationsTermines(request, response);
};

const addLocation = async (request, response) => {
  await modelLouer.addLocation(request, response);
};

const getLocationById = async (request, response) => {
  await modelLouer.getLocationById(request, response);
};

const getLocationsTerminesByIdLocataire = async (request, response) => {
  await modelLouer.getLocationsTerminesByIdLocataire(request, response);
};

const getLocataireByNumeroChassis = async (request, response) => {
  await modelLouer.getLocataireByNumeroChassis(request, response);
};

//Exporter les fonctions du service gestion des locations
module.exports = {
  getLocationsEnCours,
  getLocationsTermines,
  endLocation,
  addLocation,
  getLocationById,
  getLocationsLocataire,
  getAllLocations,
  updateLocationHeureDebut,
  getLocationsTerminesByIdLocataire,
  updateLocationSuiviLocation,
  getAllRegions,
  getLocataireByNumeroChassis,
};
