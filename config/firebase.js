// Declaration de variables
const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
let admin = require("firebase-admin");
let serviceAccount = require("./autotek-8c725-firebase-adminsdk-7tu4s-24ed0288bc.json");
let FCM = require("fcm-node");

// Adresse du serveur de cloud messaging
let serverKey =
  "AAAATUL1ohc:APA91bGtBYeGQzb7lXlGOfyXwv3YIOwhGNnQ88aGL3HeBexcHnZ9XJHUuwWKUFAyS7IZn4vTwbWeIGxZfH29Ta69zoesutvyHJVXUrzBKNrj3B5seMaWmOpaT0DvnOHkbJoQ9GA7ZtDd";
let fcm = new FCM(serverKey);

// Initisaliser l'admin SDK de FireBase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Informations de la configuration de l'application firebase
const firebaseConfig = {
  apiKey: "AIzaSyCPt_6W95_a63qCoapur-C9mzz9uJGG1uY",
  authDomain: "autotek-8c725.firebaseapp.com",
  projectId: "autotek-8c725",
  storageBucket: "autotek-8c725.appspot.com",
  messagingSenderId: "331835875863",
  appId: "1:331835875863:web:196d016fc1488af40c7252",
  measurementId: "G-67MEGP9H81",
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = admin.firestore();


// Fonction de verification des tokens de Firebase
const verifyToken = async (request) => {
  if (process.env.NODE_ENV === "production") {
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
          reject(new Error("Requete refusée"));
        });
    });
  }
};

// Fonction d'envois de notification avec cloud messaging
const sendNotification = async (title, body, request, response) => {
  const user = await db.collection("DeviceToken").doc(request.body.id).get();
  if (user.exists) {
    const registrationToken = user.data()["device_token"];
    console.log(registrationToken);
    await admin
      .messaging()
      .sendMulticast({
        tokens: [registrationToken],
        notification: {
          title: "Weather Warning!",
          body: "A new weather warning has been issued for your location.",
          imageUrl: "https://my-cdn.com/extreme-weather.png",
        },
      })
      .then((response) => {
        console.log("Successfully sent message:", response);
      })
      .catch((error) => {
        console.log("Error sending message:", error);
      });
  }
};

/*************    Fonctions CRUD sur Firestore pour véhicule    *******************/
// Fonctipn d'ajout d'un véhicule sur FireStore
const addVehicle = async(request,response)=>{
  let data = {
    location: new admin.firestore.GeoPoint(0,0)
  };
  await db.collection('CarLocation').doc(request.body.num_chassis).set({
    batterie:100,
    temperature:0,
    kilometrage:0,
    destination:data.location,
    latitude:0.0,
    longitude:0.0,
    marque:request.body.marque,
    modele:request.body.modele
  })
  .then((response) => {
    console.log("Vehicle added successfully:",response );
  })
  .catch((error) => {
    console.log("Error sending message:", error);
  });
};

//Fonction pour récupérer les données d'un véhicule sur Firestore
const getVehicule = async(request,response,result)=>{
  const vehicule = await db.collection('CarLocation').doc(request.params.num_chassis).get();
  if(vehicule.exists){
    result.batterie = vehicule.data().batterie
    result.destination = vehicule.data().destination
    result.kilometrage = vehicule.data().kilometrage 
    result.latitude = vehicule.data().latitude
    result.longitude = vehicule.data().longitude
    result.marque = vehicule.data().marque
    result.modele = vehicule.data().modele
    result.temperature = vehicule.data().temperature 
  }
}

//Fonction de modification d'un véhicule sur FireStore
const updateVehicule = async(request,response)=>{
  const liam = await db.collection('CarLocation').doc(request.params.num).update({
   marque:request.body.marque,
   modele:request.body.modele
  })
  .then((response) => {
    console.log("Vehicle updated successfully:",response );
  })
  .catch((error) => {
    console.log("Error sending message:", error);
  });
}

//Fonction de suppression d'un véhicule sur FireStore
const deleteVehicule = async(request,response)=>{
  await db.collection('CarLocation').doc(request.params.num).delete()
  .then((response) => {
    console.log("Vehicle deleted successfully:",response );
  })
  .catch((error) => {
    console.log("Error sending message:", error);
  });
}

module.exports = {
  verifyToken,
  sendNotification,
  addVehicle,
  getVehicule,
  updateVehicule,
  deleteVehicule
};
