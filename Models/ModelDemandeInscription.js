// Declaration of variables
const pool = require("../config/config_pool");
const log = require("../config/Logger");

//retrieve the list of registration requests
const getDemandesInscription = async (request, response) => {
  pool.query(
    "SELECT * FROM demandeinscription order by date_inscription",
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

// Retrieve the list of registration requests for the statistical service
const getDemandeInscriptionStatistics = async (request, response) => {
  pool.query(
    "SELECT id_demande_inscription ,statut ,date_inscription FROM demandeinscription ",
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

// Retrieve a registration request with its identifier
const getDemandeInscriptionById = async (request, response) => {
  let id_demande_inscription = request.params.id_demande_inscription;
  pool.query(
    "SELECT * FROM demandeinscription WHERE id_demande_inscription=$1",
    [id_demande_inscription],
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
// Add a registration request
const addDemandeInscription = async (request, response) => {
  let body = request.body;
  await pool.query(
    "INSERT INTO demandeinscription(statut, date_inscription,id_locataire,email) VALUES ($1, $2, $3, $4)",
    [body.statut, body.date_inscription, body.id, body.email],
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
 
// Update the information of a registration request
const updateDemandeInscription = async (request, response, status) => {
  let email = request.params.id_demande_inscription;
  pool.query(
    "UPDATE demandeinscription SET statut=$2 WHERE id_demande_inscription=$1",
    [email, status],
    (error, results) => {
      if (error) {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.statusCode = 500;
      }
    }
  );
};

// Delete a registration request
const deleteDemandeInscription = async (request, response) => {
  let id_demande_inscription = request.params.id_demande_inscription;
  await pool.query(
    "DELETE FROM demandeinscription WHERE id_demande_inscription=$1",
    [id_demande_inscription],
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

//Export CRUD functions from the registration request
module.exports = {
  getDemandeInscriptionById,
  getDemandesInscription,
  addDemandeInscription,
  updateDemandeInscription,
  deleteDemandeInscription,
  getDemandeInscriptionStatistics,
};
