// Declaration de variables
const ServiceGestionTaches = require("../Services/ServiceGestionTaches.js");
const firebaseVerifyToken = require("../config/firebase.js");
const log = require("../config/Logger");
let serviceNotification = require("../Services/ServiceNotification");
// Fonctions du controlleur de gestion des taches

//ajouter une tache
const addTache = async (request, response) => {
  await firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await ServiceGestionTaches.addTache(request, response);
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

//recuperer une tache par son id (utiliser seulement pour les tests)
const getTacheById = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await ServiceGestionTaches.getTacheById(request, response);
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

//recuperer la liste des taches
const getTaches = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await ServiceGestionTaches.getTaches(request, response);
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

//mettre à jour l'etat d'avancement d'une tache
const updateEtatAvancementTache = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await ServiceGestionTaches.updateEtatAvancementTache(request, response);
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

//mettre a jour l'etat d'une tache
const updateEtatTache = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await ServiceGestionTaches.updateEtatTache(request, response);
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

// recuperer un am par son id
const getTacheByIdAm = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await ServiceGestionTaches.getTacheByIdAm(request, response);
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

//Exporter les fonctions du controlleur de gestion des factures
module.exports = {
  addTache,
  getTaches,
  getTacheByIdAm,
  updateEtatTache,
  updateEtatAvancementTache,
  getTacheById,
};
