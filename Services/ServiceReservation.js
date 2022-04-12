// Declaration de variables
const log = require("../config/Logger");
const modelLouer = require("../Models/ModelLouer");
const modelTrajet = require("../Models/ModelTrajet");

// Fonctions du service reservation
const ajouterReservation = async (request, response) => {
    try {
      await modelLouer.addLocation(request, response);
      await modelTrajet.addTrajet(request, response);
    } catch (error) {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(500);
    }
  };


  //Exporter les fonctions du service d'authentification web
module.exports = {
    ajouterReservation 
}