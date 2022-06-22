// variable declaration
const log = require("../config/Logger");
const modelLouer = require("../Models/ModelLouer");
const modelFacture = require("../Models/ModelFacture");
const modelDemandeInscription = require("../Models/ModelDemandeInscription");

// statistic service functions

//get accepted locations
const getLocationsAcceptes = async (request, response) => {
  await modelLouer.getLocationsAcceptes(request, response);
};

//get rejected locations
const getLocationsRejetes = async (request, response) => {
  await modelLouer.getLocationsRejetes(request, response);
};


//get statistics locations
const getLocationStatistics = async (request, response) => {
  await modelLouer.getLocationStatistics(request, response);
};


// get inscription request statistics
const getDemandeInscriptionStatistics = async (request, response) => {
  await modelDemandeInscription.getDemandeInscriptionStatistics(
    request,
    response
  );
};
// get facture statistics
const getFactureStatistics = async (request, response) => {
  await modelFacture.getFactureStatistics(request, response);
};

//export functions
module.exports = {
  getLocationStatistics,
  getDemandeInscriptionStatistics,
  getFactureStatistics,
  getLocationsRejetes,
  getLocationsAcceptes,
};
