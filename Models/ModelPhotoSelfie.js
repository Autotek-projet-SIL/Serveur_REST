const { request } = require("http")
const pool = require("../config/bd")

// Ajouter une photo de selfie dans la BDD
const addPhotoSelfie = (request, response) => {
    let body = request.body
    pool.query('INSERT INTO photoselfie(id_photo_selfie, chemin, id_locataire)VALUES ($1, $2, $3)',
      [body.id_photo_selfie, body.chemin, body.id_locataire], (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`La photo de selfie a été ajoutée avec succés.`)
      })
  }

  module.exports = {addPhotoSelfie}