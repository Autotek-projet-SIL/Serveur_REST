// Variables Declaration
const ServiceGestionPannes = require("../Services/ServiceGestionPannes.js"); // Service of this controller Pannes
const firebaseVerifyToken = require("../config/firebase.js"); // FireBase Configuration
let serviceNotification = require("../Services/ServiceNotification"); // Service to send Notifications
const log = require("../config/Logger"); // Display Configuration

// Controller of service panne Declaration

//add a panne
const addPanne = async (request, response) => {
  await firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await ServiceGestionPannes.addPanne(request, response);
      if (response.statusCode == 200) {
        // if panne added correctly
        if (process.env.NODE_ENV === "production") {
          // send a notification to AM
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

// get all pannes
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

// get a panne by id
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

// Export all Controller Panne functions
module.exports = {
  addPanne,
  getPannes,
  getPanneById,
};
