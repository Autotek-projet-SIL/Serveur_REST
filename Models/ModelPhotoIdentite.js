const { request } = require("http")
const pool = require("../config/bd")

// Ajouter une photo d'identite dans la BDD
const addPhotoIdentite = (request, response) => {
    let body = request.body
    pool.query('INSERT INTO photoidentite(id_photo_identite, chemin, id_locataire)VALUES ($1, $2, $3)',
      [body.id_photo_identite, body.chemin, body.id_locataire], (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`La photo d'identité a été ajoutée avec succés.`)
      })
  }

  module.exports = {addPhotoIdentite}