// Declaration de variables
const modelLocataire = require("../Models/ModelLocataire");
const modelAM = require("../Models/ModelAM");
const modelDemandeInscription = require("../Models/ModelDemandeInscription");
const log = require("../config/Logger");

// Fonctions du service d'authentification mobile
const inscriptionLocataire = async (request, response) => {
  await modelLocataire.addLocataire(request, response);
  await modelDemandeInscription.addDemandeInscription(request, response);
};

const connexionLocataire = async (request, response) => {
  await modelLocataire.getLocataireByEmail(request, response);
};

const connexionAM = async (request, response) => {
  await modelAM.getAMByEmail(request, response);
};

const envoyerDemandeInscription = async (request, response) => {
  await modelDemandeInscription.addDemandeInscription(request, response);
};

// Exporter les fonctions du service d'authentification mobile
module.exports = {
  inscriptionLocataire,
  connexionLocataire,
  connexionAM,
  envoyerDemandeInscription,
};
