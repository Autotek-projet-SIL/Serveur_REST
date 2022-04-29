const axios = require("axios");
const url = "http://localhost:4000/";

describe("Tester le service Flotte", () => {
  it("Recuperer la liste des vehicules", async () => {
    await axios.get(url + "flotte/vehicule/").then((res) => {
      res.data.forEach((element) => {
        if (element.numero_chassis === "test_v1") {
          expect(element.marque).toEqual("test_marque1");
        }
      });
    });
  });
  it("Recuperer la liste des vehicules d'un am", async () => {
    await axios.get(url + "flotte/vehicule_am/test_am").then((res) => {
      res.data.forEach((element) => {
        expect(element.id_am).toEqual("test_am");
      });
    });
  });
  it("Recuperer un véhicule avec son numéro de chassis", async () => {
    await axios.get(url + "flotte/detail_vehicule/test_v1").then((res) => {
      res.data.forEach((element) => {
        if (element.numero_chassis === "test_v1") {
          expect(element.modele).toEqual("test_modele1");
        }
      });
    });
  });
  it("Recuperer la liste des types des vehicules", async () => {
    await axios.get(url + "flotte/typevehicule/").then((res) => {
      res.data.forEach((element) => {
        if (element.id_type_vehicule === "1") {
          expect(element.libelle).toEqual("test_libelle1");
        }
      });
    });
  });
  it("Ajouter un véhicule", async () => {
    let data = {
      num_chassis: "test_v3",
      marque: "marque3",
      modele: "modele3",
      couleur: "couleur3",
      id_type_vehicule: "2",
      id_am: "test_am",
      image_vehicule: "test_img3",
    };

    await axios.post(url + "flotte/ajouter_vehicule/", data).then((res) => {
      expect(res.status).toEqual(200);
    });
    await axios.get(url + "flotte/detail_vehicule/test_v3").then((res) => {
      expect(res.data[0].marque).toEqual("marque3");
    });
  });
  it("Ajouter un type de véhicule", async () => {
    let data = {
      id_type_vehicule: "3",
      libelle: "test_libelle3",
      tarification: "4400",
    };

    await axios.post(url + "flotte/ajouter_typevehicule/", data).then((res) => {
      expect(res.status).toEqual(200);
    });
    await axios.get(url + "flotte/typevehicule/").then((res) => {
      res.data.forEach((element) => {
        if (element.id_type_vehicule === "3") {
          expect(element.tarification).toEqual("4400");
        }
      });
    });
  });
  it("Modifier un véhicule", async () => {
    let vehicule = {
      num_chassis: "test_v3",
      marque: "marque3",
      modele: "modele3",
      couleur: "couleur3",
      id_type_vehicule: "2",
      id_am: "test_am",
      image_vehicule: "test_img 3",
    };
    await axios.put(url + "flotte/modifier_vehicule/test_v3", vehicule);
    await axios.get(url + "flotte/detail_vehicule/test_v3").then((res) => {
      expect(res.data[0].marque).toEqual("marque3");
      expect(res.data[0].modele).toEqual("modele3");
      expect(res.data[0].couleur).toEqual("couleur3");
      expect(res.data[0].id_type_vehicule).toEqual(2);
      expect(res.data[0].id_am).toEqual("test_am");
      expect(res.data[0].image_vehicule).toEqual("test_img 3");
    });
  });
  it("Modifier un type de véhicule", async () => {
    let typevehicule = {
      id_type_vehicule: "3",
      libelle: "test_libelle3",
      tarification: "4600",
    };
    await axios.put(url + "flotte/modifier_typevehicule/3", typevehicule);
    await axios.get(url + "flotte/typevehicule/").then((res) => {
      res.data.forEach((element) => {
        if (element.id_type_vehicule === "3") {
          expect(element.libelle).toEqual("test_libelle3");
          expect(element.tarification).toEqual("4600");
        }
      });
    });
  });
  it("Supprimer un véhicule", async () => {
    await axios
      .delete(url + "flotte/supprimer_vehicule/test_v3")
      .then((res) => {
        expect(res.status).toEqual(200);
      });
    await axios.get(url + "flotte/detail_vehicule/test_v3").then((res) => {
      expect(res.data[0]).not.toBeDefined();
    });
  });
  it("Supprimer un type de véhicule", async () => {
    await axios.delete(url + "flotte/supprimer_typevehicule/3").then((res) => {
      expect(res.status).toEqual(200);
    });
    await axios.get(url + "flotte/typevehicule/").then((res) => {
      res.data.forEach((element) => {
        expect(element.id_type_vehicule).not.toEqual(3);
      });
    });
  });
});
