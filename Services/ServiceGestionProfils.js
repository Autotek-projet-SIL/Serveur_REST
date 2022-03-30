const ModelLocataire = require('../Models/ModelLocataire')
const ModelATC = require('../Models/ModelATC')
const ModelDecideur = require('../Models/ModelDecideur')
const ModelAM = require('../Models/ModelAM')

//Recuperer les informations d'un locataire grace a son email
const getLocataires= async (request, response) => {
    try {
        await ModelLocataire.getLocataires(request, response)

    } catch (e) {
        console.log(e)
    }
}

//Recuperer les informations d'un locataire grace a son email
const updateLocataire= async (request, response) => {
    try {
        await ModelLocataire.updateLocataire(request, response)

    } catch (e) {
        console.log(e)
    }
}
const getATCs= async (request, response) => {
    try {
        await ModelATC.getATCs(request, response)

    } catch (e) {
        console.log(e)
    }
}

//Recuperer les informations d'un locataire grace a son email
const updateATC= async (request, response) => {
    try {
        await ModelATC.updateATC(request, response)

    } catch (e) {
        console.log(e)
    }
}
const getDecideurs= async (request, response) => {
    try {
        await ModelDecideur.getDecideurs(request, response)

    } catch (e) {
        console.log(e)
    }
}

//Recuperer les informations d'un locataire grace a son email
const updateDecideur= async (request, response) => {
    try {
        await ModelDecideur.updateDecideur(request, response)

    } catch (e) {
        console.log(e)
    }
}
const getAMs= async (request, response) => {
    try {
        await ModelAM.getAMs(request, response)

    } catch (e) {
        console.log(e)
    }
}

//Recuperer les informations d'un locataire grace a son email
const updateAM= async (request, response) => {
    try {
        await ModelAM.updateAM(request, response)

    } catch (e) {
        console.log(e)
    }
}
module.exports=
{
getLocataires,
updateLocataire,
getATCs,
updateATC,
getDecideurs,
updateDecideur,
getAMs,
updateAM
}
