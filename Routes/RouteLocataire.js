const express = require('express')
const routerLocataire= express.Router()

const controllerLocataire= require('../Controllers/ControllerLocataire')

routerLocataire.get('/locataire/:email',controllerLocataire.getLocataireByEmail)
routerLocataire.delete('/locataire/:id',controllerLocataire.deleteLocataire)
routerLocataire.get('/locataire/',controllerLocataire.getLocataires)
routerLocataire.put('/locataire/:id',controllerLocataire.updateLocataire)

module.exports= routerLocataire