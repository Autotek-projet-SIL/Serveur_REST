// Declaration of variables
const serviceWebAuthentification = require("../Services/ServiceWebAuthentification.js");
const firebaseVerifyToken = require("../config/firebase.js");
const log = require("../config/Logger");
const notification = require("../Services/ServiceNotification");

// Functions of the web authentication controller

//validate registration request
const validerDemandeInscription = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await serviceWebAuthentification.validerDemandeInscription(
        request,
        response
      );
      if (process.env.NODE_ENV === "production") {
        await notification.sendNotification(
          "Demande validée",
          "Votre demande d'inscription a été validée",
          request,
          response
        );
      }
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

//refuse registration request
const refuserDemandeInscription = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await serviceWebAuthentification.refuserDemandeInscription(
        request,
        response
      );
      if (process.env.NODE_ENV === "production") {
        await notification.sendNotification(
          "Demande refusée",
          "Votre demande d'inscription a été refusée",
          request,
          response
        );
      }
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

//get Requests Registration
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

//get Decideur By Email
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

//get ATC By Email
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

// Export web authentication controller functions
module.exports = {
  validerDemandeInscription,
  refuserDemandeInscription,
  getDemandesInscription,
  getDecideurByEmail,
  getATCByEmail,
};
