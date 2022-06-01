// Declaration de variables
const pool = require("../config/config_pool");
const log = require("../config/Logger");

//Ajouter un paiement
const addPaiement = async (request, response) => {
  let body = request.body;
  pool.query(
    "INSERT INTO Payer (id_locataire, type_paiement,heure_paiement,date_paiement) VALUES ($1, $2, $3, $4) returning id_payer",
    [
      body.id,
      body.type_paiement,
      body.heure_paiement,
      body.date_paiement,
    ],
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

// Recuperer la liste des paiements effectués par un locataire
const getPaiementsByIdLocataire = async (request, response) => {
  let id = request.params.id;
  pool.query(
    `SELECT * from payer id_locataire=$1;`,
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

//Exporter les fonctions CRUD de paiement
module.exports = {
  addPaiement,
  getPaiementsByIdLocataire,
};
