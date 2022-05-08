const ServiceFlotte = require("../Services/ServiceFlotte");
const firebaseVerifyToken = require("../config/firebase.js");
const log = require("../config/Logger");

// Fonctions du controlleur flotte
const getVehicles = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await ServiceFlotte.getVehicles(request, response);
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

const getVehiclesByAmID = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await ServiceFlotte.getVehiclesByAmID(request, response);
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

const getVehicleDetail = async (request, response) => {
    firebaseVerifyToken
      .verifyToken(request)
      .then(async (res) => {
        await ServiceFlotte.getVehicleDetail(request, response,result);
      })
      .catch((error) => {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.sendStatus(403);
      });
  };

  const getVehiclesTypes = async (request, response) => {
    firebaseVerifyToken
      .verifyToken(request)
      .then(async (res) => {
        await ServiceFlotte.getVehiclesTypes(request, response);
      })
      .catch((error) => {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.sendStatus(403);
      });
  };
  const getVehiclesMarques = async (request, response) => {
    firebaseVerifyToken
      .verifyToken(request)
      .then(async (res) => {
        await ServiceFlotte.getVehiclesMarques(request, response);
      })
      .catch((error) => {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.sendStatus(403);
      });
  };
  const getVehiclesModelsByMarque = async (request, response) => {
    firebaseVerifyToken
      .verifyToken(request)
      .then(async (res) => {
        await ServiceFlotte.getVehiclesModelsByMarque(request, response);
      })
      .catch((error) => {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.sendStatus(403);
      });
  };

  const addVehicle = async (request, response) => {
    firebaseVerifyToken
      .verifyToken(request)
      .then(async (res) => {
        await ServiceFlotte.addVehicle(request, response);
      })
      .catch((error) => {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.sendStatus(403);
      });
  };

const addVehicleType = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await ServiceFlotte.addVehicleType(request, response);
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

  const updateVehicle = async (request, response) => {
    firebaseVerifyToken
      .verifyToken(request)
      .then(async (res) => {
        await ServiceFlotte.updateVehicle(request, response);
      })
      .catch((error) => {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.sendStatus(403);
      });
  };

  const updateVehicleAvaible = async (request, response) => {
    firebaseVerifyToken
      .verifyToken(request)
      .then(async (res) => {
        await firebaseVerifyToken.updateVehiculeAvaible(request,response)
        await response.sendStatus(200);
      })
      .catch((error) => {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.sendStatus(403);
      });
  };
  const updateVehicleAM = async (request, response) => {
    firebaseVerifyToken
      .verifyToken(request)
      .then(async (res) => {
        await ServiceFlotte.updateVehicleAM(request, response);
      })
      .catch((error) => {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.sendStatus(403);
      });
  };
  const updateVehicleImage = async (request, response) => {
    firebaseVerifyToken
      .verifyToken(request)
      .then(async (res) => {
        await ServiceFlotte.updateVehicleImage(request, response);
      })
      .catch((error) => {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.sendStatus(403);
      });
  };
  const updateVehicleType = async (request, response) => {
    firebaseVerifyToken
      .verifyToken(request)
      .then(async (res) => {
        await ServiceFlotte.updateVehicleType(request, response);
      })
      .catch((error) => {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.sendStatus(403);
      });
  };

  const deleteVehicule = async (request, response) => {
    firebaseVerifyToken
      .verifyToken(request)
      .then(async (res) => {
        await ServiceFlotte.deleteVehicule(request, response);
      })
      .catch((error) => {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.sendStatus(403);
      });
  };

const getMarques = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await ServiceFlotte.getMarques(request, response);
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

const getModelsByIdMarque = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await ServiceFlotte.getModelsByIdMarque(request, response);
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};
const deleteVehiculeType = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await ServiceFlotte.deleteVehiculeType(request, response);
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

//Exporter les fonctions du controlleur flotte
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
    updateVehicleAvaible,
    updateVehicleImage,
    updateVehicleAM,
    updateVehicleType,
    deleteVehicule,
    deleteVehiculeType,
    getMarques,
    getModelsByIdMarque
};
