// Variables Declaration
const ModelFacture = require("../Models/ModelFacture.js"); // the Model of this Service : Facture
const log = require("../config/Logger"); // Display Configuration

//Functions of Facture Management Service

// add a Facture
const addFacture = async (request, response) => {
  await ModelFacture.addFacture(request, response);
};

//recuperate all Factures
const getFactures = async (request, response) => {
  await ModelFacture.getFactures(request, response);
};
 
// recuperate a facture by id
const getFactureById = async (request, response) => {
  await ModelFacture.getFactureById(request, response);
};

// recuperate a facture by id_louer
const getFactureByIdLouer = async (request, response) => {
  await ModelFacture.getFactureByIdLouer(request, response);
};

//Export Service functions of Factures management
module.exports = {
  addFacture,
  getFactures,
  getFactureById,
  getFactureByIdLouer,
};
