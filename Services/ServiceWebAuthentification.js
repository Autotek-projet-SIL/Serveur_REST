const ModelJustificatif = require('../Models/ModelJustificatif.js')
const ModelDemandeInscription = require('../Models/ModelDemandeInscription.js')
const ModelLocataire = require('../Models/ModelLocataire.js')


const validerDemandeInscription = async (request, response) => {
    try {
        await ModelDemandeInscription.updateDemandeInscription(request, response , "validée")
        await ModelLocataire.updateLocataireStatus(request, response , true)

    } catch (e) {
        throw new Error(e.message)
    }
}
const refuserDemandeInscription = async (request, response) => {
    try {
        await ModelDemandeInscription.updateDemandeInscription(request, response, "refusée")
        await ModelJustificatif.addJustificatif(request, response)
      
    } catch (e) {
        throw new Error(e.message)
    }
}

const getDemandesInscription = async (request, response) => {
    try {
        await ModelDemandeInscription.getDemandesInscription(request,response)
    } catch (e) {
        throw new Error(e.message)
    }
}



//Exporter les fonctions du service
module.exports = 
{
    validerDemandeInscription,
    refuserDemandeInscription,
    getDemandesInscription
}