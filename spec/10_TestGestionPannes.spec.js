const axios = require("axios");
const url = "http://localhost:4000/";

describe("Tester le service Panne", () => {
  it("Recuperer la liste des pannes", async () => {
    await axios.get(url + "gestionpannes/get_pannes/").then((res) => {
      expect(res.data.length).toEqual(1);
      res.data.forEach((element) => {
        if (element.id === 1) {
          expect(element.numero_chassis).toEqual("test_v1");
          expect(element.id_tache).toEqual(1);
        }
      });
    });
  });

  it("Ajouter un panne", async () => {
    let data = {
      objet: "test_objet1",
      descriptif: "descriptif_1",
      etat: "en cours",
      date_debut: "2022-05-04",
      date_fin: "2022-05-06",
      id_am: "test_am1",
      etat_avancement: 0,
      numero_chassis: "test_v1",
      type_tache: "type_tache1",
    };
    //-----
    await axios.post(url + "gestionpannes/ajouter_panne/", data).then((res) => {
      expect(res.status).toEqual(200);
    });
    //-----
    await axios.get(url + "gestionpannes/panne/2").then((res) => {
      expect(res.data[0].numero_chassis).toEqual(data.numero_chassis);
    });
  });
});
