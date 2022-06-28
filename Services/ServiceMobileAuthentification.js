// variable declaration
const modelLocataire = require("../Models/ModelLocataire");
const modelAM = require("../Models/ModelAM");
const modelDemandeInscription = require("../Models/ModelDemandeInscription");
const log = require("../config/Logger");

// Functions of mobile authentification service
const inscriptionLocataire = async (request, response) => {
  await modelLocataire.addLocataire(request, response);
  await modelDemandeInscription.addDemandeInscription(request, response);
};
 
//locataire connexion
const connexionLocataire = async (request, response) => {
  await modelLocataire.getLocataireByEmail(request, response);
};

//am connexion
const connexionAM = async (request, response) => {
  await modelAM.getAMByEmail(request, response);
};

//send inscription request
const envoyerDemandeInscription = async (request, response) => {
  await modelDemandeInscription.addDemandeInscription(request, response);
};

// Export functions
module.exports = {
  inscriptionLocataire,
  connexionLocataire,
  connexionAM,
  envoyerDemandeInscription,
};
