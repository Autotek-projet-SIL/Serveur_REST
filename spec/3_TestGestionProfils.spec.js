const axios = require("axios");
//-----
const url = "http://localhost:4000/";
//-----
describe("Tester le service Gestion des Profils", () => {
  //-----
  describe("Recuperer la liste des utilisateurs", () => {
    //----- 
    it("Recuperer la liste des locataires", async () => {
      await axios.get(url + "gestionprofils/locataire/").then((res) => {
        res.data.forEach((element) => {
          if (element.email === "test_locataire1@gmail.com") {
            expect(element.email).toEqual("test_locataire1@gmail.com");
          }
        });
      });
    });
    //-----
    it("Recuperer la liste des atcs", async () => {
      await axios.get(url + "gestionprofils/atc/").then((res) => {
        res.data.forEach((element) => {
          if (element.email === "test_atc1@gmail.com") {
            expect(element.email).toEqual("test_atc1@gmail.com");
          }
        });
      });
    });
    //-----
    it("Recuperer la liste des decideurs", async () => {
      await axios.get(url + "gestionprofils/decideur/").then((res) => {
        res.data.forEach((element) => {
          if (element.email === "test_decideur1@gmail.com") {
            expect(element.email).toEqual("test_decideur1@gmail.com");
          }
        });
      });
    });
    //-----
    it("Recuperer la liste des AMs", async () => {
      await axios.get(url + "gestionprofils/am/").then((res) => {
        res.data.forEach((element) => {
          if (element.email === "test_am1@gmail.com") {
            expect(element.email).toEqual("test_am1@gmail.com");
          }
        });
      });
    });
  });
  //-----
  describe("Recuperer un utilisateur par son id", () => {
    //-----
    it("Recuperer un locataire par son id", async () => {
      await axios
        .get(url + "gestionprofils/locataire/test_locataire1")
        .then((res) => {
          res.data.forEach((element) => {
            if (element.email === "test_locataire1@gmail.com") {
              expect(element.id_locataire).toEqual("test_locataire1");
            }
          });
        });
    });
    //-----
    it("Recuperer un atc par son id", async () => {
      await axios.get(url + "gestionprofils/atc/test_atc1").then((res) => {
        res.data.forEach((element) => {
          if (element.email === "test_atc1@gmail.com") {
            expect(element.id_atc).toEqual("test_atc1");
          }
        });
      });
    });
    //-----
    it("Recuperer un decideur par son id", async () => {
      await axios
        .get(url + "gestionprofils/decideur/test_decideur1")
        .then((res) => {
          res.data.forEach((element) => {
            if (element.email === "test_decideur1@gmail.com") {
              expect(element.id_decideur).toEqual("test_decideur1");
            }
          });
        });
    });
    it("Recuperer un am par son id", async () => {
      await axios.get(url + "gestionprofils/am/test_am1").then((res) => {
        res.data.forEach((element) => {
          if (element.email === "test_am1@gmail.com") {
            expect(element.id_am).toEqual("test_am1");
          }
        });
      });
    });
  });
  //-----
  describe("Modifier un utilisateur", () => {
    //-----
    it("Modifier un locataire", async () => {
      let locataire = {
        id: "test_locataire1",
        nom: "Moudi",
        prenom: "Rayane",
        numero_telephone: "0549110880",
        email: "test_locataire1@gmail.com",
        mot_de_passe: "test_locataire1",
        statut_compte: false,
        photo_identite_recto: "test_locataire1",
        photo_selfie: "test_locataire1",
        photo_identite_verso: "test_locataire1",
      };
      //-----
      await axios.put(
        url + "gestionprofils/modifier_locataire/test_locataire1",
        locataire
      );
      //-----
      await axios
        .get(
          url +
            "authentification_mobile/locataire_connexion/test_locataire1@gmail.com"
        )
        .then((res) => {
          expect(res.data[0].id_locataire).toEqual("test_locataire1");
          expect(res.data[0].nom).toEqual("Moudi");
          expect(res.data[0].prenom).toEqual("Rayane");
          expect(res.data[0].numero_telephone).toEqual("0549110880");
          expect(res.data[0].email).toEqual("test_locataire1@gmail.com");
          expect(res.data[0].statut_compte).toEqual(false);
        });
    });
    //-----
    it("Modifier un decideur", async () => {
      let decideur = {
        id: "test_decideur1",
        nom: "Razi",
        prenom: "Lilya",
        numero_telephone: "0541251311",
        email: "test_decideur1@gmail.com",
      };
      //-----
      await axios
        .put(url + "gestionprofils/modifier_decideur/test_decideur1", decideur)
        .then((res) => {
          expect(res.status).toEqual(200);
        });
      //-----
      await axios
        .get(
          url +
            "authentification_web/decideur_connexion/test_decideur1@gmail.com"
        )
        .then((res) => {
          expect(res.data[0].id_decideur).toEqual("test_decideur1");
          expect(res.data[0].nom).toEqual("Razi");
          expect(res.data[0].prenom).toEqual("Lilya");
          expect(res.data[0].numero_telephone).toEqual("0541251311");
          expect(res.data[0].email).toEqual("test_decideur1@gmail.com");
        });
    });
    //-----
    it("Modifier le mot de passe d'un decideur", async () => {
      let decideur = {
        mot_de_passe: "password",
      };
      //-----
      await axios
        .put(
          url +
            "gestionprofils/modifier_decideur/modifier_mot_de_passe/test_decideur1",
          decideur
        )
        .then((res) => {
          expect(res.status).toEqual(200);
        });
      //-----
      await axios
        .get(
          url +
            "authentification_web/decideur_connexion/test_decideur1@gmail.com"
        )
        .then((res) => {
          expect(res.data[0].mot_de_passe).toEqual("password");
        });
    });
    //-----
    it("Modifier la photo d'un decideur", async () => {
      let decideur = {
        photo_decideur: "firebase_photo",
      };
      //-----
      await axios
        .put(
          url +
            "gestionprofils/modifier_decideur/modifier_photo/test_decideur1",
          decideur
        )
        .then((res) => {
          expect(res.status).toEqual(200);
        });
      //-----
      await axios
        .get(
          url +
            "authentification_web/decideur_connexion/test_decideur1@gmail.com"
        )
        .then((res) => {
          expect(res.data[0].photo_decideur).toEqual("firebase_photo");
        });
    });
    //-----
    it("Modifier un atc", async () => {
      let atc = {
        id: "test_atc1",
        nom: "Nari",
        prenom: "Hamid",
        numero_telephone: "0549103699",
        email: "test_atc1@gmail.com",
      };
      //-----
      await axios
        .put(url + "gestionprofils/modifier_atc/test_atc1", atc)
        .then((res) => {
          expect(res.status).toEqual(200);
        });
      //-----
      await axios
        .get(url + "authentification_web/atc_connexion/test_atc1@gmail.com")
        .then((res) => {
          expect(res.data[0].id_atc).toEqual("test_atc1");
          expect(res.data[0].nom).toEqual("Nari");
          expect(res.data[0].prenom).toEqual("Hamid");
          expect(res.data[0].numero_telephone).toEqual("0549103699");
          expect(res.data[0].email).toEqual("test_atc1@gmail.com");
        });
    });
    //-----
    it("Modifier la photo d'un atc", async () => {
      let atc = {
        id: "test_atc1",
        photo_atc: "firebase_image",
      };
      //-----
      await axios
        .put(url + "gestionprofils/modifier_atc/modifier_photo/test_atc1", atc)
        .then((res) => {
          expect(res.status).toEqual(200);
        });
      //-----
      await axios
        .get(url + "authentification_web/atc_connexion/test_atc1@gmail.com")
        .then((res) => {
          expect(res.data[0].photo_atc).toEqual("firebase_image");
        });
    });
    //-----
    it("Modifier le statut d'un atc", async () => {
      let atc = {
        id: "test_atc1",
        est_root: "f",
      };
      await axios
        .put(url + "gestionprofils/modifier_atc/modifier_statut/test_atc1", atc)
        .then((res) => {
          expect(res.status).toEqual(200);
        });
      //-----
      await axios
        .get(url + "authentification_web/atc_connexion/test_atc1@gmail.com")
        .then((res) => {
          expect(res.data[0].est_root).toEqual(false);
        });
    });
    //-----
    it("Modifier le mot de passe d'un atc", async () => {
      let atc = {
        id: "test_atc1",
        mot_de_passe: "mot_de_passe",
      };
      //-----
      await axios
        .put(
          url + "gestionprofils/modifier_atc/modifier_mot_de_passe/test_atc1",
          atc
        )
        .then((res) => {
          expect(res.status).toEqual(200);
        });
      //-----
      await axios
        .get(url + "authentification_web/atc_connexion/test_atc1@gmail.com")
        .then((res) => {
          expect(res.data[0].mot_de_passe).toEqual("mot_de_passe");
        });
    });
    //-----
    it("Modifier un am", async () => {
      let am = {
        id: "test_am1",
        nom: "Yefsah",
        prenom: "Rachid",
        numero_telephone: "0549103699",
        email: "test_am1@gmail.com",
        mot_de_passe: "test_am1",
        photo_am: "test_am1",
      };
      //-----
      await axios
        .put(url + "gestionprofils/modifier_am/test_am1", am)
        .then((res) => {
          expect(res.status).toEqual(200);
        });
      //-----
      await axios
        .get(url + "authentification_mobile/am_connexion/test_am1@gmail.com")
        .then((res) => {
          expect(res.data[0].id_am).toEqual("test_am1");
          expect(res.data[0].nom).toEqual("Yefsah");
          expect(res.data[0].prenom).toEqual("Rachid");
          expect(res.data[0].numero_telephone).toEqual("0549103699");
          expect(res.data[0].email).toEqual("test_am1@gmail.com");
        });
    });
    //-----
    it("Modifier la photo d'un am", async () => {
      let am = {
        id: "test_am1",
        photo_am: "firebase_photo",
      };
      //-----
      await axios
        .put(url + "gestionprofils/modifier_am/modifier_photo/test_am1", am)
        .then((res) => {
          expect(res.status).toEqual(200);
        });
      //-----
      await axios
        .get(url + "authentification_mobile/am_connexion/test_am1@gmail.com")
        .then((res) => {
          expect(res.data[0].photo_am).toEqual("firebase_photo");
        });
    });
    //-----
    it("Modifier le mot de passe d'un am", async () => {
      let am = {
        id: "test_am1",
        mot_de_passe: "password",
      };
      //-----
      await axios
        .put(
          url + "gestionprofils/modifier_am/modifier_mot_de_passe/test_am1",
          am
        )
        .then((res) => {
          expect(res.status).toEqual(200);
        });
      //-----
      await axios
        .get(url + "authentification_mobile/am_connexion/test_am1@gmail.com")
        .then((res) => {
          expect(res.data[0].mot_de_passe).toEqual("password");
        });
    });
  });
});
