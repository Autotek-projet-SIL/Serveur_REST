const axios = require("axios");
const url = "http://localhost:4000/";

describe("Tester le service Mailing", () => {
    it("Recuperer le détail d'une facture", async () => {
        await axios.get(url + "mailing/envoyer_facture/1").then((res) => {
          res.data.forEach((element) => {
            if (element.id_facture === 1) {
              expect(element.montant).toEqual(4000);
              expect(element.date_facture).toEqual('2022-03-30');
            }
          });
        });
    });
});