//variable declaration
const pool = require("../config/config_pool");
const log = require("../config/Logger");

// functons of am model


//get all am
const getAMs = async (request, response) => {
  pool.query(
    `
  select am.id_am, am.nom, am.prenom, am.numero_telephone, am.email, am.photo_am from am  ;
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

// Retrieve a maintenance agent with its identifier
const getAMById = async (request, response) => {
  let id = request.params.id;
  pool.query(
    `
  select am.id_am, am.nom, am.prenom, am.numero_telephone, am.email, am.photo_am from am  where am.id_am =$1;
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

// Retrieve a maintenance agent with his email
const getAMByEmail = async (request, response) => {
  let email = request.params.email;
  pool.query(
    `
  select am.id_am, am.nom, am.prenom, am.numero_telephone,am.mot_de_passe, am.email, am.photo_am from am where am.email =$1
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

// Add a maintenance agent
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

// Update the information of a maintenance agent
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

// Update a am photo
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

// Update an am's password
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

// Delete a maintenance agent
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

//export functions
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
