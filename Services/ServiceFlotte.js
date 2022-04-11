const ModelVehicle = require("../Models/ModelVehicule");
const log = require("../config/Logger");

// Fonctions du service flotte

const getVehicles = async (request, response) => {
  try {
    await ModelVehicle.getVehicles(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

const getVehicleDetail = async (request, response) => {
    try {
      await ModelVehicle.getVehicleByChassisNum(request, response);
    } catch (error) {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(500);
    }
  };

//Exporter les fonctions du service flotte
module.exports = {
    getVehicles,
    getVehicleDetail
  };
  