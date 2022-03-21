const serviceMobileAuthentification = require('../Services/ServiceMobileAuthentification.js')

const inscriptionLocataire = async (request, response) => {
    try {
        serviceMobileAuthentification.inscriptionLocataire(request, response)
    } catch (e) {
        throw new Error(e.message)
    }
}

const addPhotoIdentite = async (request, response) => {
    try {
        serviceMobileAuthentification.addPhotoIdentite(request, response)
    } catch (e) {
        throw new Error(e.message)
    }
}

const addPhotoSelfie = async (request, response) => {
    try {
        serviceMobileAuthentification.addPhotoSelfie(request, response)
    } catch (e) {
        throw new Error(e.message)
    }
}
//Exporter les fonctions  
module.exports = 
{
    inscriptionLocataire,
    addPhotoIdentite,
    addPhotoSelfie
}