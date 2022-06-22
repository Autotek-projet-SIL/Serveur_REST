// Variables Declaration 
const pool = require("../config/config_pool");                // DataBase configuration
const log = require("../config/Logger");                           // Display configuration 

//Model of Flotte service Declaration 

//recuperate all vehicules
const getVehicles = async (request, response) => {
  pool.query(
    `SELECT v.numero_chassis,v.marque,v.modele,v.couleur,v.image_vehicule,
        v.id_am,am.nom,am.prenom,am.email,am.numero_telephone,
        v.id_type_vehicule,tv.libelle,tv.tarification
        FROM vehicule v INNER JOIN am  ON am.id_am = v.id_am INNER JOIN typevehicule tv ON tv.id_type_vehicule = v.id_type_vehicule;`,
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

//recuperate all vehicules by id AM
const getVehiclesByAmID = async (request, response) => {
  let id_am = request.params.id;
  pool.query(
    `SELECT v.numero_chassis,v.marque,v.modele,v.couleur,v.image_vehicule,
      v.id_am,am.nom,am.prenom,am.email,am.numero_telephone,
      v.id_type_vehicule,tv.libelle,tv.tarification
      FROM vehicule v INNER JOIN am  ON am.id_am = v.id_am INNER JOIN typevehicule tv ON tv.id_type_vehicule = v.id_type_vehicule
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

//recuperate a vehicule by num_chassis
const getVehicleByChassisNum = async (request, response) => {
  let num_chassis = request.params.num_chassis;
  pool.query(
    `SELECT v.numero_chassis,v.marque,v.modele,v.couleur,v.image_vehicule,
      v.id_am,am.nom,am.prenom,am.email,am.mot_de_passe,am.numero_telephone,am.numero_telephone,
      v.id_type_vehicule,tv.libelle,tv.tarification
  FROM vehicule v INNER JOIN am  ON am.id_am = v.id_am INNER JOIN typevehicule tv ON tv.id_type_vehicule = v.id_type_vehicule
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

//recuperate all vehicules types
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

//recuperate all vehicules marques
const getVehiclesMarques = async (request, response) => {
  pool.query(
    `SELECT DISTINCT UPPER(marque) AS marque FROM vehicule;`,
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

//recuperate all vehicules models for a vehicule marque
const getVehiclesModelsByMarque = async (request, response) => {
  pool.query(
    `SELECT DISTINCT UPPER(modele) FROM vehicule where UPPER(marque)=UPPER($1);`,
    [request.params.marque],
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

//add a vehicule
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

//add a vehicule type
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

//update a vehicule
const updateVehicle = async (request, response) => {
  let num_chassis = request.params.num;
  let body = request.body;
  pool.query(
    "UPDATE vehicule SET numero_chassis=$6, marque=$2, modele=$3, couleur=$4, id_type_vehicule=$5 WHERE numero_chassis=$1;",
    [
      num_chassis,
      body.marque,
      body.modele,
      body.couleur,
      body.id_type_vehicule,
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

//update a vehicule AM
const updateVehicleAM = async (request, response) => {
  let num_chassis = request.params.num;
  pool.query(
    "UPDATE vehicule	SET id_am=$2 WHERE numero_chassis=$1;",
    [num_chassis, request.body.id_am],
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

//update a vehicule image
const updateVehicleImage = async (request, response) => {
  let num_chassis = request.params.num;
  pool.query(
    "UPDATE vehicule	SET image_vehicule=$2 WHERE numero_chassis=$1;",
    [num_chassis, request.body.image_vehicule],
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

//update a vehicule type information
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

//delete a vehicule 
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

//delete a vehicule type 
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

//recuperate all vehicules marques
const getMarques = async (request, response) => {
  pool.query(`SELECT * FROM marque;`, (error, results) => {
    if (error) {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(500);
    } else {
      response.status(200).json(results.rows);
    }
  });
};

//recuperate all vehicules models by id marque
const getModelsByIdMarque = async (request, response) => {
  let id = request.params.id;
  pool.query(
    `SELECT * FROM modele WHERE id_marque=$1;`,
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

//Export CRUD functions of vehicule
module.exports = {
  getVehicles,
  getVehiclesByAmID,
  getVehicleByChassisNum,
  getVehiclesTypes,
  getVehiclesMarques,
  getVehiclesModelsByMarque,
  addVehicle,
  addVehicleType,
  updateVehicle,
  updateVehicleAM,
  updateVehicleImage,
  updateVehicleType,
  deleteVehicule,
  deleteVehiculeType,
  getModelsByIdMarque,
  getMarques,
};
