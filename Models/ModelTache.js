// Declaration de variables
const pool = require("../config/config_pool");
const log = require("../config/Logger");

//Ajouter une tache
const addTache = async (request, response, data) => {
  let body = request.body;
  pool.query(
    "INSERT INTO public.tache(objet, descriptif, etat, date_debut, date_fin, id_am, etat_avancement, type_tache) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);",
    [
      body.objet,
      body.descriptif,
      body.etat,
      body.date_debut,
      body.date_fin,
      body.id_am,
      body.etat_avancement,
      body.type_tache,
    ],
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

// Recuperer la liste des taches
const getTaches = async (request, response) => {
  pool.query(
    `Select id_tache, objet, descriptif, etat, date_debut, date_fin, id_am, etat_avancement, type_tache  from tache;`,
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

// Mettre a jour l'etat d'une tache
const updateEtatTache = async (request, response) => {
  let id_tache = request.params.id;
  let body = request.body;
  pool.query(
    "UPDATE tache SET etat=$2 WHERE id_tache=$1",
    [id_tache, body.etat],
    (error, results) => {
      if (error) {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.statusCode == 500;
      } else {
        response.sendStatus(200);
      }
    }
  );
};

// Mettre a jour l'etat d'avancement d'une tache
const updateEtatAvancementTache = async (request, response) => {
  let id_tache = request.params.id;
  let body = request.body;
  pool.query(
    `UPDATE tache SET etat_avancement=$2 WHERE id_tache=$1`,
    [id_tache, body.etat_avancement],
    (error, results) => {
      if (error) {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.statusCode == 500;
      } else {
        response.sendStatus(200);
      }
    }
  );
};

// Recuperer une tache par l'id Am
const getTacheByIdAm = async (request, response) => {
  let id = request.params.id;
  pool.query(
    `SELECT * FROM tache WHERE id_am = $1;`,
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
  addTache,
  getTaches,
  getTacheByIdAm,
  updateEtatAvancementTache,
  updateEtatTache,
};
