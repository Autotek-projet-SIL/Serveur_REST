const ServiceMailing = require("../Services/ServiceMailing");
const firebaseVerifyToken = require("../config/firebase.js");
const log = require("../config/Logger");

// Mailing controller functions
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

//Export mailing controller functions
module.exports = { getFactureDetailByID };
