const { verify } = require('crypto')
const serviceWebAuthentification = require('../Services/ServiceWebAuthentification.js')

const ajoutJustificatif = async (request, response) => {
    try {
        await serviceWebAuthentification.ajoutJustificatif(request, response)
    } catch (e) {
        throw new Error(e.message)
    }
}
const validerDemandeInscription = async (request, response) => {
    try {
        await serviceWebAuthentification.validerDemandeInscription(request, response)
    } catch (e) {
        throw new Error(e.message)
    }
}
const refuserDemandeInscription = async (request, response) => {
    try {
        await serviceWebAuthentification.refuserDemandeInscription(request, response)
    } catch (e) {
        throw new Error(e.message)
    }
}
//Exporter les fonctions  
module.exports = 
{
    ajoutJustificatif,
    validerDemandeInscription,
    refuserDemandeInscription
}