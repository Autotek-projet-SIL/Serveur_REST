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

const getVehiclesByAmID = async (request, response) => {
  try {
    await ModelVehicle.getVehiclesByAmID(request, response);
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

  const getVehiclesTypes = async (request, response) => {
    try {
      await ModelVehicle.getVehiclesTypes(request, response);
    } catch (error) {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(500);
    }
  };


  const addVehicle = async (request, response) => {
    try {
      await ModelVehicle.addVehicle(request, response);
    } catch (error) {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(500);
    }
  };

  const addVehicleType = async (request, response) => {
    try {
      await ModelVehicle.addVehicleType(request, response);
    } catch (error) {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(500);
    }
  };

  const updateVehicle = async (request, response) => {
    try {
      await ModelVehicle.updateVehicle(request, response);
    } catch (error) {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(500);
    }
  };

  const updateVehicleType = async (request, response) => {
    try {
      await ModelVehicle.updateVehicleType(request, response);
    } catch (error) {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(500);
    }
  };

  const deleteVehicule = async (request, response) => {
    try {
      await ModelVehicle.deleteVehicule(request, response);
    } catch (error) {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(500);
    }
  };

  const deleteVehiculeType = async (request, response) => {
    try {
      await ModelVehicle.deleteVehiculeType(request, response);
    } catch (error) {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(500);
    }
  };

//Exporter les fonctions du service flotte
module.exports = {
    getVehicles,
    getVehiclesByAmID,
    getVehicleDetail,
    getVehiclesTypes,
    addVehicle,
    addVehicleType,
    updateVehicle,
    updateVehicleType,
    deleteVehicule,
    deleteVehiculeType
  };
  