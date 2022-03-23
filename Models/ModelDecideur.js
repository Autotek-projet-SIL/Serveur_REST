const { request } = require("http")
const pool = require("../config/bd")

// Recuperer la liste des décideurs
const getDecideurs = async (request, response) => {
  pool.query('SELECT * FROM decideur', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
// Recuperer un décideur avec un id
const getDecideurById = async (request, response) => {
  let id = request.params.id
  pool.query('SELECT * FROM decideur WHERE id_decideur=$1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
// Recuperer un décideur avec son email
const getDecideurByEmail = async (request, response) => {
  let email = request.params.email
  pool.query('SELECT * FROM decideur WHERE email=$1', [email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
// Ajouter un décideur dans la BDD
const addDecideur = async (request, response) => {
  let body = request.body
  pool.query('INSERT INTO decideur(id_decideur, nom, prenom, numero_telephone, email, mot_de_passe)VALUES ($1, $2, $3, $4, $5, $6)',
    [body.id_decideur, body.nom, body.prenom, body.numero_telephone, body.email, body.mot_de_passe], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Decideur ${body.nom} ${body.prenom} a été ajouté avec succés.`)
    })
}
// Mettre a jour les informations d'un decideur
const updateDecideur = async (request, response) => {
  let id_decideur=request.params.id
  let body = request.body
  pool.query('UPDATE decideur SET nom=$2, prenom=$3, numero_telephone=$4, email=$5, mot_de_passe=$6 WHERE id_decideur=$1',
    [id_decideur, body.nom, body.prenom, body.numero_telephone, body.email, body.mot_de_passe], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Decideur ${body.nom} ${body.prenom} a été modifié avec succés.`)
    })
}
// Supprimer un decideur
const deleteDecideur = async (request, response) => {
  let id_decideur=request.params.id
  pool.query('DELETE FROM decideur WHERE id_decideur=$1',
    [id_decideur], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Le decideur a été supprimé avec succés.`)
    })
}
//Exporter les fonctions du modele
module.exports = {
  getDecideurById,
  getDecideurByEmail,
  getDecideurs,
  addDecideur,
  updateDecideur,
  deleteDecideur
}