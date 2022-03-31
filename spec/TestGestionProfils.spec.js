/*const axios = require("axios");
const url = "http://localhost:4000/"

describe("Tester le service Gestion des Profils", () => {
    describe("Recuperer la liste des utilisateurs", () => {
        it("Recuperer la liste des locataires", () => {
            axios
                .get(url + 'gestionprofils/locataire/')
                .then(res => {
                    if (res.data.length !== 0) {
                        expect(res.data[0].email).toEqual("test_locataire@gmail.com")
                    } else {
                        throw new Error("\n **** Recuperer la liste des utilisateurs.Test Fail! ****")
                    }
                })
        });
        it("Recuperer la liste des atcs", () => {
            axios
                .get(url + 'gestionprofils/atc/')
                .then(res => {
                    if (res.data.length !== 0) {
                        expect(res.data[0].email).toEqual("test_atc@gmail.com")
                    } else {
                        throw new Error("\n **** Recuperer la liste des agents de maintenance.Test Fail! ****")
                    }
                })
        });
        it("Recuperer la liste des decideurs", () => {
            axios
                .get(url + 'gestionprofils/decideur/')
                .then(res => {
                    if (res.data.length !== 0) {
                        expect(res.data[0].id_decideur).toEqual("test_decideur")
                    } else {
                        throw new Error("\n **** Recuperer la liste des decideurs.Test Fail! ****")
                    }
                })
        });
        it("Recuperer la liste des AMs", () => {
            axios
                .get(url + 'gestionprofils/am/')
                .then(res => {
                    if (res.data.length !== 0) {
                        expect(res.data[0].id_am).toEqual("test_am")
                    } else {
                        throw new Error("\n **** Recuperer la liste des agents de maintenance.Test Fail! ****")
                    }
                })
        });
    })
    describe("Modifier un utilisateur", () => {
        it("Modifier un locataire", () => {
            let locataire = {
                token: "token",
                id_locataire: 'test_locataire',
                nom: 'TERARS',
                prenom: 'Juba',
                numero_telephone: '0549110880',
                email: 'test_locataire@gmail.com',
                mot_de_passe: 'mdp_test_locataire',
                statut_compte: false,
                photo_identite_recto: 'test_locataire',
                photo_selfie: 'test_locataire',
                photo_identite_verso: 'test_locataire'
            }
            axios.put(url + 'gestionprofils/modifier_locataire/test_locataire', locataire)
            axios.get(url + 'authentification_mobile/locataire_connexion/test_locataire@gmail.com')
                .then(res => {
                    if (res.data.length !== 0) {
                        res.data.forEach(element => {
                            if (element.id === "test_locataire" && element.email === "test_locataire@gmail.com") {
                                console.log("Hello world")
                                expect(res.data[0].id_locataire).toEqual("test_locataire")
                                expect(res.data[0].nom).toEqual("TERARS")
                                expect(res.data[0].prenom).toEqual("Juba")
                                expect(res.data[0].numero_telephone).toEqual("0549110880")
                                expect(res.data[0].email).toEqual("test_locataire@gmail.com")
                                expect(res.data[0].statut_compte).toEqual(false)
                            }
                        });
                    } else {
                        throw new Error("\n **** Modifier un locataire. Test Fail! ****")
                    }
                })
        });
        /* it("Modifier un decideur", () => {
             let decideur = {
                 id_decideur : 'test_decideur',
                 nom : 'test_decideur',
                 prenom : 'test_decideur',
                 numero_telephone:'0541251311',
                 email:'test_decideur@gmail.com',
                 mot_de_passe:'mdp_test_decideur',
                 photo_decideur:'1243'
             }
             axios.put(url + 'gestionprofils/modifier_decideur/test_decideur',decideur)
             axios.get(url + 'authentification_web/decideur_connexion/test_decideur@gmail.com')
                 .then(res => {
                     if (res.data.length !== 0) {
                         expect(res.data[0].id_decideur).toEqual("test_decideur")
                         expect(res.data[0].nom).toEqual("test_decideur")
                         expect(res.data[0].prenom).toEqual("test_decideur")
                         expect(res.data[0].numero_telephone).toEqual("0541251311")
                         expect(res.data[0].email).toEqual("test_decideur@gmail.com")
                         expect(res.data[0].mot_de_passe).toEqual("mdp_test_decideur")
                         expect(res.data[0].photo_decideur).toEqual("1243")
                     } else {
                         throw new Error("\n **** Modifier un decideur. Test Fail! ****")
                     }
                 })
         }); 
         it("Modifier un atc", () => {
             let atc = {
                 id_atc : 'test_atc',
                 nom : 'test_atc',
                 prenom : 'prenom_test_atc',
                 numero_telephone:'0549103699',
                 email:'test_atc@gmail.com',
                 mot_de_passe:'test_atc',
                 est_root:true,
                 photo_atc:'123'
             }
             axios.put(url + 'gestionprofils/modifier_atc/test_atc',atc)
             axios.get(url + 'authentification_web/atc_connexion/test_atc@gmail.com')
                 .then(res => {
                     if (res.data.length !== 0) {
                         expect(res.data[0].id_atc).toEqual("test_atc")
                         expect(res.data[0].nom).toEqual("test_atc")
                         expect(res.data[0].prenom).toEqual("prenom_test_atc")
                         expect(res.data[0].numero_telephone).toEqual("0549103699")
                         expect(res.data[0].email).toEqual("test_atc@gmail.com")
                         expect(res.data[0].mot_de_passe).toEqual("test_atc")
                         expect(res.data[0].est_root).toEqual(true)
                         expect(res.data[0].photo_atc).toEqual('123')
                     } else {
                         throw new Error("\n **** Modifier un atc. Test Fail! ****")
                     }
                 })
         }); 
    })
});
*/