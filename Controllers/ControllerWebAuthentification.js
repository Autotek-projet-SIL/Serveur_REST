const serviceWebAuthentification = require('../Services/ServiceWebAuthentification.js')
const firebaseVerifyToken = require("../config/firebase.js")

const validerDemandeInscription = async (request, response) => {
    firebaseVerifyToken.verifyToken(request)
        .then(async (res) => {
            await serviceWebAuthentification.validerDemandeInscription(request, response)
            firebaseVerifyToken.sendNotification("Demande d'inscription validée","Votre demande d'inscription a été validée",request,response)
            response.status(200).send("Demande d'inscription validée avec succés")
        })
        .catch((err) => {
            response.status(403).send("Forbidden")
        });
}

const refuserDemandeInscription = async (request, response) => {
    firebaseVerifyToken.verifyToken(request)
        .then(async (res) => {
            await serviceWebAuthentification.refuserDemandeInscription(request, response)
            firebaseVerifyToken.sendNotification("Demande d'inscription refusée","Votre demande d'inscription a été refusée",request,response)
            response.status(200).send("Demande d'inscription refusée")
        })
        .catch((err) => {
            response.status(403).send("Forbidden")
        });
}

const getDemandesInscription = async (request, response) => {
    firebaseVerifyToken.verifyToken(request)
        .then(async (res) => {
            await serviceWebAuthentification.getDemandesInscription(request, response)
        })
        .catch((err) => {
            response.status(403).send("Forbidden")
        });
}

const getDecideurByEmail = async (request, response) => {
    firebaseVerifyToken.verifyToken(request)
        .then(async (res) => {
            await serviceWebAuthentification.getDecideurByEmail(request, response)
        })
        .catch((err) => {
            response.status(403).send("Forbidden")
        });
}
const getATCByEmail = async (request, response) => {
    firebaseVerifyToken.verifyToken(request)
        .then(async (res) => {
            await serviceWebAuthentification.getATCByEmail(request, response)
        })
        .catch((err) => {
            response.status(403).send("Forbidden")
        });
}
//Exporter les fonctions  
module.exports =
{
    validerDemandeInscription,
    refuserDemandeInscription,
    getDemandesInscription,
    getDecideurByEmail,
    getATCByEmail
}