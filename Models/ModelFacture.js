// Variables Declaration
const pool = require("../config/config_pool"); // DataBase Configuration
const log = require("../config/Logger"); // Display Configurations

//Functions of Facture Management Model
 
// add a Facture
const addFacture = async (request, response) => {
  let body = request.body;
  pool.query(
    "INSERT INTO facture (date_facture, montant, heure, tva, id_louer,id_payer ) VALUES ($1, $2, $3, $4, $5,$6)",
    [
      body.date_facture,
      body.montant,
      body.heure,
      body.tva,
      body.id_louer,
      body.id_payer,
    ],
    (error, results) => {
      if (error) {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.statusCode = 500;
      } else {
        if (process.env.NODE_ENV === "test_unitaire") {
          response.sendStatus(200);
        } else {
          response.statusCode = 200;
        }
      }
    }
  );
};

// recuperate a facture Details by id
async function getFactureDetailByID(request, response) {
  let id_louer = request.body.id_louer;
  try {
    let Results = await pool.query(
      `SELECT f.id_facture, to_char(f.date_facture, 'DD-MM-YYYY') as date_facture, f.montant, f.heure, f.tva,
         to_char(l.date_debut, 'DD-MM-YYYY') as date_debut, l.heure_debut, l.heure_fin, l.region, l.numero_chassis, v.modele, v.marque,
         lo.nom, lo.prenom, lo.email
         FROM facture f LEFT JOIN louer l ON  f.id_louer = l.id_louer LEFT JOIN locataire lo ON l.id_locataire = lo.id_locataire LEFT JOIN vehicule v ON l.numero_chassis = v.numero_chassis
         WHERE f.id_louer=$1`,
      [id_louer]
    );
    return Results.rows[0];
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
}

// Update a facture details
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
};

//Recuperate the liste of Factures for service statistiques
const getFactureStatistics = async (request, response) => {
  pool.query(
    "SELECT f.id_facture, f.date_facture , f.montant,l.region FROM facture f JOIN louer l ON f.id_louer = l.id_louer; ",
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

// recuperate all factures
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

// recuperate a facture by id
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

// Recuperate a facture by id_louer
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

//Export functions of Factures management
module.exports = {
  addFacture,
  getFactureDetailByID,
  updateFacture,
  getFactureStatistics,
  getFactures,
  getFactureById,
  getFactureByIdLouer,
};
