process.env.NODE_ENV = "test_unitaire";
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
const app = require("../config/server_test");
const axios = require("axios");
const url = "http://localhost:4000/";
 
//-----
describe("Tester le service MobileAuthentification", () => {
  //-----
  describe("Tester l'inscription des locataires", () => {
    let data = {
      id: "test_locataire2",
      nom: "test_locataire2",
      prenom: "test_locataire2",
      email: "test_locataire2@gmail.com",
      mot_de_passe: "test_locataire2",
      numero_telephone: "0645321321",
      photo_identite_recto: "test_locataire2",
      photo_identite_verso: "test_locataire2",
      photo_selfie: "test_locataire2",
      statut_compte: "f",
      statut: "en attente",
      date_inscription: "2022-03-30",
    };
    //-----
    beforeAll(async () => {
      await axios
        .post(url + "authentification_mobile/locataire_inscription/", data)
        .then((res) => {
          expect(res.status).toEqual(200);
        });
    });
    //-----
    it("Si le locataire a été inseré le test passe", async () => {
      await axios
        .get(
          url +
            "authentification_mobile/locataire_connexion/test_locataire2@gmail.com"
        )
        .then((res) => {
          expect(res.data[0].email).toEqual("test_locataire2@gmail.com");
          expect(res.data[0].id_locataire).toEqual("test_locataire2");
        });
    });
  });
  //-----
  describe("Tester la connexion des locataires", () => {
    //-----
    it("Si le locataire existe le test passe", async () => {
      await axios
        .get(
          url +
            "authentification_mobile/locataire_connexion/test_locataire2@gmail.com"
        )
        .then((res) => {
          expect(res.data[0].email).toEqual("test_locataire2@gmail.com");
          expect(res.data[0].id_locataire).toEqual("test_locataire2");
        });
    });
  });
  //----
  describe("Tester la connexion des agents de maintenance", () => {
    //----
    it("Si l'agnet de maintenance existe le test passe", async () => {
      await axios
        .get(url + "authentification_mobile/am_connexion/test_am1@gmail.com")
        .then((res) => {
          expect(res.data[0].email).toEqual("test_am1@gmail.com");
          expect(res.data[0].id_am).toEqual("test_am1");
        });
    });
  });
});
