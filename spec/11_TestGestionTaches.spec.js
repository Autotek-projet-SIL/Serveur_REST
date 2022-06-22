const axios = require("axios");
const url = "http://localhost:4000/";
//------
describe("Tester le service Tache", () => {
  //-----
  it("Recuperer la liste des taches", async () => {
    await axios.get(url + "tache/get_taches/").then((res) => {
      res.data.forEach((element) => {
        if (element.id_tache === 1) {
          expect(element.objet).toEqual("test_objet1");
          expect(element.descriptif).toEqual("descriptif1");
          expect(element.etat).toEqual('en cours');
        }
      });
    });
  });
  //---------
  it("Ajouter un tache", async () => {
    let data = {
      objet: "nouvelle tache",
      descriptif: "un descriptif de tache",
      etat: "en cours",
      date_debut: "2020-05-04",
      date_fin: "2020-04-06",
      id_am: "test_am2",
      etat_avancement: 30,
      type_tache: "gestion pannes",
    };
    //-----
    await axios.post(url + "tache/ajouter_tache/", data).then((res) => {
      expect(res.status).toEqual(200);
    });
    //-----
    await axios.get(url + "tache/get_tache_by_id/3").then((res) => {
      expect(res.data[0].objet).toEqual(data.objet);
      expect(res.data[0].descriptif).toEqual(data.descriptif);
      expect(res.data[0].etat).toEqual(data.etat);
      expect(Date.parse(res.data[0].date_debut)).toEqual(
        Date.parse(data.date_debut)
      );
      expect(Date.parse(res.data[0].date_fin)).toEqual(
        Date.parse(data.date_fin)
      );
      expect(res.data[0].id_am).toEqual(data.id_am);
      expect(res.data[0].etat_avancement).toEqual(data.etat_avancement);
      expect(res.data[0].type_tache).toEqual(data.type_tache);
    });
  });
  //------
  it("Recuperer la liste des taches", async () => {
    await axios.get(url + "tache/get_taches/").then((res) => {
      res.data.forEach((element) => {
        if (element.id === 1) {
          expect(element.objet).toEqual("test_objet1");
          expect(element.descriptif).toEqual("descriptif1");
          expect(element.etat).toEqual("etat1");
        }
      });
    });
  });
  //-----
  it("Recuperer la liste des taches d'un am", async () => {
    await axios.get(url + "tache/get_tache_byidam/test_am1").then((res) => {
      res.data.forEach((element) => {
        expect(element.id_am).toEqual("test_am1");
      });
    });
  });
  //---------
  it("Modifier l'etat d'une tache", async () => {
    let tache = {
      etat: "finis",
    };
    await axios.put(url + "tache/modifier_etat_tache/3", tache).then((res) => {
      expect(res.status).toEqual(200);
    });
    //-----
    await axios.get(url + "tache/get_tache_byidam/test_am2").then((res) => {
      res.data.forEach((element) => {
        expect(element.etat).toEqual("finis");
      });
    });
  });
  //-------
  it("Modifier l'etat d'vanacement d'une tache", async () => {
    let tache = {
      etat_avancement: 100,
    };
    await axios
      .put(url + "tache/modifier_etatavancement_tache/1", tache)
      .then((res) => {
        expect(res.status).toEqual(200);
      });
    //-----
    await axios.get(url + "tache/get_tache_byidam/test_am1").then((res) => {
      res.data.forEach((element) => {
        if(element.id_tache === 1){
          expect(element.etat_avancement).toEqual(100);
        }
      });
    });
  });
});
