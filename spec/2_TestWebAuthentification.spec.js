const axios = require("axios");
const url = "http://localhost:4000/";
//-----
describe("Tester le service WebAuthentification", () => {
  //----- 
  describe("Tester la validation de la demande d'inscription d'un locataire", () => {
    let data = {
      id: "test_locataire3",
      nom: "test_locataire3",
      prenom: "test_locataire3",
      email: "test_locataire3@gmail.com",
      mot_de_passe: "test_locataire3",
      numero_telephone: "0641251311",
      photo_identite_recto: "test_locataire3",
      photo_identite_verso: "test_locataire3",
      photo_selfie: "test_locataire3",
      statut_compte: "f",
      statut: "en attente",
      date_inscription: "2022-03-03",
    };
    //-----
    beforeAll(async () => {
      await axios
        .post(url + "authentification_mobile/locataire_inscription/", data)
        .then((res) => {
          expect(res.status).toEqual(200);
        });
      //-----
      await axios
        .put(
          url +
            "authentification_web/valider_demande/test_locataire3@gmail.com/demande/3"
        )
        .then((res) => {
          expect(res.status).toEqual(200);
        });
    });
    //-----
    it("le test passe si la demande est validee", async () => {
      await axios
        .get(url + "authentification_web/demandeinscription/")
        .then((res) => {
          expect(res.status).toEqual(200);
          res.data.forEach((element) => {
            if (
              element.email === "test_locataire3@gmail.com" &&
              element.id_demande_inscription === 3
            ) {
              expect(element.statut).toEqual("validee");
            }
          });
        });
    });
    //-----
    it("le test passe si le compte du locataire a été validé", async () => {
      await axios
        .get(
          url +
            "authentification_mobile/locataire_connexion/test_locataire3@gmail.com"
        )
        .then((res) => {
          expect(res.status).toEqual(200);
          expect(res.data[0].statut_compte).toBeTrue();
        });
    });
  });
  //-----
  describe("Tester le refus de la demande d'inscription", () => {
    let data_put = {
      objet: "Carte d'identite non lisible",
      descriptif: "Votre scan est non lisible",
    };
    //-----
    beforeAll(async () => {
      await axios
        .put(
          url +
            "authentification_web/refuser_demande/test_locataire3@gmail.com/demande/3",
          data_put
        )
        .then((res) => {
          expect(res.status).toEqual(200);
        });
    });
    //-----
    it("le test passe si la demande a été refusee", async () => {
      await axios
        .get(url + "authentification_web/demandeinscription/")
        .then((res) => {
          res.data.forEach((element) => {
            if (
              element.email === "test_locataire3@gmail.com" &&
              element.id_demande_inscription == 3
            ) {
              expect(element.statut).toEqual("refusee");
            }
          });
        });
    });
  });
  //-----
  describe("Tester la connexion des decideurs", () => {
    it("Si le decideur existe le test passe", async () => {
      await axios
        .get(
          url +
            "authentification_web/decideur_connexion/test_decideur1@gmail.com"
        )
        .then((res) => {
          expect(res.data[0].email).toEqual("test_decideur1@gmail.com");
          expect(res.data[0].id_decideur).toEqual("test_decideur1");
        });
    });
  });
  //-----
  describe("Tester la connexion des atc", () => {
    it("Si l'atc existe le test passe", async () => {
      await axios
        .get(url + "authentification_web/atc_connexion/test_atc1@gmail.com")
        .then((res) => {
          expect(res.data[0].email).toEqual("test_atc1@gmail.com");
          expect(res.data[0].id_atc).toEqual("test_atc1");
        });
    });
  });
});
