const ServiceMailing = require("../Services/ServiceMailing");
const firebaseVerifyToken = require("../config/firebase.js");
const log = require("../config/Logger");

const getFactureDetailByID = async (request, response) => {
    firebaseVerifyToken
      .verifyToken(request)
      .then(async (res) => {
        await ServiceMailing.getFactureDetailByID(request, response);
      })
      .catch((error) => {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.sendStatus(403);
      });
  };

//Exporter les fonctions du controlleur flotte
module.exports = {getFactureDetailByID}