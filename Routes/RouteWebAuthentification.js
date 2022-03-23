const express = require('express')
const routerWebAuthentification = express.Router()

const controllerWebAuthentification = require('../Controllers/ControllerWebAuthentification.js')

routerWebAuthentification.put('/valider_demande/:id/demande/:id_demande_inscription',controllerWebAuthentification.validerDemandeInscription)
routerWebAuthentification.put('/refuser_demande/:id/demande/:id_demande_inscription',controllerWebAuthentification.refuserDemandeInscription)
routerWebAuthentification.get('/demandesInscription',controllerWebAuthentification.getDemandesInscription)

module.exports= routerWebAuthentification