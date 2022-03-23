/*// Initialize Firebase
var admin = require("firebase-admin");

var serviceAccount = require("./autotek-8c725-firebase-adminsdk-7tu4s-24ed0288bc.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});




const uid = "Iq00u5CdEAcJiYSpd7u8M8AnT423"

admin.auth().createCustomToken(uid).then((customToken) => {
    console.log(customToken);
})
.catch((error) => {
    console.log('Erreur: ',error)
})*/


/*// Import the functions you need from the SDKs you need
const { initializeApp }= require("firebase/app")
const { getAuth } =require("firebase/auth")

const firebaseConfig = {
  apiKey: "AIzaSyCPt_6W95_a63qCoapur-C9mzz9uJGG1uY",
  authDomain: "autotek-8c725.firebaseapp.com",
  projectId: "autotek-8c725",
  storageBucket: "autotek-8c725.appspot.com",
  messagingSenderId: "331835875863",
  appId: "1:331835875863:web:196d016fc1488af40c7252",
  measurementId: "G-67MEGP9H81",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

//Verifier un token 
const verifyToken = async (request) => {
  let token = request.body.token
  auth.verifyIdToken(token).then((decodedToken) => {
    const uid = decodedToken.uid;
  })
    .catch((error) => {
      // Handle error
    });
}
  module.exports =
  {
    verifyToken
  }*/



// Import the functions you need from the SDKs you need
const { initializeApp }= require("firebase/app")
const { getAuth , signInWithCustomToken , signOut} =require("firebase/auth")
var admin = require("firebase-admin");
var serviceAccount = require("./autotek-8c725-firebase-adminsdk-7tu4s-24ed0288bc.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});




const firebaseConfig = {
  apiKey: "AIzaSyCPt_6W95_a63qCoapur-C9mzz9uJGG1uY",
  authDomain: "autotek-8c725.firebaseapp.com",
  projectId: "autotek-8c725",
  storageBucket: "autotek-8c725.appspot.com",
  messagingSenderId: "331835875863",
  appId: "1:331835875863:web:196d016fc1488af40c7252",
  measurementId: "G-67MEGP9H81",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const express = require('express')
const appEx = express()
const port = 3000
const pool = require("./config/bd");
appEx.use(express.json())


  

const uid = "Iq00u5CdEAcJiYSpd7u8M8AnT423"

admin.auth().createCustomToken(uid).then((customToken)  => {
     customToken = "jhkh"
    signInWithCustomToken(auth,customToken)
    .then((userCredential)  => {
    // Signed in

            const user = userCredential.user;
            console.log(user.uid +" " + user.emailVerified +" " + user.email);
            appEx.get("/locataire/:email",async (req,res) =>{
              let email = req.params.email
              try {
                const todo = await pool.query('SELECT * FROM locataire WHERE email=$1', [email]);
                res.json(todo.rows[0]);
              } catch (error) {
                console.log("bbbb");
              }
            })


            
    // ...
  })
  .catch((error) => {
      res.status(403)    // ...
  });
    
})
.catch((error) => {
    console.log('Erreur: ',error)
})

  


    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });


    appEx.listen(port, () => {
      console.log("Server init")
    })


