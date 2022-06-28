const axios = require("axios");
const url = "http://localhost:4000/";
//-----
describe("Tester le service Flotte", () => {
  //-----
  it("Recuperer la liste des vehicules", async () => {
    await axios.get(url + "flotte/vehicule/").then((res) => {
      res.data.forEach((element) => {
        if (element.numero_chassis === "test_v1") {
          expect(element.marque).toEqual("test_marque1");
        }
      });
    });
  });
  //-----
  it("Recuperer la liste des vehicules d'un am", async () => {
    await axios.get(url + "flotte/vehicule_am/test_am1").then((res) => {
      res.data.forEach((element) => {
        expect(element.id_am).toEqual("test_am1");
      });
    });
  });
  //-----
  it("Recuperer la liste des marques des vehicules", async () => {
    await axios.get(url + "flotte/marquevehicule/").then((res) => {
      res.data.forEach((element) => {
        if (element.marque === "TEST_MARQUE1") {
          expect(element.marque).toEqual("TEST_MARQUE1");
        }
      });
    });
  });
  //-----
  it("Recuperer la liste des modeles d'une marque", async () => {
    //-----
    await axios.get(url + "flotte/modelevehicule/test_marque1").then((res) => {
      res.data.forEach((element) => {
        if (element.modele === "TEST_MODELE1") {
          expect(element.modele).toEqual("TEST_MODELE1");
        }
      });
    });
  });
  //-----
  it("Recuperer un véhicule avec son numéro de chassis", async () => {
    await axios.get(url + "flotte/detail_vehicule/test_v1").then((res) => {
      res.data.forEach((element) => {
        if (element.numero_chassis === "test_v1") {
          expect(element.modele).toEqual("test_modele1");
        }
      });
    });
  });
  //-----
  it("Recuperer la liste des types de vehicules", async () => {
    //-----
    await axios.get(url + "flotte/typevehicule/").then((res) => {
      res.data.forEach((element) => {
        if (element.id_type_vehicule === 1) {
          expect(element.libelle).toEqual("test_libelle1");
        }
      });
    });
  });
  //-----
  it("Ajouter un véhicule", async () => {
    let data = {
      num_chassis: "test_v3",
      marque: "marque3",
      modele: "modele3",
      couleur: "couleur3",
      id_type_vehicule: "2",
      id_am: "test_am2",
      image_vehicule: "test_img3",
      chemin_image_vehicule: "test_pathImg3",
      disponible: "true",
    };
    //-----
    await axios.post(url + "flotte/ajouter_vehicule/", data).then((res) => {
      expect(res.status).toEqual(200);
    });
    //-----
    await axios.get(url + "flotte/detail_vehicule/test_v3").then((res) => {
      expect(res.data[0].marque).toEqual("marque3");
    });
  });
  //-----
  it("Ajouter un type de véhicule", async () => {
    let data = {
      id_type_vehicule: "3",
      libelle: "test_libelle3",
      tarification: "4400",
    };
    //-----
    await axios.post(url + "flotte/ajouter_typevehicule/", data).then((res) => {
      expect(res.status).toEqual(200);
    });
    await axios.get(url + "flotte/typevehicule/").then((res) => {
      res.data.forEach((element) => {
        if (element.id_type_vehicule === 3) {
          expect(element.tarification).toEqual(4400);
        }
      });
    });
  });
  //-----
  it("Modifier un véhivule", async () => {
    let vehicule = {
      num_chassis: "test_v3",
      marque: "marque3",
      modele: "modele3",
      couleur: "couleur3",
      id_type_vehicule: "2",
    };
    //-----
    await axios.put(url + "flotte/modifier_vehicule/test_v3", vehicule);
    //-----
    await axios.get(url + "flotte/detail_vehicule/test_v3").then((res) => {
      expect(res.data[0].marque).toEqual("marque3");
      expect(res.data[0].modele).toEqual("modele3");
      expect(res.data[0].couleur).toEqual("couleur3");
      expect(res.data[0].id_type_vehicule).toEqual(2);
    });
  });
  //-----
  it("Affecter  un agent de maintenance a un vehicule", async () => {
    let data = {
      id_am: "test_am2",
    };
    await axios.put(url + "flotte/modifier_am_vehicule/test_v3", data);
    await axios.get(url + "flotte/detail_vehicule/test_v3").then((res) => {
      expect(res.data[0].id_am).toEqual(data.id_am);
    });
  });
  //-----
  it("Modifier l'image d'un vehicule", async () => {
    let data = {
      image_vehicule: "img3",
    };
    await axios.put(url + "flotte/modifier_image_vehicule/test_v3", data);
    await axios.get(url + "flotte/detail_vehicule/test_v3").then((res) => {
      expect(res.data[0].image_vehicule).toEqual(data.image_vehicule);
    });
  });
  //-----
  it("Modifier un type de vehicule", async () => {
    let typevehicule = {
      id_type_vehicule: "3",
      libelle: "test_libelle3",
      tarification: "4600",
    };
    //-----
    await axios.put(url + "flotte/modifier_typevehicule/3", typevehicule);
    //-----
    await axios.get(url + "flotte/typevehicule/").then((res) => {
      res.data.forEach((element) => {
        if (element.id_type_vehicule === 3) {
          expect(element.libelle).toEqual("test_libelle3");
          expect(element.tarification).toEqual(4600);
        }
      });
    });
  });
  //-----
  it("Supprimer un véhicule", async () => {
    await axios
      .delete(url + "flotte/supprimer_vehicule/test_v3")
      .then((res) => {
        expect(res.status).toEqual(200);
      });
    //-----
  });
  it("Supprimer un type de vehicule", async () => {
    await axios.delete(url + "flotte/supprimer_typevehicule/3").then((res) => {
      expect(res.status).toEqual(200);
    });
    //-----
    await axios.get(url + "flotte/typevehicule/").then((res) => {
      res.data.forEach((element) => {
        expect(element.id_type_vehicule).not.toEqual(3);
      });
    });
  });
});
 