// Importer les fonctions de firebase pour l'authentification
const { initializeApp } = require("firebase/app")
const { getAuth } = require("firebase/auth")
var admin = require("firebase-admin");
var serviceAccount = require("./autotek-8c725-firebase-adminsdk-7tu4s-24ed0288bc.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
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
const db = admin.firestore()
const verifyToken = async (request) => {
  if (process.env.NODE_ENV === "production") {
    return new Promise((resolve, reject) => {
      let token
      let uid
      if (request.method === "GET") {
        token = request.headers.token
        uid = request.headers.id
      } else {
        token = request.body.token
        uid = request.body.id
      }
      admin.auth().verifyIdToken(token).then((decodedToken) => {
        const uid_firebase = decodedToken.uid;
        if (uid_firebase === uid) {
          resolve(10)
        } else {
          throw new Error('Requete refusée')
        }
      }).catch((error) => {
        reject(new Error('Requete refusée'))
      });
    })
  }
}

//Envoyer une notification pour un locataire
const sendNotification = async (title,body,request,response) => {
  const user = await db.collection('DeviceToken').doc(request.body.id).get();
  if (user.exists) {
    const registrationToken = user.data()["device_token"];
    const message = {
      token: registrationToken,
      notification: {
        title: title,
        body: body,
    }
    }
    getMessaging().send(message)
      .then((response) => {
        console.log('Successfully sent message:', response);
      })
      .catch((error) => {
        console.log('Error sending message:', error);
      });
  }
}

// Exporter la fonction de verification du token
module.exports =
{
  verifyToken,
  sendNotification
}
