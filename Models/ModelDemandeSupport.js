// Variables Declaration
const pool = require("../config/config_pool");   // DataBase configuration
const log = require("../config/Logger");          // display configuration

// Functions of demandeSupport management Model

//recuperate all support requests
const getDemandeSupport = async (request, response) => {
  pool.query(
    "SELECT d.id_demande_support, d.objet, d.descriptif, d.reponse,d.email, d.id_louer, l.id_locataire, l.numero_chassis, loc.nom, loc.prenom,loc.photo_selfie  FROM demandesupport d JOIN louer l ON d.id_louer = l.id_louer JOIN locataire loc ON l.id_locataire = loc.id_locataire ;",
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

//recuperate a support request by id
const getDemandeSupportById = async (request, response) => {
  let id = request.params.id;
  pool.query(
    "SELECT d.id_demande_support, d.objet, d.descriptif, d.reponse,d.email, d.id_louer, l.id_locataire, l.numero_chassis, loc.nom, loc.prenom,loc.photo_selfie  FROM demandesupport d JOIN louer l ON d.id_louer = l.id_louer JOIN locataire loc ON l.id_locataire = loc.id_locataire WHERE id_demande_support =$1",
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

//recuperate all support requests for a location
const getDemandeSupportLouer = async (request, response) => {
  let id_louer = request.params.id_louer;
  pool.query(
    "SELECT d.id_demande_support, d.objet, d.descriptif, d.reponse,d.email, d.id_louer, l.id_locataire, l.numero_chassis, loc.nom, loc.prenom,loc.photo_selfie  FROM demandesupport d JOIN louer l ON d.id_louer = l.id_louer JOIN locataire loc ON l.id_locataire = loc.id_locataire WHERE l.id_louer =$1",
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

//add a support request
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

//Response to a support request
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

//exports methods
module.exports = {
  getDemandeSupport,
  getDemandeSupportById,
  getDemandeSupportLouer,
  addDemandeSupport,
  responseDemandeSupport,
};
