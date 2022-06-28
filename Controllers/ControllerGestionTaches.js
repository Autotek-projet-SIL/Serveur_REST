// Variables Declaration
const ServiceGestionTaches = require("../Services/ServiceGestionTaches.js"); // Service of this Controller : Tache
const firebaseVerifyToken = require("../config/firebase.js"); // FireBase Configuration
const log = require("../config/Logger"); // Display Configuration
let serviceNotification = require("../Services/ServiceNotification"); // Service to send Notifications

// Controller of service Tache Declaration

//add a Tache
const addTache = async (request, response) => {
  await firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await ServiceGestionTaches.addTache(request, response);
      if (response.statusCode == 200) {
        // if the tache added correctly
        if (process.env.NODE_ENV === "production") {
          // send a notification
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

// get a Tache By id (to use just for tests)
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

// get all Taches
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

//Update etat avancement field in a Tache
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

//Update etat field in a Tache
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

//recuperate the liste of all taches by id AM
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

// Export all the Controller of Taches Functions
module.exports = {
  addTache,
  getTaches,
  getTacheByIdAm,
  updateEtatTache,
  updateEtatAvancementTache,
  getTacheById,
};
