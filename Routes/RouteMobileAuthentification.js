const express = require('express')
const routerMobileAuthentification = express.Router()

const controllerMobileAuthentification = require('../Controllers/ControllerMobileAuthentification.js')

routerMobileAuthentification.post('/authentification_mobile/locataire_inscription/',controllerMobileAuthentification.inscriptionLocataire)
routerMobileAuthentification.get('/authentification_mobile/locataire_connexion/:email',controllerMobileAuthentification.connexionLocataire)
routerMobileAuthentification.get('/authentification_mobile/am_connexion/:email',controllerMobileAuthentification.connexionAM)
routerMobileAuthentification.post('/authentification_mobile/envoyer_demande_inscription/',controllerMobileAuthentification.envoyerDemandeInscription)
module.exports= routerMobileAuthentification