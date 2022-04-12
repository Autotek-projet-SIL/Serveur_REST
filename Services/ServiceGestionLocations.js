// Declaration de variables
const log = require("../config/Logger");
const modelLouer = require("../Models/ModelLouer");
const modelTrajet = require("../Models/ModelTrajet");



const endLocation  =async (request, response) => {
  try {
    await modelLouer.endLocation(request, response);
   
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};



  const getLocationsEnCours  =async (request, response) => {
    try {
      await modelLouer.getLocationsEnCours(request, response);
     
    } catch (error) {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(500);
    }
  };


  const getLocationsTermines  =async (request, response) => {
    try {
      await modelLouer.getLocationsTermines(request, response);
     
    } catch (error) {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(500);
    }
  };
  //Exporter les fonctions du service d'authentification web
module.exports = {
   
    getLocationsEnCours,
    getLocationsTermines ,
    endLocation
}