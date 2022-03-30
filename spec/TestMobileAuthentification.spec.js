process.env.NODE_ENV = "test_unitaire"
const app = require("../config/server_test")
const axios = require("axios");
const url = "http://localhost:4000/"
console.log("=========================================================")
console.log("           Tests service MobileAuthentification")
console.log("=========================================================")
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
                expect(res.statut).toEqual(200)
            })
    });
    it("Si l'utilisateur a été inserée le test passe", () => {
       axios
            .get(url + 'authentification_mobile/locataire_connexion/test@gmail.com')
            .then(res => {
                if(res.length!==0){
                    console.log(res.data)
                    expect(res.data[0].email).toEqual("test@gmail.com")
                }else{
                    
                }

            }).catch(error => {
                console.log(error)
            })
    });
});
