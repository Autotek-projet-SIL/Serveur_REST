const ModelJustificatif = require('../Models/ModelJustificatif.js')
const ModelDemandeInscription = require('../Models/ModelDemandeInscription.js')
const ModelLocataire = require('../Models/ModelLocataire.js')
const ModelATC = require('../Models/ModelATC')
const ModelDecideur = require('../Models/ModelDecideur')

//Valider la demande d'inscription d'un locataire
const validerDemandeInscription = async (request, response) => {
    try {
        await ModelDemandeInscription.updateDemandeInscription(request, response , "validee")
        await ModelLocataire.updateLocataireStatus(request, response , true)

    } catch (e) {
        console.log(e)
    }
}

//Refuser la demande d'inscription d'un locataire
const refuserDemandeInscription = async (request, response) => {
    try {
        await ModelDemandeInscription.updateDemandeInscription(request, response, "refusee")
        await ModelJustificatif.addJustificatif(request, response)
      
    } catch (e) {
        console.log(e)
    }
}

//Recuperer la liste des demandes d'inscriptions des locataires
const getDemandesInscription = async (request, response) => {
    try {
        await ModelDemandeInscription.getDemandesInscription(request,response)
    } catch (e) {
        console.log(e)
    }
}

//Recuperer la liste des demandes d'inscriptions des locataires
const getDecideurByEmail = async (request, response) => {
    try {
        await ModelDecideur.getDecideurByEmail(request,response)
    } catch (e) {
        console.log(e)
    }
}

//Recuperer la liste des demandes d'inscriptions des locataires
const getATCByEmail = async (request, response) => {
    try {
        await ModelATC.getATCByEmail(request,response)
    } catch (e) {
        console.log(e)
    }
}


//Exporter les fonctions du service
module.exports = 
{
    validerDemandeInscription,
    refuserDemandeInscription,
    getDemandesInscription,
    getDecideurByEmail,
    getATCByEmail
}