// Declaration of variables
const serviceGestionLocations = require("../Services/ServiceGestionLocations.js");
const serviceFlotte = require("../Services/ServiceFlotte");
const serviceFacture = require("../Services/ServiceGestionFactures");
const serviceMailing = require("../Services/ServiceMailing");
const firebaseVerifyToken = require("../config/firebase.js");
const log = require("../config/Logger");

// Rental management controller functions
const updateLocationHeureDebut = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await serviceGestionLocations.updateLocationHeureDebut(request, response);
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

//end location
const endLocation = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await serviceGestionLocations.endLocation(request, response);
      if (response.statusCode != 500) {
        await serviceFacture.addFacture(request, response);
        if (
          process.env.NODE_ENV === "production" &&
          response.statusCode != 500
        ) {
          await serviceFlotte.updateVehiculeAvaibleFB(request, response);
          if (response.statusCode != 500) {
            await serviceMailing.getFactureDetailByID(request, response);
          }
        }
      }
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

//update Location Tracking Location
const updateLocationSuiviLocation = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await serviceGestionLocations.updateLocationSuiviLocation(
        request,
        response
      );
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

//get all locations
const getAllLocations = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await serviceGestionLocations.getAllLocations(request, response);
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

// get  all regions
const getAllRegions = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await serviceGestionLocations.getAllRegions(request, response);
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

//get locations in progress
const getLocationsEnCours = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await serviceGestionLocations.getLocationsEnCours(request, response);
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

//get locations by locataire
const getLocationsLocataire = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await serviceGestionLocations.getLocationsLocataire(request, response);
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

//get ended locations
const getLocationsTermines = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await serviceGestionLocations.getLocationsTermines(request, response);
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

//add location
const addLocation = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await serviceGestionLocations.addLocation(request, response);
      if (
        process.env.NODE_ENV === "production" &&
        request.body.status_demande_location === "accepte" &&
        response.statusCode != 500
      ) {
        await serviceFlotte.updateVehiculeAvaibleFB(request, response);
      }
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

//get location by id
const getLocationById = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await serviceGestionLocations.getLocationById(request, response);
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

//get locations ended by id locataire
const getLocationsTerminesByIdLocataire = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await serviceGestionLocations.getLocationsTerminesByIdLocataire(
        request,
        response
      );
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

const getLocataireByNumeroChassis = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {
      await serviceGestionLocations.getLocataireByNumeroChassis(
        request,
        response
      );
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

// Export the functions of the rental management controller
module.exports = {
  getLocationsEnCours,
  getLocationsTermines,
  endLocation,
  addLocation,
  getLocationById,
  getLocationsLocataire,
  getAllLocations,
  updateLocationHeureDebut,
  getLocationsTerminesByIdLocataire,
  updateLocationSuiviLocation,
  getAllRegions,
  getLocataireByNumeroChassis,
};
