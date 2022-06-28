const firebase = require("../config/firebase");
const log = require("../config/Logger");

// Service notification functions

//send notification
const sendNotification = async (title, body, request, response) => {
  let email = request.params.email;
  if (email == undefined) {
    email = request.body.email;
  }
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
            console.log(error);
            log.loggerConsole.error(error);
            log.loggerFile.error(error);
          });
      }
    })
    .catch((error) => {
      console.log(error);
      log.loggerFile.error(error);
    });
};
 
// Export functions
module.exports = {
  sendNotification,
};
