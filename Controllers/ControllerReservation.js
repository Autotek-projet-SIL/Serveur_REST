// Declaration de variables
const serviceReservation = require("../Services/ServiceReservation.js");
const firebaseVerifyToken = require("../config/firebase.js");
const log = require("../config/Logger");

// Fonctions du controlleur de reservations

const ajouterReservation = async (request, response) => {
    firebaseVerifyToken
      .verifyToken(request)
      .then(async (res) => {
        await serviceReservation.ajouterReservation(
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
  

// Exporter les fonctions du controlleur Reservations
module.exports = {
    ajouterReservation
};
