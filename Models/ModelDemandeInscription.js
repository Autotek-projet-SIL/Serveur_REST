const pool = require("../config/bd")

// Recuperer la liste des demandeinscriptions
const getDemandesInscription = async (request, response) => {
  let status = "en attente"
  pool.query('SELECT * FROM demandeinscription where statut = $1 order by date_inscription',[status], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
// Recuperer un demandeinscription avec un id
const getDemandeInscriptionById = async (request, response) => {
  let id_demande_inscription = request.params.id_demande_inscription
  pool.query('SELECT * FROM demandeinscription WHERE id_demande_inscription=$1', [id_demande_inscription], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// Ajouter un demandeinscription dans la BDD
const addDemandeInscription = async (request, response) => {
  let body = request.body
  pool.query('INSERT INTO demandeinscription(statut, date_inscription,id_locataire,email) VALUES ($1, $2, $3, $4)',
    [body.statut, body.date_inscription, body.id,body.email], (error, results) => {
      if (error) {
        throw error
      }
    })
}
// Mettre a jour les informations d'un demandeinscription
const updateDemandeInscription = async (request, response , status) => {
  let id_demande_inscription = request.params.id_demande_inscription
  pool.query('UPDATE demandeinscription SET statut=$2 WHERE id_demande_inscription=$1',
    [id_demande_inscription, status], (error, results) => {
      if (error) {
        throw error
      }
    })
}
// Supprimer un demandeinscription
const deleteDemandeInscription = async (request, response) => {
  let id_demande_inscription=request.params.id_demande_inscription
  pool.query('DELETE FROM demandeinscription WHERE id_demande_inscription=$1',
    [id_demande_inscription], (error, results) => {
      if (error) {
        throw error
      }
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