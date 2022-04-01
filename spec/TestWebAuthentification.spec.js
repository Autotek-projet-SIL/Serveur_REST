/*process.env.NODE_ENV = "test_unitaire"
const app = require("../config/server_test")
const axios = require("axios");
const url = "http://localhost:4000/"
describe("Tester le service WebAuthentification", () => {
    describe("Tester la validation de la demande d'inscription d'un locataire", () => {
        let data_insert = {
            "token": "test_web",
            "id": "test_web",
            "nom": "test_web",
            "prenom": "test_web",
            "email": "test_web@gmail.com",
            "mot_de_passe": "test_web",
            "numero_telephone": "test_web",
            "photo_identite_recto": "test_web",
            "photo_identite_verso": "test_web",
            "photo_selfie": "test_web",
            "statut_compte": "false",
            "statut": "en attente",
            "date_inscription": "2022-03-30"
        }
        beforeAll(
            () => {
                axios.post(url + 'authentification_mobile/locataire_inscription/', data_insert)
                    .then(res => {
                        expect(res.status).toEqual(200)
                    }).catch((error) => {
                        throw new Error(error)
                    })
                axios.put(url + 'authentification_web/valider_demande/test_web@gmail.com/demande/2')
                    .then(res => {
                        expect(res.status).toEqual(200)
                    })
            })
        it("le test passe si la demande est validee", () => {
            axios
                .get(url + 'authentification_web/demandeinscription/')
                .then(res => {
                    expect(res.status).toEqual(200)
                    if (res.data.length != 0) {
                        res.data.forEach(element => {
                            if (element.email === "test_web@gmail.com" && element.id_demande_inscription === 3) {
                                expect(element.statut).toEqual("validee")
                            }
                        })
                    } else {
                        throw new Error("\n **** Erreur de validation de la demande 'inscription du locataire ****")
                    }
                })
        })
        it("le test passe si le compte du locataire a été validé", () => {
            axios
                .get(url + 'authentification_mobile/locataire_connexion/test_web@gmail.com')
                .then(res => {
                    if (res.data.length != 0) {
                        expect(res.status).toEqual(200)
                        expect(res.data[0].statut_compte).toBeTrue()
                    } else {
                        throw new Error("\n **** Erreur de validation du compte du locataire ****")
                    }
                }).catch((error) => {
                    throw new Error(error)
                })
        })
    })
    describe("Tester le refus de la demande d'inscription", () => {
        let data_put = {
            "objet": "refus",
            "descriptif": "refusee"
        }
        beforeAll(
            () => {
                axios.put(url + 'authentification_web/refuser_demande/test_web@gmail.com/demande/3', data_put)
                    .then(res => {
                        expect(res.status).toEqual(200)
                    })
            })
        it("le test passe si la demande a été refusee", () => {
            axios
                .get(url + 'authentification_web/demandeinscription/')
                .then(res => {
                    if (res.data.length != 0) {
                        res.data.forEach(element => {
                            if (element.email === "test_web@gmail.com" && element.id_demande_inscription == 3) {
                                expect(element.statut).toEqual("refusee")
                            }
                        });
                    } else {
                        throw new Error("\n **** Erreur lors du refus  de la demande d'inscription du locataire ****")
                    }
                })
        })
    })
    describe("Tester la connexion des decideurs", () => {
        it("Si le decideur existe le test passe", () => {
            axios
                .get(url + 'authentification_web/decideur_connexion/test_decideur@gmail.com')
                .then(res => {
                    if (res.data.length !== 0) {
                        expect(res.data[0].email).toEqual("test_decideur@gmail.com")
                        expect(res.data[0].id_decideur).toEqual("test_decideur")
                    } else {
                        throw new Error("\n **** Aucun decideur trouvé avec l'email ****")
                    }
                })
        });
    })
    describe("Tester la connexion des atc", () => {
        it("Si l'atc existe le test passe", () => {
            axios
                .get(url + 'authentification_web/atc_connexion/test_atc@gmail.com')
                .then(res => {
                    if (res.data.length !== 0) {
                        expect(res.data[0].email).toEqual("test_atc@gmail.com")
                        expect(res.data[0].id_atc).toEqual("test_atc")
                    } else {
                        throw new Error("\n **** Aucun atc trouvé avec l'email ****")
                    }
                })
        });
    })
})

*/