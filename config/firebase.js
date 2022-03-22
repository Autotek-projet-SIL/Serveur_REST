// Import the functions you need from the SDKs you need
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
  }

