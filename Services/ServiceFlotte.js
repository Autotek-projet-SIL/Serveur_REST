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

const getVehicleDetail = async (request, response,result) => {
    try {
      await ModelVehicle.getVehicleByChassisNum(request, response,result);
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

  const getVehiclesMarques = async (request, response) => {
    try {
      await ModelVehicle.getVehiclesMarques(request, response);
    } catch (error) {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(500);
    }
  };
  const getVehiclesModelsByMarque = async (request, response) => {
    try {
      await ModelVehicle.getVehiclesModelsByMarque(request, response);
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


  const updateVehicleAvaible = async (request, response) => {
    try {
      await ModelVehicle.updateVehicleAvaible(request, response);
    } catch (error) {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(500);
    }
  };

  const updateVehicleAM = async (request, response) => {
    try {
      await ModelVehicle.updateVehicleAM(request, response);
    } catch (error) {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(500);
    }
  };

  const updateVehicleImage = async (request, response) => {
    try {
      await ModelVehicle.updateVehicleImage(request, response);
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

const getMarques = async (request, response) => {
  try {
    await ModelVehicle.getMarques(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

const getModelsByIdMarque= async (request, response) => {
  try {
    await ModelVehicle.getModelsByIdMarque(request, response);
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
    getVehiclesMarques,
    getVehiclesModelsByMarque,
    addVehicle,
    addVehicleType,
    updateVehicle,
    updateVehicleImage,
    updateVehicleAvaible,
    updateVehicleAM,
    updateVehicleType,
    deleteVehicule,
    deleteVehiculeType,
    getMarques,
    getModelsByIdMarque
  };
  
