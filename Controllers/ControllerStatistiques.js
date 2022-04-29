// Declaration de variables
const serviceStatistiques = require("../Services/ServiceStatistiques.js");
const firebaseVerifyToken = require("../config/firebase.js");
const log = require("../config/Logger");

// Fonctions du controlleur de statistiques

  //Recuperer la liste des locations acceptes pour le servive statistiques
  const  getLocationsAcceptes = async (request, response) => {
    firebaseVerifyToken
      .verifyToken(request)
      .then(async (res) => {
        await serviceStatistiques.getLocationsAcceptes(
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

 //Recuperer la liste des locations rejetes pour le servive statistiques
 const getLocationsRejetes = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await serviceStatistiques.getLocationsRejetes(
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
 
//récupérer la liste des locations pour le service statistiques
const getLocationStatistics = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await serviceStatistiques.getLocationStatistics(
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

//récupérer la liste des demandes d'inscriptions pour le service statistiques
const getDemandeInscriptionStatistics = async (request, response) => {
    firebaseVerifyToken
      .verifyToken(request)
      .then(async (res) => {
        await serviceStatistiques.getDemandeInscriptionStatistics(
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

  const getFactureStatistics = async (request, response) => {
    firebaseVerifyToken
      .verifyToken(request)
      .then(async (res) => {
        await serviceStatistiques.getFactureStatistics(
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
    getLocationStatistics,
    getDemandeInscriptionStatistics,
    getFactureStatistics ,
    getLocationsAcceptes , 
    getLocationsRejetes
 
};
