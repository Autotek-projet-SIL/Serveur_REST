// Declaration de variables
const pool = require("../config/config_pool");
const log = require("../config/Logger");

// Fonctions du modèle de gestion des demandes de support

//Recuperer la liste de toutes les demandes de support
const getDemandeSupport = async (request, response) => {
  pool.query(
    "SELECT d.id_demande_support, d.objet, d.descriptif, d.reponse,d.email, d.id_louer, l.id_locataire, l.numero_chassis, loc.nom, loc.prenom,loc.photo_selfie  FROM demandesupport d join louer l ON d.id_louer = l.id_louer join locataire loc on l.id_locataire = loc.id_locataire ;",
    (error, results) => {
      if (error) {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.sendStatus(500);
      } else {
        response.status(200).json(results.rows);
      }
    }
  );
};

//récupérer un demandes de support par id
const getDemandeSupportById = async (request, response) => {
  let id = request.params.id;
  pool.query(
    "SELECT d.id_demande_support, d.objet, d.descriptif, d.reponse,d.email, d.id_louer, l.id_locataire, l.numero_chassis, loc.nom, loc.prenom,loc.photo_selfie  FROM demandesupport d join louer l ON d.id_louer = l.id_louer join locataire loc on l.id_locataire = loc.id_locataire where id_demande_support =$1",
    [id],
    (error, results) => {
      if (error) {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.sendStatus(500);
      } else {
        response.status(200).json(results.rows);
      }
    }
  );
};

//récupérer la liste des demandes de support d'un location
const getDemandeSupportLouer = async (request, response) => {
  let id_louer = request.params.id_louer;
  pool.query(
    "SELECT d.id_demande_support, d.objet, d.descriptif, d.reponse,d.email, d.id_louer, l.id_locataire, l.numero_chassis, loc.nom, loc.prenom,loc.photo_selfie  FROM demandesupport d join louer l ON d.id_louer = l.id_louer join locataire loc on l.id_locataire = loc.id_locataire where l.id_louer =$1",
    [id_louer],
    (error, results) => {
      if (error) {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.sendStatus(500);
      } else {
        response.status(200).json(results.rows);
      }
    }
  );
};

//Ajouter un demande de support
const addDemandeSupport = async (request, response) => {
  let body = request.body;
  pool.query(
    "INSERT INTO demandesupport (objet, descriptif, email, id_louer) VALUES ($1, $2, $3, $4 )",
    [body.objet, body.descriptif, body.email, body.id_louer],
    (error, results) => {
      if (error) {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.sendStatus(500);
      } else {
        response.sendStatus(200);
      }
    }
  );
};

//Mettre a jour le champs reponse d'un demande de support
const responseDemandeSupport = async (request, response) => {
  let id = request.params.id;
  let body = request.body;
  pool.query(
    "UPDATE demandesupport SET reponse = $1 WHERE id_demande_support=$2",
    [body.response, id],
    (error, results) => {
      if (error) {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.statusCode = 500;
      } else {
        response.statusCode = 200;
      }
    }
  );
};

module.exports = {
  getDemandeSupport,
  getDemandeSupportById,
  getDemandeSupportLouer,
  addDemandeSupport,
  responseDemandeSupport,
};
