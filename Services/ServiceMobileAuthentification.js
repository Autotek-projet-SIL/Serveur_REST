const modelLocataire = require('../Models/ModelLocataire')
const modelPhotoIdentite = require('../Models/ModelPhotoIdentite')
const modelPhotoSelfie = require('../Models/ModelPhotoSelfie')

const inscriptionLocataire = async (request, response) => {
    try {
        modelLocataire.addLocataire(request, response)
    } catch (e) {
        throw new Error(e.message)
    }
}
const addPhotoIdentite = async (request, response) => {
    try {
        modelPhotoIdentite.addPhotoIdentite(request, response)
    } catch (e) {
        throw new Error(e.message)
    }
}

const addPhotoSelfie = async (request, response) => {
    try {
        modelPhotoSelfie.addPhotoSelfie(request, response)
    } catch (e) {
        throw new Error(e.message)
    }
}
//Exporter les fonctions du service
module.exports = 
{
    inscriptionLocataire,
    addPhotoIdentite,
    addPhotoSelfie
}