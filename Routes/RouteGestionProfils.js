const express = require('express')
const routerGestionProfils= express.Router()

const controllerGestionProfils= require('../Controllers/ControllerGestionProfils')

routerGestionProfils.get('/gestionprofils/locataire/',controllerGestionProfils.getLocataires)
routerGestionProfils.put('/gestionprofils/modifier_locataire/:id',controllerGestionProfils.updateLocataire)
routerGestionProfils.get('/gestionprofils/atc/',controllerGestionProfils.getATCs)
routerGestionProfils.put('/gestionprofils/modifier_atc/:id',controllerGestionProfils.updateATC)
routerGestionProfils.get('/gestionprofils/decideur/',controllerGestionProfils.getDecideurs)
routerGestionProfils.put('/gestionprofils/modifier_decideur/:id',controllerGestionProfils.updateDecideur)
routerGestionProfils.get('/gestionprofils/am/',controllerGestionProfils.getAMs)
routerGestionProfils.put('/gestionprofils/modifier_am/:id',controllerGestionProfils.updateAM)

module.exports= routerGestionProfils