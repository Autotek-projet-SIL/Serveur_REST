// Declaration of variables
const ServiceGestionComptes = require("../Services/ServiceGestionComptes");
const firebaseVerifyToken = require("../config/firebase.js");
const log = require("../config/Logger");

//Functions of the account management controller
const deleteLocataire = async (request, response) => {
  await firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await ServiceGestionComptes.deleteLocataire(request, response);
    })
    .catch((error) => {
      response.sendStatus(403);
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
    });
};

//delete atc
const deleteATC = async (request, response) => {
  await firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await ServiceGestionComptes.deleteATC(request, response);
    })
    .catch((error) => {
      response.sendStatus(403);
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
    });
};

//delete am
const deleteAM = async (request, response) => {
  await firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await ServiceGestionComptes.deleteAM(request, response);
    })
    .catch((error) => {
      response.sendStatus(403);
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
    });
};

//delete decideur
const deleteDecideur = async (request, response) => {
  await firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await ServiceGestionComptes.deleteDecideur(request, response);
    })
    .catch((error) => {
      response.sendStatus(403);
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
    });
};

//add locataire
const addLocataire = async (request, response) => {
  await firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await ServiceGestionComptes.addLocataire(request, response);
    })
    .catch((err) => {
      response.status(403).send("Forbidden");
    });
};

//add decideur
const addDecideur = async (request, response) => {
  await firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await ServiceGestionComptes.addDecideur(request, response);
    })
    .catch((error) => {
      response.sendStatus(403);
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
    });
};

//add atc
const addATC = async (request, response) => {
  await firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await ServiceGestionComptes.addATC(request, response);
    })
    .catch((error) => {
      response.sendStatus(403);
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
    });
};

//add am
const addAM = async (request, response) => {
  await firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await ServiceGestionComptes.addAM(request, response);
    })
    .catch((error) => {
      response.sendStatus(403);
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
    });
};

//Export Account Controller functions
module.exports = {
  deleteDecideur,
  deleteAM,
  deleteATC,
  deleteLocataire,
  addDecideur,
  addAM,
  addATC,
  addLocataire,
};
