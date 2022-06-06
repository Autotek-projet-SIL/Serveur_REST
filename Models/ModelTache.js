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
    `Select t.id_tache, t.objet, t.descriptif, t.etat, t.date_debut, t.date_fin, t.id_am, t.etat_avancement, t.type_tache, p.id_panne, p.numero_chassis, v.numero_chassis,v.marque,v.modele,v.couleur,v.image_vehicule from tache t left join panne p ON p.id_tache = t.id_tache left join vehicule v ON v.numero_chassis = p.numero_chassis;`,
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
    `Select t.id_tache, t.objet, t.descriptif, t.etat, t.date_debut, t.date_fin, t.id_am, t.etat_avancement, t.type_tache, p.id_panne, p.numero_chassis, v.numero_chassis,v.marque,v.modele,v.couleur,v.image_vehicule from tache t left join panne p ON p.id_tache = t.id_tache left join vehicule v ON v.numero_chassis = p.numero_chassis WHERE t.id_am = $1`,
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

// recuperer une tache par son id
const getTacheById = async (request, response) => {
  let id = request.params.id;
  pool.query(
    `Select * from tache WHERE id_tache = $1`,
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
  getTacheById,
};
