process.env.NODE_ENV = "test_unitaire"
const app = require("../config/server_test")
const axios = require("axios");
const url = "http://localhost:4000/"

describe("Tester l'inscription des locataires", () => {
    let data = {
        "token": "token de firebase",
        "id": "test",
        "nom": "test",
        "prenom": "test",
        "email": "test@gmail.com",
        "mot_de_passe": "test",
        "numero_telephone": "test",
        "photo_identite_recto": "test",
        "photo_identite_verso": "test",
        "photo_selfie": "test",
        "statut_compte": "false",
        "statut": "en attente",
        "date_inscription": "1996-12-02"
    }
    beforeAll(() => {
        axios.post(url + 'authentification_mobile/locataire_inscription/', data
        )
            .then(res => {
                console.log(`statusCode: ${res.status}`)
            }).catch(error => {
                console.log(error)
            })
    });
    it("Si l'utilisateur existe le test passe", () => {
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
