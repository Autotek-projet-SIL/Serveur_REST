// Initialize Firebase
var admin = require("firebase-admin");
const { initializeApp } = require('firebase-admin/app');
var serviceAccount = require("./autotek-8c725-firebase-adminsdk-7tu4s-24ed0288bc.json");
initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// Generer un token
const generateToken = async (uid) => {
    admin.auth().createCustomToken(uid).then((customToken) => {
        console.log(customToken)
        /*admin.auth().verifyIdToken(customToken).then(decodedIdToken => {
            console.log('ID Token correctly decoded', decodedIdToken);
            admin.auth().getUser(decodedIdToken.uid).then((userRecord) => {
             return resolve(userRecord);
            }).catch(error => {
             console.error('Error while getting Firebase User record:', error);
             return reject({code: 403, error: 'Unauthorized'});
            });
           }).catch(error => {
            console.error('Error while verifying Firebase ID token:', error);
            return reject({code: 403, error: 'Unauthorized'});
           });*/
    }).catch((error) => {
        console.log(error)
    }
    )
}

uid = "Iq00u5CdEAcJiYSpd7u8M8AnT423"
generateToken(uid)


