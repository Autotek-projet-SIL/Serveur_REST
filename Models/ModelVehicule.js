// Declaration de variables
const pool = require("../config/config_pool");
const log = require("../config/Logger");

// Recuperer la liste des véhicules de la flotte
const getVehicles = async (request, response) => {
  pool.query(
    `SELECT v.numero_chassis,v.marque,v.modele,v.couleur,v.image_vehicule,
        v.id_am,am.nom,am.prenom,am.email,am.mot_de_passe,am.numero_telephone,am.numero_telephone,
        v.id_type_vehicule,tv.libelle,tv.tarification
        FROM vehicule v inner join am  ON am.id_am = v.id_am inner join typevehicule tv ON tv.id_type_vehicule = v.id_type_vehicule;`,
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

// Recuperer la liste des véhicules affectés à un AM
const getVehiclesByAmID = async (request, response) => {
  let id_am = request.params.id;
  pool.query(
    `SELECT v.numero_chassis,v.marque,v.modele,v.couleur,v.image_vehicule,
      v.id_am,am.nom,am.prenom,am.email,am.mot_de_passe,am.numero_telephone,am.numero_telephone,
      v.id_type_vehicule,tv.libelle,tv.tarification
      FROM vehicule v inner join am  ON am.id_am = v.id_am inner join typevehicule tv ON tv.id_type_vehicule = v.id_type_vehicule
      WHERE v.id_am = $1;`,
    [id_am],
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

// Recuperer un véhicule avec son numéro de chassis
const getVehicleByChassisNum = async (request, response) => {
  let num_chassis = request.params.num_chassis;
  pool.query(
    `SELECT v.numero_chassis,v.marque,v.modele,v.couleur,v.image_vehicule,
      v.id_am,am.nom,am.prenom,am.email,am.mot_de_passe,am.numero_telephone,am.numero_telephone,
      v.id_type_vehicule,tv.libelle,tv.tarification
  FROM vehicule v inner join am  ON am.id_am = v.id_am inner join typevehicule tv ON tv.id_type_vehicule = v.id_type_vehicule
  WHERE v.numero_chassis=$1;`,
    [num_chassis],
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

// Recuperer la liste des types des véhicules
const getVehiclesTypes = async (request, response) => {
  pool.query(`SELECT * FROM typevehicule;`, (error, results) => {
    if (error) {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(500);
    } else {
      response.status(200).json(results.rows);
    }
  });
};

// Ajouter un véhicule
const addVehicle = async (request, response) => {
  let body = request.body;
  pool.query(
    "INSERT INTO vehicule(numero_chassis, marque, modele, couleur, id_type_vehicule, id_am, image_vehicule) VALUES ($1, $2, $3, $4, $5, $6, $7);",
    [
      body.num_chassis,
      body.marque,
      body.modele,
      body.couleur,
      body.id_type_vehicule,
      body.id_am,
      body.image_vehicule,
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

// Ajouter un type de véhicule
const addVehicleType = async (request, response) => {
  let body = request.body;
  pool.query(
    "INSERT INTO public.typevehicule(id_type_vehicule, libelle, tarification) VALUES ($1, $2, $3);",
    [body.id_type_vehicule, body.libelle, body.tarification],
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

// Mettre a jour les informations d'un véhicule
const updateVehicle = async (request, response) => {
  let num_chassis = request.params.num;
  let body = request.body;
  pool.query(
    "UPDATE vehicule SET numero_chassis=$8, marque=$2, modele=$3, couleur=$4, id_type_vehicule=$5, id_am=$6, image_vehicule=$7 WHERE numero_chassis=$1;",
    [
      num_chassis,
      body.marque,
      body.modele,
      body.couleur,
      body.id_type_vehicule,
      body.id_am,
      body.image_vehicule,
      body.num_chassis,
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

// Mettre a jour les informations d'un type de véhicule
const updateVehicleType = async (request, response) => {
  let id_type_vehicule = request.params.id;
  let body = request.body;
  pool.query(
    "UPDATE typevehicule SET libelle=$2, tarification=$3 WHERE id_type_vehicule=$1;",
    [id_type_vehicule, body.libelle, body.tarification],
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



// Supprimer un véhicule
const deleteVehicule = async (request, response) => {
  let num_chassis = request.params.num;
  pool.query(
    "DELETE FROM vehicule WHERE numero_chassis=$1",
    [num_chassis],
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

// Supprimer un type de véhicule
const deleteVehiculeType = async (request, response) => {
  let id_type_vehicule = request.params.id;
  pool.query(
    "DELETE FROM typevehicule WHERE id_type_vehicule=$1",
    [id_type_vehicule],
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

//Exporter les fonctions CRUD de l'agent de maintenance
module.exports = {
  getVehicles,
  getVehiclesByAmID,
  getVehicleByChassisNum,
  getVehiclesTypes,
  addVehicle,
  addVehicleType,
  updateVehicle,
  updateVehicleType,
  deleteVehicule,
  deleteVehiculeType,
 
};
