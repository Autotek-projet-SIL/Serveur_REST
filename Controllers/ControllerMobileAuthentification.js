const serviceMobileAuthentification = require('../Services/ServiceMobileAuthentification.js')
const firebaseVerifyToken = require("../config/firebase.js")

// Inscription d'un locataire
const inscriptionLocataire = async (request, response) => {
    firebaseVerifyToken.verifyToken(request)
        .then(async(res) => {
            await serviceMobileAuthentification.inscriptionLocataire(request, response)
            response.status(200).send("Inscription de l'utilisateur effectuée avec succés")
        })
        .catch((err) => {
            response.status(403).send("Requete rejetée")
        });
}

// Connexion d'un locataire
const connexionLocataire = async (request, response) => {
    firebaseVerifyToken.verifyToken(request)
        .then(async (res) => {
            await serviceMobileAuthentification.connexionLocataire(request, response)
        })
        .catch((err) => {
            response.status(403).send("Requete rejetée")
        });
}

//Exporter les fonctions  
module.exports =
{
    inscriptionLocataire,
    connexionLocataire
}