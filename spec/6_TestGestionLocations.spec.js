const axios = require("axios");
const url = "http://localhost:4000/";

describe("Tester le service Gestion des Locations", () => {
  it("Ajouter une location", async () => {
    let data = {
      token: "avPraesPu0hkkvlsRaHhcGx3VSph2",
      date_debut: "2022-03-29",

      status_demande_location: "accepte",
      id_locataire: "cvbsnbwllvxnnadj1xj",
       region: "1",
      numero_chassis: "1111",
      id_facture: "1",
      id_trajet: "1",
      en_cours: true,
      point_depart: "alger",
      point_arrive: "oran",
      date_facture: "2022-03-30",
      montant: 1400.0,
      heure: "04:00",
      tva: "1450.0",
    };

    await axios
      .post(url + "gestionlocations/ajouter_location/", data)
      .then((res) => {
        expect(res.status).toEqual(200);
      });

    await axios
      .get(
        url + "gestionlocations/get_locations_by_locataire/cvbsnbwllvxnnadj1xj"
      )
      .then((res) => {
        expect(res.data[0].en_cours).toEqual(true);
      });
  });
  it("Recuperer la liste des locations en cours", async () => {
    await axios.get(url + "gestionlocations/locations_encours").then((res) => {
      res.data.forEach((element) => {
        expect(element.en_cours).toEqual(true);
      });
    });
  });

  it("Terminer une location", async () => {
    await axios.put(url + "gestionlocations/end_location/3");
    await axios.get(url + "gestionlocations/location/3").then((res) => {
   
       // expect(res.data[0].id_louer).toEqual(3);
      
      //  expect(element.en_cours).toEqual(false);
     
    });
  });

  it("Recuperer la liste des locations termines", async () => {
    await axios.get(url + "gestionlocations/locations_termines").then((res) => {
      res.data.forEach((element) => {
        expect(element.en_cours).toEqual(false);
      });
    });
  });

  it("Recuperer la liste des locations en cours d'un locataire", async () => {
    await axios
      .get(url + "gestionlocations/get_locations_by_locataire/test_locataire")
      .then((res) => {
        res.data.forEach((element) => {
          expect(element.en_cours).toEqual(true);
          expect(element.id_locataire).toEqual("test_locataire");
        });
      });
  });

 it("Modifier la date debut d'une location", async () => {
    await axios.put(url + "gestionlocations/heure_debut/3/heure/04:00");
    await axios.get(url + "gestionlocations/location/3").then((res) => {
      res.data.forEach((element) => {
        expect(element.heure_debut).toEqual("04:00");

      });
    });
  });
});
