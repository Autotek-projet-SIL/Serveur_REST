const { request } = require("http")
const pool = require("../config/bd")

// Recuperer la liste des demandeinscriptions
const getDemandesInscription = async (request, response) => {
  pool.query('SELECT * FROM demandeinscription', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
// Recuperer un demandeinscription avec un id
const getDemandeInscriptionById = async (request, response) => {
  let id = request.params.id
  pool.query('SELECT * FROM demandeinscription WHERE id_demande_inscription=$1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// Ajouter un demandeinscription dans la BDD
const addDemandeInscription = async (request, response) => {
  let body = request.body
  pool.query('INSERT INTO demandeinscription(id_demande_inscription, statut, date_inscription,id_locataire)VALUES ($1, $2, $3, $4)',
    [body.id_demande_inscription, body.statut, body.date_inscription, body.id_locataire], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`La demandeinscription a été ajouté avec succés.`)
    })
}
// Mettre a jour les informations d'un demandeinscription
const updateDemandeInscription = async (request, response , status) => {
  let id_demande_inscription = request.params.id_demande
  pool.query('UPDATE demandeinscription SET statut=$2 WHERE id_demande_inscription=$1',
    [id_demande_inscription, status], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`demandeinscription  a été modifié avec succés.`)
    })
}
// Supprimer un demandeinscription
const deleteDemandeInscription = async (request, response) => {
  let id_demande_inscription=request.params.id
  pool.query('DELETE FROM demandeinscription WHERE id_demande_inscription=$1',
    [id_demande_inscription], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Le demandeinscription a été supprimé avec succés.`)
    })
}
//Exporter les fonctions du modele
module.exports = {
  getDemandeInscriptionById,
  getDemandesInscription,
  addDemandeInscription,
  updateDemandeInscription,
  deleteDemandeInscription
}