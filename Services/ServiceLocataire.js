const ModelLocataire = require('../Models/ModelLocataire.js')

//Recuperer les informations d'un locataire grace a son email
const getLocataireByEmail = async (request, response) => {
    try {
        await ModelLocataire.getLocataireByEmail(request, response)

    } catch (e) {
        console.log(e)
    }
}

//Recuperer les informations d'un locataire grace a son ID
const getLocataireById = async (request, response) => {
    try {
        await ModelLocataire.getLocataireById(request, response)
    } catch (e) {
        console.log(e)
    }
}

// Modification des informations d'un locataire
const updateLocataire = async (request, response) => {
    try {
        await ModelLocataire.updateLocataire(request, response)
    } catch (e) {
        console.log(e)
    }
}

//Recuperer les informations d'un locataire grace a son ID
const deleteLocataire = async (request, response) => {
    try {
        await ModelLocataire.deleteLocataire(request, response)
    } catch (e) {
        console.log(e)
    }
}

//Recuperer la liste des locataires du systeme
const getLocataires = async (request, response) => {
    try {
        await ModelLocataire.getLocataires(request, response)

    } catch (e) {
        console.log(e)
    }
}

//Exporter les fonctions du service
module.exports = 
{
    getLocataireByEmail,
    getLocataires,
    getLocataireById,
    deleteLocataire,
    updateLocataire
}