// Declaration of variables
const ServicePaiement = require("../Services/ServicePaiement");
const firebaseVerifyToken = require("../config/firebase.js");
const log = require("../config/Logger");

// Payment controller functions

//verifyPayment
const verifierPaiement = async (request, response) => {
  await firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await ServicePaiement.VerifierPaiement(request, response);
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

//get Payments By Tenant Id
const getPaiementsByIdLocataire = async (request, response) => {
  await firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await ServicePaiement.getPaiementsByIdLocataire(request, response);
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

// Export payment controller functions
module.exports = {
  verifierPaiement,
  getPaiementsByIdLocataire,
};
