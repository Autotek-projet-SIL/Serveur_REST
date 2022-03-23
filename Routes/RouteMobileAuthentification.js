const express = require('express')
const routerMobileAuthentification = express.Router()

const controllerMobileAuthentification = require('../Controllers/ControllerMobileAuthentification.js')

routerMobileAuthentification.post('/locataire',controllerMobileAuthentification.inscriptionLocataire)
routerMobileAuthentification.get('/locataire/:email',controllerMobileAuthentification.connexionLocataire)
module.exports= routerMobileAuthentification