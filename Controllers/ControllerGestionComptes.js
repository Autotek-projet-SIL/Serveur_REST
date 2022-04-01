const ServiceGestionComptes = require('../Services/ServiceGestionComptes')
const firebaseVerifyToken = require("../config/firebase.js")



const deleteLocataire = async (request, response) => {
   await firebaseVerifyToken.verifyToken(request)
        .then(async (res) => {
            await ServiceGestionComptes.deleteLocataire(request, response)
            response.status(200).json("Delete successfull")
        })
        .catch((err) => {
            response.status(403).send("Forbidden")
        });
}

const deleteATC = async (request, response) => {
    await firebaseVerifyToken.verifyToken(request)
         .then(async (res) => {
             await ServiceGestionComptes.deleteATC(request, response)
             response.status(200).json("Delete successfull")
         })
         .catch((err) => {
             response.status(403).send("Forbidden")
         });
 }

 const deleteAM = async (request, response) => {
    await firebaseVerifyToken.verifyToken(request)
         .then(async (res) => {
             await ServiceGestionComptes.deleteAM(request, response)
             response.status(200).json("Delete successfull")
         })
         .catch((err) => {
             response.status(403).send("Forbidden")
         });
 }

 const deleteDecideur = async (request, response) => {
    await firebaseVerifyToken.verifyToken(request)
         .then(async (res) => {
             await ServiceGestionComptes.deleteDecideur(request, response)
             response.status(200).json("Delete successfull")
         })
         .catch((err) => {
             response.status(403).send("Forbidden")
         });
 }

 const addLocataire = async (request, response) => {
    await firebaseVerifyToken.verifyToken(request)
         .then(async (res) => {
             await ServiceGestionComptes.addLocataire(request, response)
             response.status(200).json("Adding successfull")
         })
         .catch((err) => {
             response.status(403).send("Forbidden")
         });
 }

 const addDecideur = async (request, response) => {
    await firebaseVerifyToken.verifyToken(request)
         .then(async (res) => {
             await ServiceGestionComptes.addDecideur(request, response)
             response.status(200).json("Adding successfull")
         })
         .catch((err) => {
             response.status(403).send("Forbidden")
         });
 }

 const addATC = async (request, response) => {
    await firebaseVerifyToken.verifyToken(request)
         .then(async (res) => {
             await ServiceGestionComptes.addATC(request, response)
             response.status(200).json("Adding successfull")
         })
         .catch((err) => {
             response.status(403).send("Forbidden")
         });
 }

 const addAM = async (request, response) => {
    await firebaseVerifyToken.verifyToken(request)
         .then(async (res) => {
             await ServiceGestionComptes.addAM(request, response)
             response.status(200).json("Adding successfull")
         })
         .catch((err) => {
             response.status(403).send("Forbidden")
         });
 }






//Exporter les fonctions  
module.exports =
{
    deleteDecideur,
    deleteAM,
    deleteATC,
    deleteLocataire,
    addDecideur,
    addAM,
    addATC,
    addLocataire  

}