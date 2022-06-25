// Variables Declarations
let admin = require("firebase-admin");
let serviceAccount = require("./autotek-8c725-firebase-adminsdk-7tu4s-24ed0288bc.json");
const log = require("../config/Logger");

// FireBase admin SDK initialisation
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://autotek-8c725.appspot.com/",
});

// Firebase initialisation
const db = admin.firestore();
const messaging = admin.messaging();
const auth = admin.auth();

// Firebase tokens verification function
const verifyToken = async (request) => {
  if (process.env.NODE_ENV === "production") {
    return new Promise((resolve, reject) => {
      let token;
      let uid;
      if (request.method === "GET") {
        token = request.headers.token;
        uid = request.headers.id_sender;
      } else {
        token = request.body.token;
        uid = request.body.id_sender;
      }
      admin
        .auth()
        .verifyIdToken(String(token))
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
  }
};

// Export Firebase functions
module.exports = {
  verifyToken,
  auth,
  db,
  messaging,
  admin,
};
