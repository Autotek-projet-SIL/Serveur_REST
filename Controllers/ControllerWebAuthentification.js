// Declaration de variables
const serviceWebAuthentification = require("../Services/ServiceWebAuthentification.js");
const firebaseVerifyToken = require("../config/firebase.js");
const log = require("../config/Logger");
const notification = require("../Services/ServiceNotification");

// Fonctions du controlleur d'authentification web
const validerDemandeInscription = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await serviceWebAuthentification.validerDemandeInscription(
        request,
        response
      );
      await notification.sendNotification(
        "Demande validée",
        "Votre demande d'inscription a été validée",
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

const refuserDemandeInscription = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await serviceWebAuthentification.refuserDemandeInscription(
        request,
        response
      );
      await notification.sendNotification(
        "Demande refusée",
        "Votre demande d'inscription a été refusée",
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

const getDemandesInscription = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await serviceWebAuthentification.getDemandesInscription(
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

const getDecideurByEmail = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await serviceWebAuthentification.getDecideurByEmail(request, response);
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

const getATCByEmail = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await serviceWebAuthentification.getATCByEmail(request, response);
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

// Exporter les fonctions du controlleur d'authentification web
module.exports = {
  validerDemandeInscription,
  refuserDemandeInscription,
  getDemandesInscription,
  getDecideurByEmail,
  getATCByEmail,
};
