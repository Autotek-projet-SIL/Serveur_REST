const ModelLocataire = require('../Models/ModelLocataire.js')
const ModelDecideur = require('../Models/ModelDecideur.js')
const ModelATC = require('../Models/ModelATC.js')
const ModelAM = require('../Models/ModelAM.js')


//Recuperer les informations d'un locataire grace a son ID
const deleteLocataire = async (request, response) => {
    try {
        await ModelLocataire.deleteLocataire(request, response)
    } catch (e) {
        response.status(520).send("Unknown Error")
        console.log(e)
    }
}
const deleteATC = async (request, response) => {
    try {
        await ModelATC.deleteATC(request, response)
    } catch (e) {
        response.status(520).send("Unknown Error")
        console.log(e)
    }
}

const deleteDecideur  = async (request, response) => {
    try {
        await ModelDecideur.deleteDecideur(request, response)
    } catch (e) {
        response.status(520).send("Unknown Error")
        console.log(e)
    }
}

const deleteAM = async (request, response) => {
    try {
        await ModelAM.deleteAM(request, response)
    } catch (e) {
        response.status(520).send("Unknown Error")
        console.log(e)
    }
}

const addLocataire = async (request, response) => {
    try {
        await ModelLocataire.addLocataire(request, response)
    } catch (e) {
        response.status(520).send("Unknown Error")
        console.log(e)
    }
}
const addATC = async (request, response) => {
    try {
        await ModelATC.addATC(request, response)
    } catch (e) {
        response.status(520).send("Unknown Error")
        console.log(e)
    }
}

const addDecideur  = async (request, response) => {
    try {
        await ModelDecideur.addDecideur(request, response)
    } catch (e) {
        response.status(520).send("Unknown Error")
        console.log(e)
    }
}

const addAM = async (request, response) => {
    try {
        await ModelAM.addAM(request, response)
    } catch (e) {
        response.status(520).send("Unknown Error")
        console.log(e)
    }
}



//Exporter les fonctions du service
module.exports = 
{
    deleteAM,
    deleteDecideur,
    deleteATC,
    deleteLocataire,
    addAM,
    addDecideur,
    addATC,
    addLocataire,
    

}