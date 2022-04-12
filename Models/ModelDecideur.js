// Declaration de variables
const pool = require("../config/config_pool");
const log = require("../config/Logger");

// Recuperer la liste des décideurs
const getDecideurs = async (request, response) => {
  pool.query("SELECT * FROM decideur", (error, results) => {
    if (error) {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(500);
    } else {
      response.status(200).json(results.rows);
    }
  });
};

// Recuperer un décideur avec un identifiant
const getDecideurById = async (request, response) => {
  let id = request.params.id;
  pool.query(
    "SELECT * FROM decideur WHERE id_decideur=$1",
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

// Recuperer un décideur avec son email
const getDecideurByEmail = async (request, response) => {
  let email = request.params.email;
  pool.query(
    "SELECT * FROM decideur WHERE email=$1",
    [email],
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

// Ajouter un décideur
const addDecideur = async (request, response) => {
  let body = request.body;
  pool.query(
    "INSERT INTO decideur(id_decideur, nom, prenom, numero_telephone, email, mot_de_passe, photo_decideur)VALUES ($1, $2, $3, $4, $5, $6, $7)",
    [
      body.id,
      body.nom,
      body.prenom,
      body.numero_telephone,
      body.email,
      body.mot_de_passe,
      body.photo_decideur,
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

// Mettre a jour les informations d'un decideur
const updateDecideur = async (request, response) => {
  let id = request.params.id;
  let body = request.body;
  pool.query(
    "UPDATE decideur SET nom=$2, prenom=$3, numero_telephone=$4, email=$5, mot_de_passe=$6, photo_decideur=$7 WHERE id_decideur=$1",
    [
      id,
      body.nom,
      body.prenom,
      body.numero_telephone,
      body.email,
      body.mot_de_passe,
      body.photo_decideur,
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

// Supprimer un decideur
const deleteDecideur = async (request, response) => {
  let id = request.params.id;
  pool.query(
    "DELETE FROM decideur WHERE id_decideur=$1",
    [id],
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

//Exporter les fonctions CRUD d'un decideur
module.exports = {
  getDecideurById,
  getDecideurByEmail,
  getDecideurs,
  addDecideur,
  updateDecideur,
  deleteDecideur,
};
