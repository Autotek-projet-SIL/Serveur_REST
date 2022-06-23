const axios = require("axios");
const url = "http://localhost:4000/";
//-----
describe("Tester le service Statististiques", () => {
  //-----
  it("Recuperer la liste des factures", async () => {
    await axios.get(url + "statistiques/getFactures").then((res) => {
      expect(res.data.length).toEqual(2);
    });
  });
  //-----
  it("Recuperer la liste des demandes d'inscription", async () => {
    await axios.get(url + "statistiques/getDemandeInscription").then((res) => {
      res.data.forEach((element) => {
        if (element.date_inscription === "2022-03-03")
          expect(element.statut).toEqual("refusee");
      });
    });
  });
  //-----
  it("Recuperer la liste des locations", async () => {
    await axios.get(url + "statistiques/get_locations").then((res) => {
      res.data.forEach((element) => {
        if (element.id_louer === 1)
          expect(element.status_demande_location).toEqual("accepte");
      });
    });
  });
  //-----
  it("Recuperer la liste des locations rejetees", async () => {
    await axios.get(url + "statistiques/getLocationsRejetes").then((res) => {
      res.data.forEach((element) => {
        if (element.id_louer == 2) {
          console.log(element);
          expect(element.status_demande_location).toEqual("rejete");
        }
      });
    });
  });

  it("Recuperer la liste des locations acceptees", async () => {
    await axios.get(url + "statistiques/getLocationsAcceptes").then((res) => {
      res.data.forEach((element) => {
        if (element.id_louer === 1) {
          expect(element.status_demande_location).toEqual("accepte");
        }
      });
    });
  });
});
