// Declaration de variables
const ServiceGestionPannes = require("../Services/ServiceGestionPannes.js");
const firebaseVerifyToken = require("../config/firebase.js");
let serviceNotification = require("../Services/ServiceNotification");
const log = require("../config/Logger");

// Fonctions du controlleur de gestion des pannes

//ajouter panne
const addPanne = async (request, response) => {
  await firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await ServiceGestionPannes.addPanne(request, response);
      if (response.statusCode == 200) {
        if (process.env.NODE_ENV === "production") {
          await serviceNotification.sendNotification(
            "Nouvelle tache attribuée",
            request.body.descriptif,
            request,
            response
          );
        }
        response.sendStatus(200);
      } else {
        response.sendStatus(500);
      }
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

//recuperer la liste des pannes
const getPannes = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await ServiceGestionPannes.getPannes(request, response);
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

//recuperer une panne par son id
const getPanneById = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await ServiceGestionPannes.getPanneById(request, response);
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

//Exporter les fonctions du controlleur de gestion des factures
module.exports = {
  addPanne,
  getPannes,
  getPanneById,
};
