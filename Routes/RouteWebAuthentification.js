const express = require('express')
const routerWebAuthentification = express.Router()

const controllerWebAuthentification = require('../Controllers/ControllerWebAuthentification.js')

routerWebAuthentification.put('/valider_demande/:id_locataire/demande/:id_demande',controllerWebAuthentification.validerDemandeInscription)
routerWebAuthentification.put('/refuser_demande/:id_locataire/demande/:id_demande',controllerWebAuthentification.refuserDemandeInscription)
routerWebAuthentification.get('/demandes',controllerWebAuthentification.getDemandesInscription)

module.exports= routerWebAuthentification