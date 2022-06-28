// Declaration of variables
const pool = require("../config/config_pool");
const log = require("../config/Logger");

//Retrieve the list of fleet vehicles
const getVehicles = async (request, response) => {
  pool.query(
    `SELECT v.numero_chassis,v.marque,v.modele,v.couleur,v.image_vehicule,
        v.id_am,am.nom,am.prenom,am.email,am.numero_telephone,
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

// Retrieve the list of vehicles assigned to an AM
const getVehiclesByAmID = async (request, response) => {
  let id_am = request.params.id;
  pool.query(
    `SELECT v.numero_chassis,v.marque,v.modele,v.couleur,v.image_vehicule,
      v.id_am,am.nom,am.prenom,am.email,am.numero_telephone,
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

// Retrieve a vehicle with its chassis number
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

// Retrieve the path of the image of a vehicle with its chassis number
async function getVehicleImagePathByChassisNum(request, response) {
  try {
    let Results = await pool.query(
      `SELECT chemin_image_vehicule FROM vehicule WHERE numero_chassis = $1;`,[request.params.num],
    );
    response.codestatus = 200;
    return Results.rows[0].chemin_image_vehicule;
  } catch (error) {
    response.sendStatus(500);
  }
};

// Retrieve the list of vehicle types
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

// Retrieve the list of vehicle brands
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

// Retrieve vehicle models for a brand
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

// Add a vehicle
const addVehicle = async (request, response) => {
  let body = request.body;
  pool.query(
    "INSERT INTO vehicule(numero_chassis, marque, modele, couleur, id_type_vehicule, id_am, image_vehicule, chemin_image_vehicule) VALUES ($1, $2, $3, $4, $5, $6, $7,$8);",
    [
      body.num_chassis,
      body.marque,
      body.modele,
      body.couleur,
      body.id_type_vehicule,
      body.id_am,
      body.image_vehicule,
      body.location_image
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

// Add a type of vehicle
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

// Update vehicle information
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

// Assign am to a vehicle
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

// Modify the image of a vehicle
const updateVehicleImage = async (request, response) => {
  let num_chassis = request.params.num;

  pool.query(
    "UPDATE vehicule	SET image_vehicule=$2,chemin_image_vehicule=$3 WHERE numero_chassis=$1;",
    [num_chassis, request.body.image_vehicule,request.body.location_image],
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

// Update vehicle type information
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

// Delete a vehicle
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

// Delete a type of vehicle
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

//Retrieve the list of vehicle brands
const getMarques = async (request, response) => {
  pool.query(`SELECT * from marque;`, (error, results) => {
    if (error) {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(500);
    } else {
      response.status(200).json(results.rows);
    }
  });
};
 
//Retrieve the list of models of a brand by brand id
const getModelsByIdMarque = async (request, response) => {
  let id = request.params.id;
  pool.query(
    `SELECT * from modele where id_marque=$1;`,
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

//Export vehicle CRUD functions
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
  getVehicleImagePathByChassisNum
};
