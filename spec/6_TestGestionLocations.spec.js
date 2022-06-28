const axios = require("axios");
const url = "http://localhost:4000/";
//-----
describe("Tester le service Gestion des Locations", () => {
  //-----
  it("Ajouter une location", async () => {
    let data = {
      token: "token de firebase",
      id_sender: "test",
      date_debut: "2022-12-12",
      status_demande_location: "accepte",
      id_locataire: "test_locataire2",
      region: "alger",
      numero_chassis: "test_v1",
      en_cours: true,
      latitude_depart: 5,
      latitude_arrive: 5,
      longitude_depart: 5,
      longitude_arrive: 10,
      suivi_location: "bloque",
    };
    //-----
    await axios
      .post(url + "gestionlocations/ajouter_location/", data)
      .then((res) => {
        expect(res.status).toEqual(200);
      });
    //-----
    await axios
      .get(url + "gestionlocations/get_locations_by_locataire/test_locataire2")
      .then((res) => {
        expect(res.data[0].en_cours).toEqual(true);
        expect(res.data[0].region).toEqual("alger");
        expect(res.data[0].date_debut).toEqual("2022-12-12T00:00:00.000Z");
      });
  });
  //-----
  it("Recuperer la liste des locations ", async () => {
    await axios.get(url + "gestionlocations/locations").then((res) => {
      res.data.forEach((element) => {
        if (element.id_louer === 1)
          expect(element.status_demande_location).toEqual("accepte");
      });
    });
  });
  //-----
  it("Recuperer la liste des locations en cours", async () => {
    await axios.get(url + "gestionlocations/locations_encours").then((res) => {
      res.data.forEach((element) => {
        expect(element.en_cours).toEqual(true);
      });
    });
  });
  //----- 
  it("Terminer une location", async () => {
    let data = {
      heure: "15:00",
      numero_chassis: "0123456788",
      date_facture: "2021-09-29",
      montant: 5555,
      tva: 17,
      id_louer: 2,
    };
    await axios
      .put(url + "gestionlocations/end_location/2", data)
      .then((res) => {
        expect(res.status).toEqual(200);
      });
    await axios.get(url + "gestionlocations/location/2").then((res) => {
      expect(res.data[0].en_cours).toEqual(false);
    });
  });
  //-----
  it("Recuperer la liste des locations termines", async () => {
    await axios.get(url + "gestionlocations/locations_termines").then((res) => {
      res.data.forEach((element) => {
        expect(element.en_cours).toEqual(false);
      });
    });
  });
  //-----
  it("Recuperer la liste des locations en cours d'un locataire", async () => {
    await axios
      .get(url + "gestionlocations/get_locations_by_locataire/test_locataire1")
      .then((res) => {
        res.data.forEach((element) => {
          expect(element.en_cours).toEqual(true);
          expect(element.id_locataire).toEqual("test_locataire1");
        });
      });
  });
  //-----
  it("Modifier la date debut d'une location", async () => {
    let data = {
      heure: "04:00",
    };
    //-----
    await axios.put(
      url + "gestionlocations/update_location_heure_debut/2",
      data
    );
    //-----
    await axios.get(url + "gestionlocations/location/2").then((res) => {
      res.data.forEach((element) => {
        expect(element.heure_debut).toEqual("04:00:00");
      });
    });
  });
});
