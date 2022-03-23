
const pool = require("../config/bd")

// Recuperer un justificatif avec un id
const getJustificatifById = async (request, response) => {
  let id = request.params.id
  pool.query('SELECT * FROM justificatif WHERE id_justificatif=$1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// Ajouter un justificatif dans la BDD
const addJustificatif = async (request, response) => {
  let body = request.body
  pool.query('INSERT INTO justificatif(id_justificatif, objet, descriptif, id_demande_inscription)VALUES ($1, $2, $3, $4)',
    [body.id_justificatif, body.objet, body.descriptif, body.id_demande_inscription], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Justificatif ${body.id_justificatif} associé à la demande ${body.id_demande_inscription} a été ajouté avec succés.`)
    })
}
// Mettre a jour les informations d'un justificatif
const updateJustificatif = async (request, response) => {
  let id_justificatif=request.params.id
  let body = request.body
  pool.query('UPDATE justificatif SET objet=$2, descriptif=$3, id_demande_inscription=$4 WHERE id_justificatif=$1',
    [id_justificatif, body.objet, body.descriptif, body.id_demande_inscription], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Justificatif ${body.id_justificatif} ${body.id_demande_inscription} a été modifié avec succés.`)
    })
}
//Exporter les fonctions du modele
module.exports = {
  getJustificatifById,
  addJustificatif,
  updateJustificatif,
}