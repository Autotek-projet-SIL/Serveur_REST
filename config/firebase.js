// Declaration de variables
const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
let admin = require("firebase-admin");
let serviceAccount = require("./autotek-8c725-firebase-adminsdk-7tu4s-24ed0288bc.json");
const log = require("../config/Logger");
// Initisaliser l'admin SDK de FireBase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
// Initialiser Firebase
const db = admin.firestore();
const messaging = admin.messaging();
const auth = admin.auth();
// Fonction de verification des tokens de Firebase
const verifyToken = async (request) => {
  /*if (process.env.NODE_ENV === "production") {
    return new Promise((resolve, reject) => {
      let token;
      let uid;
      if (request.method === "GET") {
        token = request.headers.token;
        uid = request.headers.id;
      } else {
        token = request.body.token;
        uid = request.body.id;
      }
      admin
        .auth()
        .verifyIdToken(token)
        .then((decodedToken) => {
          const uid_firebase = decodedToken.uid;
          if (uid_firebase === uid) {
            resolve(10);
          } else {
            throw new Error("Requete refusée");
          }
        })
        .catch((error) => {
          log.loggerConsole.error(error);
          log.loggerFile.error(error);
          reject(new Error("Requete refusée"));
        });
    });
  }*/
};

// Fonction d'envois de notification avec cloud messaging
const sendNotification = async (title, body, request, response) => {
  const email = request.params.email;
  let uid;
  await auth
    .getUserByEmail(email)
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      uid = userRecord.toJSON()["uid"];
      console.log(uid);
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
    });
  const user = await db.collection("DeviceToken").doc(uid).get();
  if (user.exists) {
    let registrationToken = await user.data()["device_token"];
    registrationToken = registrationToken.replace(/\s/g, "");
    /*admin
      .messaging()
      .send({
        token: registrationToken,
        data: {
          hello: "world",
        },
        // Set Android priority to "high"
        android: {
          priority: "high",
        },
        // Add APNS (Apple) config
      })
      .then((response) => {
        console.log("Successfully sent message:", response);
      })
      .catch((error) => {
        console.log("Error sending message:", error);
      });*/

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
    await messaging
      .sendToDevice(registrationToken, payload, options)
      .then(function (response) {
        console.log("Successfully sent message:", response);
      })
      .catch(function (error) {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
      });
  }
};

module.exports = {
  verifyToken,
  sendNotification,
};
