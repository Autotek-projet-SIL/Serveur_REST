const { verify } = require('crypto')
const serviceWebAuthentification = require('../Services/ServiceWebAuthentification.js')

const validerDemandeInscription = async (request, response) => {
    try {
        await serviceWebAuthentification.validerDemandeInscription(request, response)
        response.status(200).send("Demande d'inscription validée avec succés")
    } catch (e) {
        throw new Error(e.message)
    }
}
const refuserDemandeInscription = async (request, response) => {
    try {
        await serviceWebAuthentification.refuserDemandeInscription(request, response)
        response.status(200).send("Demande d'inscription refusée")
    } catch (e) {
        throw new Error(e.message)
    }
}
const getDemandesInscription = async (request, response) => {
    try {
        await serviceWebAuthentification.getDemandesInscription(request, response)
    } catch (e) {
        throw new Error(e.message)
    }
}

//Exporter les fonctions  
module.exports = 
{
    validerDemandeInscription,
    refuserDemandeInscription, 
    getDemandesInscription
}