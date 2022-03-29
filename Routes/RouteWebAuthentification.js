const express = require('express')
const routerWebAuthentification = express.Router()

const controllerWebAuthentification = require('../Controllers/ControllerWebAuthentification.js')

routerWebAuthentification.put('/authentification_web/valider_demande/:email/demande/:id_demande_inscription',controllerWebAuthentification.validerDemandeInscription)
routerWebAuthentification.put('/authentification_web/refuser_demande/:email/demande/:id_demande_inscription',controllerWebAuthentification.refuserDemandeInscription)
routerWebAuthentification.get('/authentification_web/locataire/',controllerWebAuthentification.getLocataires)
routerWebAuthentification.get('/authentification_web/demandeinscription/',controllerWebAuthentification.getDemandesInscription)
module.exports= routerWebAuthentification