// Declaration de variables
const log = require("../config/Logger");
const modelLouer = require("../Models/ModelLouer");
const modelTrajet = require("../Models/ModelTrajet");
const modelFacture = require("../Models/ModelFacture");

// Function of  locations management service


//update location begginig hour
const updateLocationHeureDebut = async (request, response) => {
  await modelLouer.updateLocationHeureDebut(request, response);
};

//end location
const endLocation = async (request, response) => {
  await modelLouer.endLocation(request, response);
};

//update tracking location
const updateLocationSuiviLocation = async (request, response) => {
  await modelLouer.updateLocationSuiviLocation(request, response);
};

//get locations by locataire
const getLocationsLocataire = async (request, response) => {
  await modelLouer.getLocationsLocataire(request, response);
};

//get all locaations
const getAllLocations = async (request, response) => {
  await modelLouer.getAllLocations(request, response);
};

//get all regions
const getAllRegions = async (request, response) => {
  await modelLouer.getAllRegions(request, response);
};

//get locations in progress
const getLocationsEnCours = async (request, response) => {
  await modelLouer.getLocationsEnCours(request, response);
};

//get ended locations
const getLocationsTermines = async (request, response) => {
  await modelLouer.getLocationsTermines(request, response);
};

//add location
const addLocation = async (request, response) => {
  await modelLouer.addLocation(request, response);
};

//get location by id
const getLocationById = async (request, response) => {
  await modelLouer.getLocationById(request, response);
};

//get ended locations by locataire
const getLocationsTerminesByIdLocataire = async (request, response) => {
  await modelLouer.getLocationsTerminesByIdLocataire(request, response);
};

//get locataire by num chassis
const getLocataireByNumeroChassis = async (request, response) => {
  await modelLouer.getLocataireByNumeroChassis(request, response);
};

//Export methods
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
