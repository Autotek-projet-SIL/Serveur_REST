// Declaration de variables
const log = require("../config/Logger");
//const serviceNotification = require("../Services/ServiceNotification");
const modelDemandeSupport = require("../Models/ModelDemandeSupport");

// Fonctions du service de gestion des demandes de support

//Recuperer la liste de toutes les demandes de support
const getDemandeSupport = async (request, response) => {
  await modelDemandeSupport.getDemandeSupport(request, response);
};

//récupérer un demandes de support par id
const getDemandeSupportById = async (request, response) => {
  await modelDemandeSupport.getDemandeSupportById(request, response);
};

//récupérer la liste des demandes de support d'un location
const getDemandeSupportLouer = async (request, response) => {
  await modelDemandeSupport.getDemandeSupportLouer(request, response);
};

//Ajouter un demande de support
const addDemandeSupport = async (request, response) => {
  await modelDemandeSupport.addDemandeSupport(request, response);
};

//Mettre a jour le champs reponse d'un demande de support
const responseDemandeSupport = async (request, response) => {
  await modelDemandeSupport.responseDemandeSupport(request, response);
};

module.exports = {
  getDemandeSupport,
  getDemandeSupportById,
  getDemandeSupportLouer,
  addDemandeSupport,
  responseDemandeSupport,
};
