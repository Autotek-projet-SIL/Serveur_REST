const modelLocataire = require('../Models/ModelLocataire')

const inscriptionLocataire = async (request, response) => {
    try {
        modelLocataire.addLocataire(request, response)
    } catch (e) {
        throw new Error(e.message)
    }
}
//Exporter les fonctions du service
module.exports = 
{
    inscriptionLocataire
}