// Variables Declaration 
const serviceDemandeSupport = require("../Services/ServiceDemandeSupport");  // Service of this controller : DemandeSupport
const firebaseVerifyToken = require("../config/firebase.js");                // Firebase configuration data and methods
const serviceNotification = require("../Services/ServiceNotification");      // Service to send firebase notifications
const log = require("../config/Logger");                                     // display configuration data and methods

// Functions of demandeSupport management Controller

//recuperate all support requests
const getDemandeSupport = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)                                                     
    .then(async (res) => {                                                    // if token correct
      await serviceDemandeSupport.getDemandeSupport(request, response);    
    })
    .catch((error) => {                                                      // if wrong token 
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

//recuperate a support request by id
const getDemandeSupportById = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {                                                  // if token correct
      await serviceDemandeSupport.getDemandeSupportById(request, response);
    })
    .catch((error) => {                                                     // if wrong token 
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

//recuperate all support requests for a location
const getDemandeSupportLouer = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {                                                 // if token correct
      await serviceDemandeSupport.getDemandeSupportLouer(request, response);
    })
    .catch((error) => {                                                    // if wrong token 
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

//add a support request
const addDemandeSupport = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {                                                // if token correct
      await serviceDemandeSupport.addDemandeSupport(request, response);
    })
    .catch((error) => {                                                    // if wrong token 
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

//Response to a support request
const responseDemandeSupport = async (request, response) => {
  firebaseVerifyToken
    .verifyToken(request)
    .then(async (res) => {                                                 // if token correct
      await serviceDemandeSupport.responseDemandeSupport(request, response);    //Update the response field of a support request
      if (response.statusCode == 200) {                                   // if the response field of a support request is updated correctly
        if (process.env.NODE_ENV === "production") {
          // send a notification contains the response
          await serviceNotification.sendNotification(
            "Reponse de votre demande de support",
            request.body.response,
            request,
            response
          );
        }
        response.sendStatus(200);
      } else {                                                        // if the response field of a support request is not updated correctly
        response.sendStatus(500);
      }
    })
    .catch((error) => {                                                    // if wrong token
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(403);
    });
};

//exports methods
module.exports = {
  getDemandeSupport,
  getDemandeSupportById,
  getDemandeSupportLouer,
  addDemandeSupport,
  responseDemandeSupport,
};
