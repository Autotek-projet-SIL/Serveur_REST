// Declaration de variables
const pool = require("../config/config_pool");
const log = require("../config/Logger");

// Recuperer la liste des agents de maintenances
const getAMs = async (request, response) => {
  pool.query(
    `
  select am.id_am, am.nom, am.prenom, am.numero_telephone, am.email, am.photo_am,tache.id_tache, tache.objet,tache.descriptif,tache.etat,tache.date_debut,tache.date_fin 
  from am left join tache ON tache.id_am = am.id_am 
  `,
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

// Recuperer un agent de maintenance avec son identifiant
const getAMById = async (request, response) => {
  let id = request.params.id;
  pool.query(
    `
  select am.id_am, am.nom, am.prenom, am.numero_telephone, am.email, am.photo_am,tache.id_tache, tache.objet,tache.descriptif,tache.etat,tache.date_debut,tache.date_fin 
  from am left join tache ON tache.id_am = am.id_am where am.id_am =$1
  `,
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

// Recuperer un agent de maintenance avec son email
const getAMByEmail = async (request, response) => {
  let email = request.params.email;
  pool.query(
    `
  select am.id_am, am.nom, am.prenom, am.numero_telephone,am.mot_de_passe, am.email, am.photo_am,tache.id_tache, tache.objet,tache.descriptif,tache.etat,tache.date_debut,tache.date_fin 
  from am left join tache ON tache.id_am = am.id_am where am.email =$1
  `,
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

// Ajouter un agent de maintenance
const addAM = async (request, response) => {
  let body = request.body;
  pool.query(
    "INSERT INTO am(id_am, nom, prenom, numero_telephone, email, mot_de_passe,photo_am)VALUES ($1, $2, $3, $4, $5, $6,$7)",
    [
      body.id,
      body.nom,
      body.prenom,
      body.numero_telephone,
      body.email,
      body.mot_de_passe,
      body.photo_am,
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

// Mettre a jour les informations d'un agent de maintenance
const updateAM = async (request, response) => {
  let id = request.params.id;
  let body = request.body;
  pool.query(
    "UPDATE am SET nom=$2, prenom=$3, numero_telephone=$4, email=$5 WHERE id_am=$1",
    [
      id,
      body.nom,
      body.prenom,
      body.numero_telephone,
      body.email,
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

// Mettre a jour la photo d'un am
const updateAMPhoto = async (request, response) => {
  let id = request.params.id;
  let body = request.body;
  pool.query(
    "UPDATE am SET photo_am=$2 WHERE id_am=$1",
    [
      id,
      body.photo_am
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

// Mettre a jour le mot de passe d'un am
const updateAMPassword = async (request, response) => {
  let id = request.params.id;
  let body = request.body;
  pool.query(
    "UPDATE am SET mot_de_passe=$2 WHERE id_am=$1",
    [
      id,
      body.mot_de_passe
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

// Supprimer un agent de maintenance
const deleteAM = async (request, response) => {
  let id = request.params.id;
  pool.query("DELETE FROM am WHERE id_am=$1", [id], (error, results) => {
    if (error) {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(500);
    } else {
      response.sendStatus(200);
    }
  });
};

//Exporter les fonctions CRUD de l'agent de maintenance
module.exports = {
  getAMs,
  getAMById,
  getAMByEmail,
  addAM,
  updateAM,
  updateAMPhoto,
  updateAMPassword,
  deleteAM,
};
