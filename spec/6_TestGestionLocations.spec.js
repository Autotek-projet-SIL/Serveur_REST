const axios = require("axios");
const url = "http://localhost:4000/";

describe("Tester le service Gestion des Locations", () => {
  it("Ajouter une location", async () => {
    let data = {
      token: "avPraesPu0hkkvlsRaHhcGx3VSph2",
      id: "KWPhaKsPu0hkkhsRaHhcGx3VSph2",
      date_debut: "2022-03-29",
      status_demande_location: "accepte",
      id_locataire: "KWPhaKsPu0hkkhsRaHhcGx3VSph2",
      region: "alger",
      numero_chassis: "1111",
      id_trajet: "1",
      en_cours: true,
      point_depart: "alger",
      point_arrive: "oran",
    };

    await axios
      .post(url + "gestionlocations/ajouter_location/", data)
      .then((res) => {
        expect(res.status).toEqual(200);
      });

    await axios
      .get(
        url +
          "gestionlocations/get_locations_by_locataire/KWPhaKsPu0hkkhsRaHhcGx3VSph2"
      )
      .then((res) => {
        expect(res.data[0].en_cours).toEqual(true);
        expect(res.data[0].region).toEqual("alger");
        expect(res.data[0].date_debut).toEqual("2022-03-29T00:00:00.000Z");
      });
  });

  it("Recuperer la liste des locations ", async () => {
    await axios.get(url + "gestionlocations/locations").then((res) => {
      res.data.forEach((element) => {
        if (element.id_louer === "1")
          expect(element.status_demande_location).toEqual("accepte");
      });
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
    let data = {
      heure: "15:00",
    };
    await axios
      .put(url + "gestionlocations/end_location/3/", data)
      .then((res) => {
        expect(res.status).toEqual(200);
      });
    await axios.get(url + "gestionlocations/location/3").then((res) => {
      expect(res.data[0].id_louer).toEqual(3);

      expect(res.data[0].en_cours).toEqual(false);
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
    let data = {
      heure: "04:00",
    };
    await axios.put(
      url + "gestionlocations/update_location_heure_debut/3",
      data
    );
    await axios.get(url + "gestionlocations/location/3").then((res) => {
      res.data.forEach((element) => {
        expect(element.heure_debut).toEqual("04:00:00");
      });
    });
  });
});
