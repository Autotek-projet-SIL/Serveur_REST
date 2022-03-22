const pool = require("../config/bd")

// Ajouter une photo d'identite d'un locataire
const addPhotoIdentite = async (request, response) => {
  let body = request.body
  pool.query(' INSERT INTO photoidentite(id_photo_identite, chemin, id_locataire)VALUES ($1, $2, $3)',
    [body.id_photo_identite, body.chemin_photo_identite, body.id_locataire], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`La photo d'identité a été ajoutée avec succés.`)
    })
}

// Avoir la photo d'identite d'un locataire
const getPhotoIdentite = async (request, response) => {
  let id = request.params.id
  pool.query('SELECT * FROM PhotoIdentite where id_locataire=$1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

//Exporter les fonctions du modele
module.exports =
{
  addPhotoIdentite,
  getPhotoIdentite
}