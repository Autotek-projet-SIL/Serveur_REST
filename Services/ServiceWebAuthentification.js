// Declaration de variables
const ModelJustificatif = require("../Models/ModelJustificatif.js");
const ModelDemandeInscription = require("../Models/ModelDemandeInscription.js");
const ModelLocataire = require("../Models/ModelLocataire.js");
const ModelATC = require("../Models/ModelATC");
const ModelDecideur = require("../Models/ModelDecideur");
const log = require("../config/Logger");

// functions of web authentification service

//validate Request Registration
const validerDemandeInscription = async (request, response) => {
  await ModelDemandeInscription.updateDemandeInscription(
    request,
    response,
    "validee"
  );
  await ModelLocataire.updateLocataireStatus(request, response, true);
};

//refuse Request Registration
const refuserDemandeInscription = async (request, response) => {
  await ModelDemandeInscription.updateDemandeInscription(
    request,
    response,
    "refusee"
  );
  await ModelJustificatif.addJustificatif(request, response);
};

//get Requests Registration
const getDemandesInscription = async (request, response) => {
  await ModelDemandeInscription.getDemandesInscription(request, response);
};

//get Decideur By Email
const getDecideurByEmail = async (request, response) => {
  await ModelDecideur.getDecideurByEmail(request, response);
};

//get atc by email
const getATCByEmail = async (request, response) => {
  await ModelATC.getATCByEmail(request, response);
};

//Export functions
module.exports = {
  validerDemandeInscription,
  refuserDemandeInscription,
  getDemandesInscription,
  getDecideurByEmail,
  getATCByEmail,
};
