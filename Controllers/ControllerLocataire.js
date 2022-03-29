const serviceWebAuthentification = require('../Services/ServiceLocataire')
const firebaseVerifyToken = require("../config/firebase.js")

const getLocataireByEmail = async (request, response) => {
    
    firebaseVerifyToken.verifyToken(request)
        .then(async (res) => {
            await serviceWebAuthentification.getLocataireByEmail(request, response)
        })
        .catch((err) => {
            response.status(403).send("Forbidden")
        });
}

const getLocataireById = async (request, response) => {
    firebaseVerifyToken.verifyToken(request)
        .then(async (res) => {
            await serviceWebAuthentification.getLocataireById(request, response)
        })
        .catch((err) => {
            response.status(403).send("Forbidden")
        });
}

const getLocataires = async (request, response) => {
    firebaseVerifyToken.verifyToken(request)
        .then(async (res) => {
            await serviceWebAuthentification.getLocataires(request, response)
        })
        .catch((err) => {
            response.status(403).send("Forbidden")
        });
}
// Modification d'un locataire
const updateLocataire = async (request, response) => {
    firebaseVerifyToken.verifyToken(request)
        .then(async (res) => {
            await serviceWebAuthentification.updateLocataire(request, response)
            response.status(200).json("Modification successfull")
        })
        .catch((err) => {
            response.status(403).send("Forbidden")
        });
}

const deleteLocataire = async (request, response) => {
   await firebaseVerifyToken.verifyToken(request)
        .then(async (res) => {
            await serviceWebAuthentification.deleteLocataire(request, response)
            response.status(200).json("Delete successfull")
        })
        .catch((err) => {
            response.status(403).send("Forbidden")
        });
}

//Exporter les fonctions  
module.exports =
{
    getLocataireByEmail,
    getLocataireById,
    getLocataires,
    deleteLocataire,
    updateLocataire
}