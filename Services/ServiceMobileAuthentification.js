const modelLocataire = require('../Models/ModelLocataire')
const modelDemandeInscription = require('../Models/ModelDemandeInscription')

// Inscription d'un locataire
const inscriptionLocataire = async (request, response) => {
    try {
        await modelLocataire.addLocataire(request, response)
        await modelDemandeInscription.addDemandeInscription(request, response)
    } catch (e) {
        console.log(e)
    }
}

// Connexion d'un locataire
const connexionLocataire = async (request, response) => {
    try {
        await modelLocataire.getLocataireByEmail(request, response)
    } catch (e) {
        console.log(e)
    }
}

// Exporter les fonctions du service
module.exports =
{
    inscriptionLocataire,
    connexionLocataire,
}