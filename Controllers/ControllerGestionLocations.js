// Declaration de variables
const serviceReservation = require("../Services/ServiceGestionLocations.js");
const firebaseVerifyToken = require("../config/firebase.js");
const log = require("../config/Logger");

// Fonctions du controlleur de gestion de locations

//terminer une location
const endLocation = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await serviceReservation.endLocation(
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


//Recuperer la liste des locations en cours
const getLocationsEnCours = async (request, response) => {
    firebaseVerifyToken
      .verifyToken(request)
      .then(async (res) => {
        await serviceReservation.getLocationsEnCours(
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
  

//récupérer la liste des locations en cours d'un locataire 
  const getLocationsLocataire = async (request, response) => {
    firebaseVerifyToken
      .verifyToken(request)
      .then(async (res) => {
        await serviceReservation.getLocationsLocataire(
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

  
//Recuperer la liste des locations termines
  const getLocationsTermines = async (request, response) => {
    firebaseVerifyToken
      .verifyToken(request)
      .then(async (res) => {
        await serviceReservation.getLocationsTermines(
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


  //ajouter une location
  const addLocation = async (request, response) => {
    firebaseVerifyToken
      .verifyToken(request)
      .then(async (res) => {
        await serviceReservation.addLocation(
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


  const getLocationById = async (request, response) => {
    firebaseVerifyToken
      .verifyToken(request)
      .then(async (res) => {
        await serviceReservation.getLocationById(
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
  getLocationsEnCours,
  getLocationsTermines,
  endLocation,
  addLocation,
  getLocationById,
  getLocationsLocataire
};
