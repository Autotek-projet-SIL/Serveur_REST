const pool = require("../config/bd")

// Ajouter une photo de selfie d'un lcoataire
const addPhotoSelfie = async (request, response) => {
  pool.query('INSERT INTO photoselfie(id_photo_selfie, chemin, id_locataire)VALUES ($1, $2, $3)',
    [body.id_photo_selfie, body.chemin_photo_selfie, body.id_locataire], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`La photo de selfie a été ajoutée avec succés.`)
    })
}

// Avoir la photo de selfie d'un locataire
const getPhotoSelfie = async (request, response) => {
  let id_locataire = request.params.id
  pool.query('SELECT * FROM PhotoSelfie where id_locataire=$1', [id_locataire], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

//Exporter les fonctions du modele
module.exports =
{
  addPhotoSelfie,
  getPhotoSelfie
}