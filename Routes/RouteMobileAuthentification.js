const express = require('express')
const routerMobileAuthentification = express.Router()

const controllerMobileAuthentification = require('../Controllers/ControllerMobileAuthentification.js')

routerMobileAuthentification.post('/authentification_mobile/locataire_inscription/',controllerMobileAuthentification.inscriptionLocataire)
routerMobileAuthentification.get('/authentification_mobile/locataire_connexion/:email',controllerMobileAuthentification.connexionLocataire)

module.exports= routerMobileAuthentification