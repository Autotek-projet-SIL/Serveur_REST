// Declaration de variables
const log = require("../config/Logger");
//const serviceNotification = require("../Services/ServiceNotification");
const modelDemandeSupport = require("../Models/ModelDemandeSupport");

// Fonctions du service de gestion des demandes de support

//Recuperer la liste de toutes les demandes de support
const getDemandeSupport = async (request, response) => {
    try {
        await modelDemandeSupport.getDemandeSupport(request, response);
    } catch (error) {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.sendStatus(500);
    }
  };

//récupérer un demandes de support par id
const getDemandeSupportById = async (request, response) => {
    try {
        await modelDemandeSupport.getDemandeSupportById(request, response);
    } catch (error) {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.sendStatus(500);
    }
  };

//récupérer la liste des demandes de support d'un locataire 
const getDemandeSupportLocataire = async (request, response) => {
    try {
        await modelDemandeSupport.getDemandeSupportLocataire(request, response);
    } catch (error) {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.sendStatus(500);
    }
  };

//Ajouter un demande de support
const addDemandeSupport = async (request, response) => {
    try {
        await modelDemandeSupport.addDemandeSupport(request, response);
    } catch (error) {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.sendStatus(500);
    }
  };

//Mettre a jour le champs reponse d'un demande de support
const responseDemandeSupport = async (request, response) => {
    try {
        await modelDemandeSupport.responseDemandeSupport(request, response);
    } catch (error) {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.sendStatus(500);
    }
  };
  
  module.exports = {
    getDemandeSupport,
    getDemandeSupportById,
    getDemandeSupportLocataire,
    addDemandeSupport,
    responseDemandeSupport,
  };