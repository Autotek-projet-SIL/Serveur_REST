// Declaration de variables
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
  /*return new Promise((resolve, reject) => {
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
  });*/
};

// Fonction d'envois de notification avec cloud messaging
const sendNotification = async (title, body, request, response) => {
  const email = request.params.email;
  let uid;
  await auth
    .getUserByEmail(email)
    .then(async (userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      uid = userRecord.toJSON()["uid"];
      const user = await db.collection("DeviceToken").doc(uid).get();
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
    })
    .catch((error) => {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
    });
};

/*************    Fonctions CRUD sur Firestore pour véhicule    *******************/
// Fonctipn d'ajout d'un véhicule sur FireStore
const addVehicle = async (request, response) => {
  const vehicule = await db
    .collection("CarLocation")
    .doc(request.body.num_chassis)
    .get();
  if (vehicule.exists) {
    log.loggerConsole.error("Le vehicule existe deja dans firebase");
    log.loggerFile.error("Le vehicule existe deja dans firebase");
  } else {
    let data = {
      location: new admin.firestore.GeoPoint(0, 0),
    };
    await db
      .collection("CarLocation")
      .doc(request.body.num_chassis)
      .set({
        batterie: 100,
        temperature: 0,
        kilometrage: 0,
        destination: data.location,
        latitude: 0.0,
        longitude: 0.0,
        marque: request.body.marque,
        modele: request.body.modele,
        disponible: request.body.disponible,
      })
      .then((response) => {
        console.log("Vehicle added successfully:", response);
      })
      .catch((error) => {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
      });
  }
};

// Mettre a jour la disponibilte d'un véhicule
const updateVehiculeAvaible = async (request, response) => {
  const vehicule = await db
    .collection("CarLocation")
    .doc(request.body.numero_chassis)
    .get();
  if (vehicule.exists) {
    let temp = !vehicule.data().disponible;
    const liam = await db
      .collection("CarLocation")
      .doc(request.body.numero_chassis)
      .update({
        disponible: temp,
      })
      .then((response) => {
        console.log("Vehicle updated successfully");
      })
      .catch((error) => {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
      });
  }
};

//Fonction de suppression d'un véhicule sur FireStore
const deleteVehicule = async (request, response) => {
  await db
    .collection("CarLocation")
    .doc(request.params.num)
    .delete()
    .then((response) => {
      console.log("Vehicle deleted successfully:", response);
    })
    .catch((error) => {
      log.loggerConsole.error("Le vehicule n'exsite pas dans firebase");
      log.loggerFile.error("Le vehicule n'exsite pas dans firebase");
    });
};

module.exports = {
  verifyToken,
  sendNotification,
  addVehicle,
  updateVehiculeAvaible,
  deleteVehicule,
  auth,
  db,
  messaging,
};
