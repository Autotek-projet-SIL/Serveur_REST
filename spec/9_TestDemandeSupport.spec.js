const axios = require("axios");
const url = "http://localhost:4000/";

describe("Tester le service Demande de support", () => {
    //-----
    it("Recuperer la liste des Demande de support", async () => {
      await axios.get(url + "demande_support/demande_support").then((res) => {
        expect(res.data.length).toEqual(1);
        res.data.forEach((element) => {
          if (element.id === "1") {
            expect(element.objet).toEqual("demandeSupport");
          }
        });
      });
    });
    //-----
    it("Recuperer une demande de support par id", async () => {
      await axios.get(url + "demande_support/demande_support/1").then((res) => {
        res.data.forEach((element) => {
          expect(element.id_demande_support).toEqual(1);
        });
      });
    });
    //-----
    it("Recuperer la liste des Demandes de support par id locataire", async () => {
      await axios.get(url + "demande_support/demande_support_locataire/test_locataire1").then((res) => {
        res.data.forEach((element) => {
          expect(element.id_locataire).toEqual('test_locataire1');
        });
      });
    });
    //-----
    it("Ajouter un demande de support", async () => {
      let data = {
        objet: "demandeSupport2",
        descriptif: "ceci est un autre exemple de demande de support",
        id_locataire: "test_locataire1",
      };
      //-----
      await axios
        .post(url + "demande_support/ajouter_demande_support/", data)
        .then((res) => {
          expect(res.status).toEqual(200);
        });
   //-----
      await axios.get(url + "demande_support/demande_support/2").then((res) => {
        expect(res.data[0].objet).toEqual(data.objet);
        expect(res.data[0].descriptif).toEqual(data.descriptif);
        expect(res.data[0].id_locataire).toEqual(data.id_locataire);
      });
    });

    it("Répondre à un demande de support ", async () => {
      let data = {
        response: "Ceci est une réponce de demande de support 2 ",
      };
      await axios
        .put(url + "demande_support/repondre_demande_support/2", data)
        .then((res) => {
          expect(res.status).toEqual(200);
        });
      await axios.get(url + "demande_support/demande_support/2").then((res) => {
        expect(res.data[0].reponse).toEqual(data.response);
      });
    });

  });
  