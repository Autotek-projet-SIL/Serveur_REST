process.env.NODE_ENV = "test_unitaire"
const app = require("../config/server_test")
const axios = require("axios");
const url = "http://localhost:4000/"

describe("Tester la validation de la demande d'inscription", () => {
    let data_insert = {
        "token": "token de firebase",
        "id": "test1",
        "nom": "test1",
        "prenom": "test1",
        "email": "test1@gmail.com",
        "mot_de_passe": "test1",
        "numero_telephone": "test1",
        "photo_identite_recto": "test1",
        "photo_identite_verso": "test1",
        "photo_selfie": "test1",
        "statut_compte": "false",
        "statut": "en attente",
        "date_inscription": "1996-12-02"
    }
    let data_put = {
        "statut_compte": "true",
        "statut": "validee",
    }
    beforeAll(
        () => {
        axios.post(url + 'authentification_mobile/locataire_inscription/', data_insert)
            .then(res => {
                console.log(`statusCodeInsertion: ${res.status}`)
            }).catch(error => {
                console.log(error)
            })
        axios.put(url + 'authentification_web/valider_demande/test1@gmail.com/demande/1', data_put)
            .then(res2 => {
                console.log(`statusCodeUpdate: ${res2.status}`)
            }).catch(error => {
                console.log(error)
            })
        });
    it("le test passe si la demande est validee", () => {
       axios
            .get(url + 'authentification_web/demandeinscription/')
            .then(res => {
                console.log(res.data)
                
                expect(res.status).toEqual(200)
                expect(res.data[0].statut).toEqual(data_put.statut)

            }).catch(error => {
                console.log(error)
            })
    });
    it("le test passe si le compte du locataire est valide", () => {
        axios
        .get(url + 'authentification_mobile/locataire_connexion/test1@gmail.com')
        .then(res => {
            console.log(res.data)
            expect(res.status).toEqual(200)
            expect(res.data[0].statut_compte).toBeTrue()
        }).catch(error => {
            console.log(error)
        })
     });

});


describe("Tester le refus de la demande d'inscription", () => {
    let data_put = {
        "statut": "refusee",
        "objet": "refus", 
        "descriptif": "refusee"
    }
    beforeAll(
        () => {
        axios.put(url + 'authentification_web/refuser_demande/test1@gmail.com/demande/1', data_put)
            .then(res2 => {
                console.log(`statusCodeUpdate: ${res2.status}`)
            }).catch(error => {
                console.log(error)
            })
        });
    it("le test passe si la demande est refusee", () => {
       axios
            .get(url + 'authentification_web/demandeinscription/')
            .then(res => {
                console.log(res.data)
                expect(res.status).toEqual(200)
                expect(res.data[0].statut).toEqual(data_put.statut)

            }).catch(error => {
                console.log(error)
            })
    });

});
