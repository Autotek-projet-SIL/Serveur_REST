const serviceMobileAuthentification = require('../Services/ServiceMobileAuthentification.js')
const firebaseVerifyToken = require("../config/firebase.js")

// Inscription d'un locataire
const inscriptionLocataire = async (request, response) => {
    firebaseVerifyToken.verifyToken(request)
        .then(async (res) => {
            await serviceMobileAuthentification.inscriptionLocataire(request, response)
            response.status(200).send("Inscription successful")
        })
        .catch((err) => {
            console.log(err)
            response.status(403).send("Forbidden")
        });
}

// Connexion d'un locataire
const connexionLocataire = async (request, response) => {
    firebaseVerifyToken.verifyToken(request)
    .then(async (res) => {
        await serviceMobileAuthentification.connexionLocataire(request, response)
    })
    .catch((err) => {
        console.log(err)
        response.status(403).send("Forbidden")
    });
}

// Connexion d'un agence de maitenance
const connexionAM = async (request, response) => {
    firebaseVerifyToken.verifyToken(request)
    .then(async (res) => {
        await serviceMobileAuthentification.connexionAM(request, response)
    })
    .catch((err) => {
        console.log(err)
        response.status(403).send("Forbidden")
    });
}

//Exporter les fonctions  
module.exports =
{
    inscriptionLocataire,
    connexionLocataire,
    connexionAM
}