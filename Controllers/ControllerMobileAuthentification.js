const serviceMobileAuthentification = require('../Services/ServiceMobileAuthentification.js')
const firebaseVerifyToken = require("../config/firebase.js")

const inscriptionLocataire = (request, response) => {
    firebaseVerifyToken.verifyToken(request, response)
    serviceMobileAuthentification.inscriptionLocataire(request, response)
}
const connexionLocataire = async (request, response) => {
    firebaseVerifyToken.verifyToken(request, response)
        .catch(console.error)
        .then(() => console.log('We do cleanup here'));
    await serviceMobileAuthentification.connexionLocataire(request, response)


}
const getPhotoIdentite = async (request, response) => {
    try {
        await firebaseVerifyToken.verifyToken(request)
        await serviceMobileAuthentification.getPhotoIdentite(request, response)
    } catch (e) {
        response.status(403)
    }
}
const getPhotoSelfie = async (request, response) => {
    try {
        await firebaseVerifyToken.verifyToken(request)
        await serviceMobileAuthentification.getPhotoSelfie(request, response)
    } catch (e) {
        response.status(403)
    }
}
//Exporter les fonctions  
module.exports =
{
    inscriptionLocataire,
    connexionLocataire,
    getPhotoIdentite,
    getPhotoSelfie
}