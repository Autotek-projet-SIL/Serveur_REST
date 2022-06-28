// Declaration of variables
const pool = require("../config/config_pool");
const log = require("../config/Logger");

// Retrieve a proof with its identifier
const getJustificatifById = async (request, response) => {
  let id_justificatif = request.params.id_justificatif;
  pool.query(
    "SELECT * FROM justificatif WHERE id_justificatif=$1",
    [id_justificatif],
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

// Add proof
const addJustificatif = async (request, response) => {
  let body = request.body;
  let id_demande_inscription = request.params.id_demande_inscription;
  pool.query(
    "INSERT INTO justificatif(objet, descriptif,id_demande_inscription)VALUES ($1, $2,$3)",
    [body.objet, body.descriptif, id_demande_inscription],
    (error, results) => {
      if (error) {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.statusCode = 500;
      }
      response.sendStatus(response.statusCode);
    }
  );
};

// Update the information of a receipt
const updateJustificatif = async (request, response) => {
  let id_justificatif = request.params.id_justificatif;
  let body = request.body;
  pool.query(
    "UPDATE justificatif SET objet=$2, descriptif=$3, id_demande_inscription=$4 WHERE id_justificatif=$1",
    [id_justificatif, body.objet, body.descriptif, body.id_demande_inscription],
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
 
//Export crud functions from the credential
module.exports = {
  getJustificatifById,
  addJustificatif,
  updateJustificatif,
};
