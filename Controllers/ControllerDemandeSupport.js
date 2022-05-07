// Declaration de variables
const serviceDemandeSupport = require("../Services/ServiceDemandeSupport");
const firebaseVerifyToken = require("../config/firebase.js");
const log = require("../config/Logger");

// Fonctions du controlleur de gestion des demandes de support

//Recuperer la liste de toutes les demandes de support
const getDemandeSupport = async (request, response) => {
    firebaseVerifyToken
      .verifyToken(request)
      .then(async (res) => {
        await serviceDemandeSupport.getDemandeSupport( request, response );
      })
      .catch((error) => {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.sendStatus(403);
      });
  };

//récupérer un demandes de support par id
const getDemandeSupportById = async (request, response) => {
    firebaseVerifyToken
      .verifyToken(request)
      .then(async (res) => {
        await serviceDemandeSupport.getDemandeSupportById( request, response);
      })
      .catch((error) => {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.sendStatus(403);
      });
  };

//récupérer la liste des demandes de support d'un locataire 
const getDemandeSupportLocataire = async (request, response) => {
    firebaseVerifyToken
      .verifyToken(request)
      .then(async (res) => {
        await serviceDemandeSupport.getDemandeSupportLocataire( request, response);
      })
      .catch((error) => {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.sendStatus(403);
      });
  };

//Ajouter un demande de support
const addDemandeSupport = async (request, response) => {
  firebaseVerifyToken
      .verifyToken(request)
      .then(async (res) => {
        await serviceDemandeSupport.addDemandeSupport( request, response );
      })
      .catch((error) => {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.sendStatus(403);
      });
  };

//Mettre a jour le champs reponse d'un demande de support
const responseDemandeSupport = async (request, response) => {
    firebaseVerifyToken
      .verifyToken(request)
      .then(async (res) => {
        await serviceDemandeSupport.responseDemandeSupport( request, response);
      })
      .catch((error) => {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.sendStatus(403);
      });
  };
  
  module.exports = {
    getDemandeSupport,
    getDemandeSupportById,
    getDemandeSupportLocataire,
    addDemandeSupport,
    responseDemandeSupport,
  };