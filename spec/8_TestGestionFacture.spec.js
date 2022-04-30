const axios = require("axios");
const url = "http://localhost:4000/";

describe ("Tester le service Facture", ()=> {

    it("Recuperer la liste des factures", async () => {
        await axios.get(url + "gestionfacture/facture/")
        .then((res) => {
            expect(res.data.length).toEqual(2);
          res.data.forEach((element) => {
            if (element.id === "1") {
              expect(element.tva).toEqual("500");
            }
            if (element.id === "2") {
                expect(element.tva).toEqual("200");
              }
          });
        });
      });

      it("Recuperer une facture par id", async () => {
        await axios.get(url + "gestionfacture/facture/1")
        .then
        ( (res) => {
          res.data.forEach((element) => {
            expect(element.id_facture).toEqual(1)
          });
        });
      });

      it("Recuperer une facture par id louer", async () => {
        await axios.get(url + "gestionfacture/facture_by_louer/1")
        .then
        ( (res) => {
          res.data.forEach((element) => {
            expect(element.id_louer).toEqual(1)
          });
        });
      });

    it("Ajouter un facture", async () => {
        let data = {
          id_facture: 3,
          date_facture: "2011-11-11",
          montant: 20503,
          heure: "15:25:00",
          tva: 200,
          id_louer: 2,
        };
    
        await axios.post(url + "gestionfacture/ajouter_facture/", data).then((res) => {
          expect(res.status).toEqual(200);
        });

         await axios.get(url + "gestionfacture/facture/3").then((res) => {
          expect(res.data[0].id_facture).toEqual(data.id_facture);
          expect(Date.parse(res.data[0].date_facture)).toEqual(Date.parse(data.date_facture));
          expect(res.data[0].montant).toEqual(data.montant);
          expect(res.data[0].heure).toEqual(data.heure);
          expect(res.data[0].tva).toEqual(data.tva);
          expect(res.data[0].id_louer).toEqual(data.id_louer);
        });
      });

});
