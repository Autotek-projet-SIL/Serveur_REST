// Declaration de variables
const pool = require("../config/config_pool");
const log = require("../config/Logger");

//Ajouter un paiement
const addPaiement = async (request, response) => {
  let body = request.body;
  pool.query(
    "INSERT INTO Payer (id_locataire, id_facture, type_paiement,heure_paiement,date_paiement) VALUES ($1, $2, $3, $4, $5)",
    [
      body.id,
      body.id_facture,
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
        response.sendStatus(200);
      }
    }
  );
};

// Recuperer la liste des paiements effectués par un locataire
const getPaiementsByIdLocataire = async (request, response) => {
  let id = request.params.id;
  pool.query(
    `SELECT pa.id_locataire,pa.id_facture,pa.type_paiement,pa.heure_paiement,pa.date_paiement,f.date_facture,f.montant,f.heure,f.tva,f.id_louer
    FROM Payer pa  inner join facture f on pa.id_facture=f.id_facture where id_locataire=$1;`,
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
