// variable declaration
const pool = require("../config/config_pool");
const log = require("../config/Logger");
 
// Retrieve the list of decision makers
const getDecideurs = async (request, response) => {
  pool.query(
    "SELECT id_decideur, nom, prenom, numero_telephone, email, photo_decideur FROM decideur",
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

// Retrieve a decision maker with an identifier
const getDecideurById = async (request, response) => {
  let id = request.params.id;
  pool.query(
    "SELECT id_decideur, nom, prenom, numero_telephone, email,mot_de_passe, photo_decideur FROM decideur WHERE id_decideur=$1",
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

// Retrieve a decision maker with his email
const getDecideurByEmail = async (request, response) => {
  let email = request.params.email;
  pool.query(
    "SELECT id_decideur, nom, prenom, numero_telephone, email,mot_de_passe, photo_decideur FROM decideur WHERE email=$1",
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

// Add a decision maker
const addDecideur = async (request, response) => {
  let body = request.body;
  pool.query(
    "INSERT INTO decideur(id_decideur, nom, prenom, numero_telephone, email, mot_de_passe, photo_decideur) VALUES ($1, $2, $3, $4, $5, $6, $7)",
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

// Update decision maker information
const updateDecideur = async (request, response) => {
  let id = request.params.id;
  let body = request.body;
  pool.query(
    "UPDATE decideur SET nom=$2, prenom=$3, numero_telephone=$4, email=$5 WHERE id_decideur=$1",
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

// Update the photo of a decision maker
const updateDecideurPhoto = async (request, response) => {
  let id = request.params.id;
  let body = request.body;
  pool.query(
    "UPDATE decideur SET photo_decideur=$2 WHERE id_decideur=$1",
    [id, body.photo_decideur],
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

// Update the password of a decider
const updateDecideurPassword = async (request, response) => {
  let id = request.params.id;
  let body = request.body;
  pool.query(
    "UPDATE decideur SET mot_de_passe=$2 WHERE id_decideur=$1",
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

// Delete a decider
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

//Export the CRUD functions of a decider
module.exports = {
  getDecideurById,
  getDecideurByEmail,
  getDecideurs,
  addDecideur,
  updateDecideur,
  updateDecideurPhoto,
  updateDecideurPassword,
  deleteDecideur,
};
