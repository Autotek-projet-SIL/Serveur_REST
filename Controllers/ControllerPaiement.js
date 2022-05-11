// Declaration de variables
const ServicePaiement = require("../Services/ServicePaiement");
const firebaseVerifyToken = require("../config/firebase.js");
const log = require("../config/Logger");

// Fonctions du controlleur de paiement
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

// Exporter les fonctions du controlleur de paiement
module.exports = {
  verifierPaiement,
  getPaiementsByIdLocataire,
};
