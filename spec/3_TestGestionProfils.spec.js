const axios = require("axios");
const url = "http://localhost:4000/"
describe("Tester le service Gestion des Profils", () => {
    describe("Recuperer la liste des utilisateurs", () => {
        it("Recuperer la liste des locataires", async () => {
            await axios
                .get(url + 'gestionprofils/locataire/')
                .then(res => {
                    res.data.forEach(element => {
                        if (element.email === "test_locataire@gmail.com") {
                            expect(element.email).toEqual("test_locataire@gmail.com")
                        }
                    });
                })
        });
        it("Recuperer la liste des atcs", async () => {
            await axios
                .get(url + 'gestionprofils/atc/')
                .then(res => {
                    res.data.forEach(element => {
                        if (element.email === "test_atc@gmail.com") {
                            expect(element.email).toEqual("test_atc@gmail.com")
                        }
                    });
                })
        });
        it("Recuperer la liste des decideurs", async () => {
            await axios
                .get(url + 'gestionprofils/decideur/')
                .then(res => {
                    res.data.forEach(element => {
                        if (element.email === "test_decideur@gmail.com") {
                            expect(element.email).toEqual("test_decideur@gmail.com")
                        }
                    });
                })
        });
        it("Recuperer la liste des AMs", async () => {
            await axios
                .get(url + 'gestionprofils/am/')
                .then(res => {
                    res.data.forEach(element => {
                        if (element.email === "test_am@gmail.com") {
                            expect(element.email).toEqual("test_am@gmail.com")
                        }
                    });
                })
        });
    });
    describe("Modifier un utilisateur", () => {
        it("Modifier un locataire", async () => {
            let locataire = {
                token: "token",
                id: 'test_locataire',
                nom: 'Moudi',
                prenom: 'Rayane',
                numero_telephone: '0549110880',
                email: 'test_locataire@gmail.com',
                mot_de_passe: 'mdp_test_locataire',
                statut_compte: false,
                photo_identite_recto: 'test_locataire',
                photo_selfie: 'test_locataire',
                photo_identite_verso: 'test_locataire'
            }
            await axios.put(url + 'gestionprofils/modifier_locataire/test_locataire', locataire)
            await axios.get(url + 'authentification_mobile/locataire_connexion/test_locataire@gmail.com')
                .then(res => {
                    expect(res.data[0].id_locataire).toEqual("test_locataire")
                    expect(res.data[0].nom).toEqual("Moudi")
                    expect(res.data[0].prenom).toEqual("Rayane")
                    expect(res.data[0].numero_telephone).toEqual("0549110880")
                    expect(res.data[0].email).toEqual("test_locataire@gmail.com")
                    expect(res.data[0].statut_compte).toEqual(false)
                })
        });
        it("Modifier un decideur", async () => {
            let decideur = {
                id: 'test_decideur',
                nom: 'Razi',
                prenom: 'Lilya',
                numero_telephone: '0541251311',
                email: 'test_decideur@gmail.com',
                mot_de_passe: 'abcd',
                photo_decideur: '1243'
            }
            await axios.put(url + 'gestionprofils/modifier_decideur/test_decideur', decideur).then(res => {
                expect(res.status).toEqual(200)
            })
            await axios.get(url + 'authentification_web/decideur_connexion/test_decideur@gmail.com')
                .then(res => {
                    expect(res.data[0].id_decideur).toEqual("test_decideur")
                    expect(res.data[0].nom).toEqual("Razi")
                    expect(res.data[0].prenom).toEqual("Lilya")
                    expect(res.data[0].numero_telephone).toEqual("0541251311")
                    expect(res.data[0].email).toEqual("test_decideur@gmail.com")
                    expect(res.data[0].mot_de_passe).toEqual("abcd")
                    expect(res.data[0].photo_decideur).toEqual("1243")
                })
        });
        it("Modifier un atc", async () => {
            let atc = {
                id: 'test_atc',
                nom: 'Nari',
                prenom: 'Hamid',
                numero_telephone: '0549103699',
                email: 'test_atc@gmail.com',
                mot_de_passe: 'test_atc',
                est_root: true,
                photo_atc: '123'
            }
            await axios.put(url + 'gestionprofils/modifier_atc/test_atc', atc)
                .then(res => {
                    expect(res.status).toEqual(200)
                })
            await axios.get(url + 'authentification_web/atc_connexion/test_atc@gmail.com')
                .then(res => {
                    expect(res.data[0].id_atc).toEqual("test_atc")
                    expect(res.data[0].nom).toEqual("Nari")
                    expect(res.data[0].prenom).toEqual("Hamid")
                    expect(res.data[0].numero_telephone).toEqual("0549103699")
                    expect(res.data[0].email).toEqual("test_atc@gmail.com")
                    expect(res.data[0].mot_de_passe).toEqual("test_atc")
                    expect(res.data[0].photo_atc).toEqual('123')
                })
        });
        it("Modifier un am", async () => {
            let am = {
                id: 'test_am',
                nom: 'Yefsah',
                prenom: 'Rachid',
                numero_telephone: '0549103699',
                email: 'yefsahrachid@gmail.com',
                mot_de_passe: 'test_am',
                photo_am: '123'
            }
            await axios.put(url + 'gestionprofils/modifier_am/test_am', am)
                .then(res => {
                    expect(res.status).toEqual(200)
                })
            await axios.get(url + 'authentification_mobile/am_connexion/yefsahrachid@gmail.com')
                .then(res => {
                    expect(res.data[0].id_am).toEqual("test_am")
                    expect(res.data[0].nom).toEqual("Yefsah")
                    expect(res.data[0].prenom).toEqual("Rachid")
                    expect(res.data[0].numero_telephone).toEqual("0549103699")
                    expect(res.data[0].email).toEqual("yefsahrachid@gmail.com")
                    expect(res.data[0].mot_de_passe).toEqual("test_am")
                    expect(res.data[0].photo_am).toEqual('123')
                })
        });

    });
});