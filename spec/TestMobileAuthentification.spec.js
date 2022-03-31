process.env.NODE_ENV = "test_unitaire"
const app = require("../config/server_test")
const axios = require("axios");
const url = "http://localhost:4000/"

describe("Tester le service MobileAuthentification", () => {
    describe("Tester l'inscription des locataires", () => {
        let data = {
            "token": "avPraesPu0hkkvlsRaHhcGx3VSph2",
            "id": "KWPhaKsPu0hkkhsRaHhcGx3VSph2",
            "nom": "Madani",
            "prenom": "Nassim",
            "email": "madaninassim@gmail.com",
            "mot_de_passe": "kjl28vcn",
            "numero_telephone": "0645321321",
            "photo_identite_recto": "nassim_photo",
            "photo_identite_verso": "nassim_photo",
            "photo_selfie": "nassim_photo",
            "statut_compte": "false",
            "statut": "en attente",
            "date_inscription": "2022-03-30"
        }
        beforeAll(() => {
            axios.post(url + 'authentification_mobile/locataire_inscription/', data
            )
                .then(res => {
                    expect(res.status).toEqual(200)
                })
        });
        it("Si le locataire a été inseré le test passe", () => {
            axios
                .get(url + 'authentification_mobile/locataire_connexion/madaninassim@gmail.com')
                .then(res => {
                    if (res.data.length !== 0) {
                        expect(res.data[0].email).toEqual("madaninassim@gmail.com")
                        expect(res.data[0].id_locataire).toEqual("KWPhaKsPu0hkkhsRaHhcGx3VSph2")
                    } else {
                        throw new Error("\n **** Probleme lors de l'insertion du locataire ****")
                    }
                })
        });
    })
    describe("Tester la connexion des locataires", () => {
        it("Si le locataire existe le test passe", () => {
            axios
                .get(url + 'authentification_mobile/locataire_connexion/test_locataire@gmail.com')
                .then(res => {
                    if (res.data.length !== 0) {
                        expect(res.data[0].email).toEqual("test_locataire@gmail.com")
                        expect(res.data[0].id_locataire).toEqual("test_locataire")
                    } else {
                        throw new Error("\n **** Aucun locataire trouvé avec l'email ****")
                    }
                })
        });
    })
    describe("Tester la connexion des agents de maintenance", () => {
        it("Si l'agnet de maintenance existe le test passe", () => {
            axios
                .get(url + 'authentification_mobile/am_connexion/test_am@gmail.com')
                .then(res => {
                    if (res.data.length !== 0) {
                        expect(res.data[0].email).toEqual("test_am@gmail.com")
                        expect(res.data[0].id_am).toEqual("test_am")
                    } else {
                        throw new Error("\n **** Aucun agent de maintenance trouvé avec l'email ****")
                    }
                })
        });
    })
});
