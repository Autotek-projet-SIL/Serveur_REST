const express = require('express')
const routerMobileAuthentification = express.Router()

const controllerMobileAuthentification = require('../Controllers/ControllerMobileAuthentification.js')

routerMobileAuthentification.post('/locataire',controllerMobileAuthentification.inscriptionLocataire)
routerMobileAuthentification.post('/photoIdentite',controllerMobileAuthentification.addPhotoIdentite)
routerMobileAuthentification.post('/photoSelfie',controllerMobileAuthentification.addPhotoSelfie)
module.exports= routerMobileAuthentification