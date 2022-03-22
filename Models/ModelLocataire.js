const pool = require("../config/bd")

// Recuperer la liste des locataires
const getLocataires = async (request, response) => {
  pool.query('SELECT * FROM locataire', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// Recuperer un locataire avec un id
const getLocataireById = async (request, response) => {
  let id = request.params.id
  pool.query('SELECT * FROM locataire WHERE id_locataire=$1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// Recuperer un locataire avec son email
const getLocataireByEmail = async (request, response) => {
  let email = request.params.email
  pool.query('SELECT * FROM locataire WHERE email=$1', [email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
// Ajouter un locataire dans la BDD
const addLocataire = async (request, response) => {
  let body = request.body
  pool.query('INSERT INTO locataire(id_locataire, nom, prenom, numero_telephone, email, mot_de_passe,statut_compte)VALUES ($1, $2, $3, $4, $5, $6,$7)',
    [body.id, body.nom, body.prenom, body.numero_telephone, body.email, body.mot_de_passe, body.statut_compte], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Locataire ${body.nom} ${body.prenom} a été ajouté avec succés.`)
    })
}

// Mettre a jour les informations d'un locataire
const updateLocataire = (request, response) => {
  let id = request.params.id
  let body = request.body
  pool.query('UPDATE locataire SET nom=$2, prenom=$3, numero_telephone=$4, email=$5, mot_de_passe=$6, statut_compte=$7 WHERE id_locataire=$1',
    [id, body.nom, body.prenom, body.numero_telephone, body.email, body.mot_de_passe], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Locataire ${body.nom} ${body.prenom} a été modifié avec succés.`)
    })
}

// Supprimer un locataire
const deleteLocataire = (request, response) => {
  let id = request.params.id
  pool.query('DELETE FROM locataire WHERE id_locataire=$1',
    [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Le locataire a été supprimé avec succés.`)
    })
}

//Exporter les fonctions du modele
module.exports = {
  getLocataireById,
  getLocataireByEmail,
  getLocataires,
  addLocataire,
  updateLocataire,
  deleteLocataire
}