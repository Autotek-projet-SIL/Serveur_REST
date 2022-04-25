// Declaration de variables
const pool = require("../config/config_pool");
const log = require("../config/Logger");

//Ajouter une facture
const addFacture = async (request, response) => {
  let body = request.body;

  pool.query(
    "INSERT INTO facture (id_facture, date_facture, montant, heure, tva, id_louer )VALUES ($1, $2, $3, $4, $5, $6)",
    [body.id_facture, body.date_facture, body.montant, body.heure, body.tva, body.id_louer ],
    (error, results) => {
      if (error) {
        log.loggerConsole.error(error);
        response.statusCode = 500;
      }
      else
      {
        response.sendStatus(200);
      }
      //  response.sendStatus(response.statusCode);
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
        response.sendStatus(500);
      } else {
        response.status(200).json(results.rows);
      }
    }
  );
};

/*// Mettre a jour les informations d'un facture
const updateFacture = async (request, response) => {
  let id_facture = request.params.id_facture;
  let body = request.body;
  pool.query(
    "UPDATE facture SET date_facture=$2, montant=$3, heure=$4 ,tva=$5  WHERE id_facture=$1",
    [id_facture, body.date_facture, body.montant, body.heure, body.tva],
    (error, results) => {
      if (error) {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.statusCode == 500;
      } else {
      }
    }
  );
};*/

//Exporter les fonctions CRUD de la demande d'inscription
module.exports = {
  addFacture,
  getFactures,
  getFactureById,
};