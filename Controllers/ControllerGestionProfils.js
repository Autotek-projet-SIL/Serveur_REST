const ServiceGestionProfils = require('../Services/ServiceGestionProfils')
const firebaseVerifyToken = require("../config/firebase.js")

const getLocataires = async (request, response) => {
    firebaseVerifyToken.verifyToken(request)
        .then(async (res) => {
            await ServiceGestionProfils.getLocataires(request, response)
        })
        .catch((err) => {
            response.status(403).send("Forbidden")
        });
}

const updateLocataire = async (request, response) => {
    firebaseVerifyToken.verifyToken(request)
        .then(async (res) => {
            await ServiceGestionProfils.updateLocataire(request, response)
            response.status(200).send("Modification locataire avec succès")
        })
        .catch((err) => {
            response.status(403).send("Forbidden")
        });
}
const getATCs = async (request, response) => {
    firebaseVerifyToken.verifyToken(request)
        .then(async (res) => {
            await ServiceGestionProfils.getATCs(request, response)
        })
        .catch((err) => {
            response.status(403).send("Forbidden")
        });
}

const updateATC = async (request, response) => {
    firebaseVerifyToken.verifyToken(request)
        .then(async (res) => {
            await ServiceGestionProfils.updateATC(request, response)
            response.status(200).send("Modification ATC avec succès")
        })
        .catch((err) => {
            response.status(403).send("Forbidden")
        });
}
const getDecideurs = async (request, response) => {
    firebaseVerifyToken.verifyToken(request)
        .then(async (res) => {
            await ServiceGestionProfils.getDecideurs(request, response)
        })
        .catch((err) => {
            response.status(403).send("Forbidden")
        });
}

const updateDecideur = async (request, response) => {
    firebaseVerifyToken.verifyToken(request)
        .then(async (res) => {
            await ServiceGestionProfils.updateDecideur(request, response)
            response.status(200).send("Modification décideur avec succès")
        })
        .catch((err) => {
            response.status(403).send("Forbidden")
        });
}
const getAMs = async (request, response) => {
    firebaseVerifyToken.verifyToken(request)
        .then(async (res) => {
            await ServiceGestionProfils.getAMs(request, response)
        })
        .catch((err) => {
            response.status(403).send("Forbidden")
        });
}

const updateAM = async (request, response) => {
    firebaseVerifyToken.verifyToken(request)
        .then(async (res) => {
            await ServiceGestionProfils.updateAM(request, response)
            response.status(200).send("Modification AM avec succès")
        })
        .catch((err) => {
            response.status(403).send("Forbidden")
        });
}



module.exports={
    getLocataires,
    updateLocataire,
    getATCs,
    updateATC,
    getDecideurs,
    updateDecideur,
    getAMs,
    updateAM
}
