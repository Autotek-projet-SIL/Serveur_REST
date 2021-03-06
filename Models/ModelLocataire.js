// Declaration of variables
const pool = require("../config/config_pool");
const log = require("../config/Logger");

// Retrieve the list of tenants
const getLocataires = async (request, response) => {
  pool.query(
    `SELECT l.id_locataire,l.nom,l.prenom,l.numero_telephone,l.mot_de_passe,l.email,l.statut_compte,l.photo_identite_recto,l.photo_identite_verso,l.photo_selfie,d.id_demande_inscription,d.statut,d.date_inscription,j.id_justificatif,j.objet,j.descriptif
  FROM locataire l  inner join demandeinscription d ON d.id_locataire = l.id_locataire
  left join justificatif j ON j.id_demande_inscription = d.id_demande_inscription;`,
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
 
// Retrieve a tenant with an identifier
const getLocataireById = async (request, response) => {
  let id = request.params.id;
  pool.query(
    `SELECT l.id_locataire,l.nom,l.prenom,l.numero_telephone,l.email,l.mot_de_passe,l.statut_compte,l.photo_identite_recto,l.photo_identite_verso,l.photo_selfie,d.id_demande_inscription,d.statut,d.date_inscription,j.id_justificatif,j.objet,j.descriptif
  FROM locataire l  inner join demandeinscription d ON d.id_locataire = l.id_locataire
  left join justificatif j ON j.id_demande_inscription = d.id_demande_inscription
  WHERE l.id_locataire=$1;`,
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

// Retrieve a tenant with his email
const getLocataireByEmail = async (request, response) => {
  let email = request.params.email;
  pool.query(
    `
  SELECT l.id_locataire,l.nom,l.prenom,l.numero_telephone,l.email,l.statut_compte,l.mot_de_passe,l.photo_identite_recto,l.photo_identite_verso,l.photo_selfie,d.id_demande_inscription,d.statut,d.date_inscription,j.id_justificatif,j.objet,j.descriptif
  FROM locataire l  inner join demandeinscription d ON d.id_locataire = l.id_locataire
  left join justificatif j ON j.id_demande_inscription = d.id_demande_inscription
  where l.email =$1;
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

// Add a tenant
const addLocataire = async (request, response) => {
  let body = request.body;
  await pool.query(
    "INSERT INTO locataire(id_locataire, nom, prenom, numero_telephone, email, mot_de_passe,statut_compte,photo_identite_recto,photo_identite_verso,photo_selfie) VALUES ($1, $2, $3, $4, $5, $6,$7,$8,$9,$10)",
    [
      body.id,
      body.nom,
      body.prenom,
      body.numero_telephone,
      body.email,
      body.mot_de_passe,
      body.statut_compte,
      body.photo_identite_recto,
      body.photo_identite_verso,
      body.photo_selfie,
    ],
    (error, results) => {
      if (error) {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.statusCode = 500;
      }
    }
  );
};

// Update tenant information
const updateLocataire = async (request, response) => {
  let id = request.params.id;
  let body = request.body;
  pool.query(
    "UPDATE locataire SET nom=$2, prenom=$3, numero_telephone=$4, email=$5, mot_de_passe=$6,photo_identite_recto=$7,photo_identite_verso=$8,photo_selfie=$9 WHERE id_locataire=$1",
    [
      id,
      body.nom,
      body.prenom,
      body.numero_telephone,
      body.email,
      body.mot_de_passe,
      body.photo_identite_recto,
      body.photo_identite_verso,
      body.photo_selfie,
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

// Update the status of a tenant's account
const updateLocataireStatus = async (request, response, status) => {
  let id = request.params.email;
  pool.query(
    "UPDATE locataire SET statut_compte=$2 WHERE email=$1",
    [id, status],
    (error, results) => {
      if (error) {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.statusCode = 500;
      }
      response.sendStatus(response.statusCode);
    }
  );
};

// Update the stripe id of a tenant
const updateLocataireStripeId = async (email, stripe_id) => {
  await pool.query("UPDATE locataire SET stripe_id=$2 WHERE email=$1", [
    email,
    stripe_id,
  ]);
  return;
};

// Retrieve the stripe id of a tenant
const getLocaireStripeIdByEmail = async (email) => {
  let Results = await pool.query(
    "Select stripe_id from locataire where email=$1",
    [email]
  );
  return Results.rows[0];
};

//delete locataire
const deleteLocataire = async (request, response) => {
  let id = request.params.id;
  pool.query(
    "DELETE FROM locataire WHERE id_locataire=$1",
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

//Export tenant CRUD functions
module.exports = {
  getLocataireById,
  getLocataireByEmail,
  getLocataires,
  addLocataire,
  updateLocataire,
  deleteLocataire,
  updateLocataireStatus,
  deleteLocataire,
  getLocaireStripeIdByEmail,
  updateLocataireStripeId,
};
