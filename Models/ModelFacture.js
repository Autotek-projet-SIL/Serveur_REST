// Declaration de variables
const pool = require("../config/config_pool");
const log = require("../config/Logger");

//Ajouter une facture
const addFacture = async (request, response) => {
  let body = request.body;
  pool.query(
    "INSERT INTO facture (date_facture, montant, heure, tva, id_louer )VALUES ($1, $2, $3, $4, $5)",
    [body.date_facture, body.montant, body.heure, body.tva, body.id_louer],
    (error, results) => {
      if (error) {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.statusCode = 500;
      } else {
        response.sendStatus(200);
      }
      //  response.sendStatus(response.statusCode);
    }
  );
};

const getFactureStatistics = async (request, response) => {
  pool.query(
    "SELECT id_facture, date_facture , montant FROM facture ",
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

// Recuperer la liste de tous les factures
const getFactures = async (request, response) => {
  pool.query(
    `SELECT id_facture, date_facture, montant, heure, tva, id_louer
        FROM Facture ;`,
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

// Recuperer une facture par id
const getFactureById = async (request, response) => {
  let id = request.params.id;
  pool.query(
    `SELECT id_facture, date_facture, montant, heure, tva, id_louer
      FROM facture 
      WHERE id_facture = $1;`,
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

// Recuperer une facture par id
const getFactureByIdLouer = async (request, response) => {
  let id = request.params.id_louer;
  pool.query(
    `SELECT id_facture, date_facture, montant, heure, tva, id_louer
      FROM facture 
      WHERE id_louer = $1;`,
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

//Exporter les fonctions de facture
module.exports = {
  addFacture,
  getFactureStatistics,
  getFactures,
  getFactureById,
  getFactureByIdLouer,
};
