// Variables Declaration
const log = require("../config/Logger"); // display configuration data and methods
const modelDemandeSupport = require("../Models/ModelDemandeSupport"); // Model of this service : DemandeSupport

// Functions of demandeSupport management Service

//recuperate all support requests
const getDemandeSupport = async (request, response) => {
  await modelDemandeSupport.getDemandeSupport(request, response);
};

//recuperate a support request by id
const getDemandeSupportById = async (request, response) => {
  await modelDemandeSupport.getDemandeSupportById(request, response);
};

//recuperate all support requests for a location
const getDemandeSupportLouer = async (request, response) => {
  await modelDemandeSupport.getDemandeSupportLouer(request, response);
};

//add a support request
const addDemandeSupport = async (request, response) => {
  await modelDemandeSupport.addDemandeSupport(request, response);
};

//Response to a support request
const responseDemandeSupport = async (request, response) => {
  await modelDemandeSupport.responseDemandeSupport(request, response);
};
 
//exports methods
module.exports = {
  getDemandeSupport,
  getDemandeSupportById,
  getDemandeSupportLouer,
  addDemandeSupport,
  responseDemandeSupport,
};
