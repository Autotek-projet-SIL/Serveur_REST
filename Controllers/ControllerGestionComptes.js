// Declaration de variables
const ServiceGestionComptes = require("../Services/ServiceGestionComptes");
const firebaseVerifyToken = require("../config/firebase.js");
const log = require("../config/Logger");

// Fonctions du controlleur de gestion des comptes
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

//Exporter les fonctions du controlleur de gestion des comptes
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
