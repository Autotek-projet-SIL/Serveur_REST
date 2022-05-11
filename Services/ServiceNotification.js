const firebase = require("../config/firebase");
const log = require("../config/Logger");

// Fonction du service de notifications*
const sendNotification = async (title, body, request, response) => {
  const email = request.params.email;
  let uid;
  await firebase.auth
    .getUserByEmail(email)
    .then(async (userRecord) => {
      uid = userRecord.toJSON()["uid"];
      const user = await firebase.db.collection("DeviceToken").doc(uid).get();
      if (user.exists) {
        let registrationToken = await user.data()["device_token"];
        registrationToken = registrationToken.replace(/\s/g, "");
        var payload = {
          notification: {
            title: title,
            body: body,
          },
        };
        var options = {
          priority: "high",
          timeToLive: 60 * 60 * 24,
        };
        await firebase.messaging
          .sendToDevice(registrationToken, payload, options)
          .then(function (response) {
            console.log("Successfully sent message:", response);
          })
          .catch(function (error) {
            log.loggerConsole.error(error);
            log.loggerFile.error(error);
          });
      }
    })
    .catch((error) => {
      log.loggerFile.error(error);
    });
};

// Exporter les fonctions du service de notifications
module.exports = {
  sendNotification,
};
