// Declaration of variables
const serviceMobileAuthentification = require("../Services/ServiceMobileAuthentification.js");
const firebaseVerifyToken = require("../config/firebase.js");
const log = require("../config/Logger");

//Functions of mobile authentication controller

//locataire registaration
const inscriptionLocataire = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await serviceMobileAuthentification.inscriptionLocataire(
        request,
        response
      );
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};


//login locataire
const connexionLocataire = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await serviceMobileAuthentification.connexionLocataire(request, response);
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};


//login am
const connexionAM = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await serviceMobileAuthentification.connexionAM(request, response);
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};


//send registration request
const envoyerDemandeInscription = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await serviceMobileAuthentification.envoyerDemandeInscription(
        request,
        response
      );
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

// Export mobile authentication controller functions
module.exports = {
  inscriptionLocataire,
  connexionLocataire,
  connexionAM,
  envoyerDemandeInscription,
};
