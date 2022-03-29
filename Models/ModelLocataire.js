const { ConsoleReporter } = require("jasmine");
const pool=require("../config/config_pool")

// Recuperer la liste des locataires
const getLocataires = async (request, response) => {
  pool.query('SELECT * FROM locataire;', (error, results) => {
    if (error) {
      response.status(400)
      throw (error)
    }
    response.status(200).json(results.rows)
  })
}

// Recuperer un locataire avec un id
const getLocataireById = async (request, response) => {
  let id = request.params.id
  pool.query('SELECT * FROM locataire WHERE id_locataire=$1', [id], (error, results) => {
    if (error) {
      response.status(400)
      throw (error)
    }
    response.status(200).json(results.rows)
  })
}

// Recuperer un locataire avec son email
const getLocataireByEmail = async (request, response) => {
  let email = request.params.email

  pool.query('SELECT * FROM locataire WHERE email=$1', [email], (error, results) => {
    if (error) {
      response.status(400)
      throw (error)
    }
    response.status(200).json(results.rows)
  })
}

// Ajouter un locataire dans la BDD
const addLocataire = async (request, response) => {
  let body = request.body
  pool.query('INSERT INTO locataire(id_locataire, nom, prenom, numero_telephone, email, mot_de_passe,statut_compte,photo_identite_recto,photo_identite_verso,photo_selfie) VALUES ($1, $2, $3, $4, $5, $6,$7,$8,$9,$10)',
    [body.id, body.nom, body.prenom, body.numero_telephone, body.email, body.mot_de_passe, body.statut_compte, body.photo_identite_recto, body.photo_identite_verso, body.photo_selfie], (error, results) => {
      if (error) {
        response.status(400)
        throw (error)
      }
    })
}

// Mettre a jour les informations d'un locataire
const updateLocataire = (request, response) => {
  let id = request.params.id
  let body = request.body
  pool.query('UPDATE locataire SET nom=$2, prenom=$3, numero_telephone=$4, email=$5, mot_de_passe=$6,photo_identite_recto=$7,photo_identite_verso=$8,photo_selfie=$9 WHERE id_locataire=$1',
    [id, body.nom, body.prenom, body.numero_telephone, body.email, body.mot_de_passe, body.photo_identite_recto, body.photo_identite_verso, body.photo_selfie], (error, results) => {
      if (error) {
        response.status(400)
        throw (error)
      }
    })
}
const updateLocataireStatus = async (request, response, status) => {
  let id = request.params.email;
  pool.query('UPDATE locataire SET statut_compte=$2 WHERE email=$1',
    [id, status], (error, results) => {
      if (error) {
        response.status(400)
        throw (error)
      }
    })
}

// Supprimer un locataire
const deleteLocataire = async (request, response) => {
  let id = request.params.id
  pool.query('DELETE FROM locataire WHERE id_locataire=$1',
    [id], (error, results) => {
      if (error) {
        response.status(400)
        throw (error)
      }
    })
}

//Exporter les fonctions du modele
module.exports = {
  getLocataireById,
  getLocataireByEmail,
  getLocataires,
  addLocataire,
  updateLocataire,
  deleteLocataire,
  updateLocataireStatus,
  deleteLocataire
}
