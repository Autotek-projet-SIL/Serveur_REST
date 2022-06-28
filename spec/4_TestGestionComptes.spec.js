process.env.NODE_ENV = "test_unitaire";
const axios = require("axios");
const url = "http://localhost:4000/";
//-----
describe("Tester le service Gestion des Comptes", () => {
  //-----
  describe("Testet l'ajout d'un utilisateur", () => {
    //-----
    it("Tester l'ajout d'un décideur", async () => {
      let data = {
        id: "test_decideur2",
        nom: "test_decideur2",
        prenom: "test_decideur2",
        email: "test_decideur2@esi.dz",
        mot_de_passe: "test_decideur2",
        numero_telephone: "0645321321",
        photo_decideur: "test_decideur2",
      };
      //-----
      await axios
        .post(url + "gestioncomptes/ajouter_decideur/", data)
        .then((res) => {
          expect(res.status).toEqual(200);
        });
      //----- 
      await axios
        .get(
          url + "authentification_web/decideur_connexion/test_decideur2@esi.dz"
        )
        .then((res) => {
          expect(res.data[0].email).toEqual("test_decideur2@esi.dz");
          expect(res.data[0].id_decideur).toEqual("test_decideur2");
        });
    });
    //-----
    it("Tester l'ajout d'un ATC", async () => {
      //-----
      let data = {
        id: "test_atc2",
        nom: "test_atc2",
        prenom: "test_atc2",
        email: "test_atc2@esi.dz",
        mot_de_passe: "test_atc2",
        numero_telephone: "test_atc2",
        est_root: "t",
        photo_atc: "test_atc2",
      };
      //-----
      await axios
        .post(url + "gestioncomptes/ajouter_atc/", data)
        .then((res) => {
          expect(res.status).toEqual(200);
        });
      //-----
      await axios
        .get(url + "authentification_web/atc_connexion/test_atc2@esi.dz")
        .then((res) => {
          expect(res.data[0].email).toEqual("test_atc2@esi.dz");
          expect(res.data[0].id_atc).toEqual("test_atc2");
        });
    });
    //-----
    it("Tester l'ajout d'un AM", async () => {
      let data = {
        token: "test_am3",
        id: "test_am3",
        nom: "test_am3",
        prenom: "test_am3",
        email: "test_am3@gmail.com",
        mot_de_passe: "test_am3",
        numero_telephone: "0645321321",
        photo_am: "test_am3",
      };
      //-----
      await axios.post(url + "gestioncomptes/ajouter_am/", data).then((res) => {
        expect(res.status).toEqual(200);
      });
      //-----
      await axios
        .get(url + "authentification_mobile/am_connexion/test_am3@gmail.com")
        .then((res) => {
          expect(res.data[0].email).toEqual("test_am3@gmail.com");
          expect(res.data[0].id_am).toEqual("test_am3");
        });
    });
  });
  //-----
  describe("Tester la suppression d'un utilisateur", () => {
    //-----
    it("Tester la suppression d'un decideur", async () => {
      await axios
        .delete(url + "gestioncomptes/supprimer_decideur/test_decider2")
        .then((res) => {
          expect(res.status).toEqual(200);
        });
      //-----
      await axios
        .get(
          url + "authentification_web/decideur_connexion/test_decider2@esi.dz"
        )
        .then((res) => {
          expect(res.data[0]).not.toBeDefined();
        });
      //-----
    });
    //-----
    it("Tester la suppression d'un ATC", async () => {
      await axios
        .delete(url + "gestioncomptes/supprimer_atc/test_atc2")
        .then((res) => {
          expect(res.status).toEqual(200);
        });
      //-----
      await axios
        .get(url + "authentification_web/atc_connexion/test_atc2@esi.dz")
        .then((res) => {
          expect(res.data[0]).not.toBeDefined();
        });
    });
    //-----
    it("Tester la suppression d'un AM", async () => {
      await axios
        .delete(url + "gestioncomptes/supprimer_am/test_am3")
        .then((res) => {
          expect(res.status).toEqual(200);
        });
      //-----
      await axios
        .get(url + "authentification_mobile/am_connexion/test_am3@gmail.com")
        .then((res) => {
          expect(res.data[0]).not.toBeDefined();
        });
    });
    //-----
    it("Tester la suppression d'un locataire", async () => {
      await axios
        .delete(url + "gestioncomptes/supprimer_locataire/test_locataire3")
        .then((res) => {
          expect(res.status).toEqual(200);
        });
      //-----
      await axios
        .get(
          url +
            "authentification_mobile/locataire_connexion/test_locataire3@gmail.com"
        )
        .then((res) => {
          expect(res.data[0]).not.toBeDefined();
        });
    });
  });
});
