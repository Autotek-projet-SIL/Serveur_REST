const express = require('express')
const routerMobileAuthentification = express.Router()

const controllerMobileAuthentification = require('../Controllers/ControllerMobileAuthentification.js')

routerMobileAuthentification.post('/locataire/:id',controllerMobileAuthentification.inscriptionLocataire)
module.exports= routerMobileAuthentification