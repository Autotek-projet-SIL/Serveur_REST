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
  /* return new Promise((resolve, reject) => {
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
  });*/
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
        disponible: request.body.disponible,
        locataire_uid: "",
        vitesse: 0.0,
        deverrouiller: false,
        etat: "en attente",
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

// Mettre a jour la disponibilte d'un véhicule dans firestore
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

// Exporter les fonctions concernat firebase
module.exports = {
  verifyToken,
  addVehicle,
  updateVehiculeAvaible,
  deleteVehicule,
  auth,
  db,
  messaging,
};
