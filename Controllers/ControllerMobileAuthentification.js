const serviceMobileAuthentification = require('../Services/ServiceMobileAuthentification.js')
const firebaseVerifyToken = require("../config/firebase.js")

const inscriptionLocataire = async (request, response) => {
    try {
        await firebaseVerifyToken.verifyToken(request)
        await serviceMobileAuthentification.inscriptionLocataire(request, response)
    } catch (e) {
        response.status(403)
    }
}
const connexionLocataire = async (request, response) => {
    try {
        console.log("hello world")
        await firebaseVerifyToken.verifyToken(request)
        console.log("hello world")
        await serviceMobileAuthentification.connexionLocataire(request, response)
    } catch (e) {
        response.status(403)
    }
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