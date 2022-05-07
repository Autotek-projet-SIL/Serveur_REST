// Declaration de variables
const pool = require("../config/config_pool");
const log = require("../config/Logger");

// Fonctions du modèle de gestion des demandes de support

//Recuperer la liste de toutes les demandes de support
const getDemandeSupport = async (request, response) => {
    pool.query(
        "SELECT id_demande_support, objet, descriptif, reponse, id_locataire FROM demandesupport ",
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
        "SELECT id_demande_support, objet, descriptif, reponse, id_locataire FROM demandesupport where id_demande_support =$1",
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

//récupérer la liste des demandes de support d'un locataire 
const getDemandeSupportLocataire = async (request, response) => {
    let id_locataire = request.params.id_locataire;
    pool.query(
        "SELECT id_demande_support, objet, descriptif, reponse, id_locataire FROM demandesupport where id_locataire =$1",
        [id_locataire],
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
    "INSERT INTO demandesupport (objet, descriptif, id_locataire) VALUES ($1, $2, $3 )",
    [
      body.objet,
      body.descriptif,
      body.id_locataire,
    ],
    (error, results) => {
      if (error) {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.sendStatus(500);
      }else {
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
      }else {
        response.sendStatus(200);
      } 
    }
  );
  };
  
  module.exports = {
    getDemandeSupport,
    getDemandeSupportById,
    getDemandeSupportLocataire,
    addDemandeSupport,
    responseDemandeSupport,
  };