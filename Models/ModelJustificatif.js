const pool = require("../config/bd")

// Recuperer un justificatif avec un id
const getJustificatifById = async (request, response) => {
  let id_justificatif = request.params.id_justificatif
  pool.query('SELECT * FROM justificatif WHERE id_justificatif=$1', [id_justificatif], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// Ajouter un justificatif dans la BDD
const addJustificatif = async (request, response) => {
  let body = request.body
  let id_demande_inscription = request.params.id_demande_inscription;
  pool.query('INSERT INTO justificatif(objet, descriptif,id_demande_inscription)VALUES ($1, $2,$3)',
    [body.objet, body.descriptif,id_demande_inscription], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200)
    })
}
// Mettre a jour les informations d'un justificatif
const updateJustificatif = async (request, response) => {
  let id_justificatif=request.params.id_justificatif
  let body = request.body
  pool.query('UPDATE justificatif SET objet=$2, descriptif=$3, id_demande_inscription=$4 WHERE id_justificatif=$1',
    [id_justificatif, body.objet, body.descriptif, body.id_demande_inscription], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200)
    })
}
//Exporter les fonctions du modele
module.exports = {
  getJustificatifById,
  addJustificatif,
  updateJustificatif,
}