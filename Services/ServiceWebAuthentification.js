// Declaration de variables
const ModelJustificatif = require("../Models/ModelJustificatif.js");
const ModelDemandeInscription = require("../Models/ModelDemandeInscription.js");
const ModelLocataire = require("../Models/ModelLocataire.js");
const ModelATC = require("../Models/ModelATC");
const ModelDecideur = require("../Models/ModelDecideur");
const log = require("../config/Logger");

// Fonctions du service d'authentification web
const validerDemandeInscription = async (request, response) => {
  await ModelDemandeInscription.updateDemandeInscription(
    request,
    response,
    "validee"
  );
  await ModelLocataire.updateLocataireStatus(request, response, true);
};

const refuserDemandeInscription = async (request, response) => {
  await ModelDemandeInscription.updateDemandeInscription(
    request,
    response,
    "refusee"
  );
  await ModelJustificatif.addJustificatif(request, response);
};

const getDemandesInscription = async (request, response) => {
  await ModelDemandeInscription.getDemandesInscription(request, response);
};

const getDecideurByEmail = async (request, response) => {
  await ModelDecideur.getDecideurByEmail(request, response);
};

const getATCByEmail = async (request, response) => {
  await ModelATC.getATCByEmail(request, response);
};

//Exporter les fonctions du service d'authentification web
module.exports = {
  validerDemandeInscription,
  refuserDemandeInscription,
  getDemandesInscription,
  getDecideurByEmail,
  getATCByEmail,
};
