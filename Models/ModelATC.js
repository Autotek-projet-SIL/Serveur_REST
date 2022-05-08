// Declaration de variables
const pool = require("../config/config_pool");
const log = require("../config/Logger");

// Recuperer la liste des locataires
const getATCs = async (request, response) => {
  pool.query(
    "SELECT id_atc, nom, prenom, numero_telephone, email, est_root, photo_atc FROM atc",
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

// Recuperer un ATC avec un identifiant
const getATCById = async (request, response) => {
  let id = request.params.id;
  pool.query(
    "SELECT id_atc, nom, prenom, numero_telephone, email,mot_de_passe est_root, photo_atc FROM atc WHERE id_atc=$1",
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

// Recuperer un ATC avec son email
const getATCByEmail = async (request, response) => {
  let email = request.params.email;
  pool.query(
    "SELECT id_atc, nom, prenom, numero_telephone, email,mot_de_passe, est_root, photo_atc FROM atc WHERE email=$1",
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

// Ajouter un ATC
const addATC = async (request, response) => {
  let body = request.body;
  pool.query(
    "INSERT INTO atc(id_atc, nom, prenom, numero_telephone, email, mot_de_passe,est_root,photo_atc)VALUES ($1, $2, $3, $4, $5, $6,$7,$8)",
    [
      body.id,
      body.nom,
      body.prenom,
      body.numero_telephone,
      body.email,
      body.mot_de_passe,
      body.est_root,
      body.photo_atc,
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

// Mettre a jour les informations d'un ATC
const updateATC = async (request, response) => {
  let id = request.params.id;
  let body = request.body;
  pool.query(
    "UPDATE atc SET nom=$2, prenom=$3, numero_telephone=$4, email=$5 WHERE id_atc=$1",
    [id, body.nom, body.prenom, body.numero_telephone, body.email],
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

// Mettre a jour la photo d'un atc
const updateATCPhoto = async (request, response) => {
  let id = request.params.id;
  let body = request.body;
  pool.query(
    "UPDATE atc SET photo_atc=$2 WHERE id_atc=$1",
    [id, body.photo_atc],
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

// Mettre a jour le mot de passe d'un atc
const updateATCPassword = async (request, response) => {
  let id = request.params.id;
  let body = request.body;
  pool.query(
    "UPDATE atc SET mot_de_passe=$2 WHERE id_atc=$1",
    [id, body.mot_de_passe],
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

// Mettre a jour le statut d'un atc
const updateATCStatut = async (request, response) => {
  let id = request.params.id;
  let body = request.body;
  pool.query(
    "UPDATE atc SET est_root=$2 WHERE id_atc=$1",
    [id, body.est_root],
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

// Supprimer un ATC
const deleteATC = async (request, response) => {
  let id = request.params.id;
  pool.query("DELETE FROM atc WHERE id_atc=$1", [id], (error, results) => {
    if (error) {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(500);
    } else {
      response.sendStatus(200);
    }
  });
};

//Exporter les fonctions CRUD de l'ATC
module.exports = {
  getATCById,
  getATCByEmail,
  getATCs,
  addATC,
  updateATC,
  updateATCPhoto,
  updateATCPassword,
  updateATCStatut,
  deleteATC,
};
