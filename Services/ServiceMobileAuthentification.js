const modelLocataire = require('../Models/ModelLocataire')
const modelPhotoIdentite = require('../Models/ModelPhotoIdentite')
const modelPhotoSelfie = require('../Models/ModelPhotoSelfie')

// Inscription d'un locataire
const inscriptionLocataire = async (request, response) => {
    try {
        await modelLocataire.addLocataire(request, response)
        await modelPhotoIdentite.addPhotoIdentite(request, response)
        await modelPhotoSelfie.addPhotoSelfie(request, response)
    } catch (e) {
        throw new Error(e.message)
    }
}

// Connexion d'un locataire
const connexionLocataire = async (request, response) => {
    try {
        await modelLocataire.getLocataireByEmail(request, response)
    } catch (e) {
        throw new Error(e.message)
    }
}

// Avoir la photo de selfie d'un locataire 
const getPhotoSelfie = async (request, response) => {
    try {
        await modelPhotoSelfie.getPhotoSelfie(request, response)
    } catch (e) {
        throw new Error(e.message)
    }
}

// Avoir la photo d'identite d'un locataire
const getPhotoIdentite = async (request, response) => {
    try {
        await modelPhotoIdentite.getPhotoIdentite(request, response)
    } catch (e) {
        throw new Error(e.message)
    }
}

// Exporter les fonctions du service
module.exports =
{
    inscriptionLocataire,
    connexionLocataire,
    getPhotoIdentite,
    getPhotoSelfie
}