// Declaration de variables
const log = require("../config/Logger");
const modelLouer = require("../Models/ModelLouer");
const modelFacture = require("../Models/ModelFacture");
const modelDemandeInscription = require("../Models/ModelDemandeInscription");

// Fonctions du service statistiques
const getLocationsAcceptes = async (request, response) => {
  await modelLouer.getLocationsAcceptes(request, response);
};

const getLocationsRejetes = async (request, response) => {
  await modelLouer.getLocationsRejetes(request, response);
};

const getLocationStatistics = async (request, response) => {
  await modelLouer.getLocationStatistics(request, response);
};

const getDemandeInscriptionStatistics = async (request, response) => {
  await modelDemandeInscription.getDemandeInscriptionStatistics(
    request,
    response
  );
};

const getFactureStatistics = async (request, response) => {
  await modelFacture.getFactureStatistics(request, response);
};

//Exporter les fonctions du service statistiques
module.exports = {
  getLocationStatistics,
  getDemandeInscriptionStatistics,
  getFactureStatistics,
  getLocationsRejetes,
  getLocationsAcceptes,
};
