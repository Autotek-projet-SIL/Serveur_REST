const axios = require("axios");
const url = "http://localhost:4000/";


describe("Tester le service Gestion des Locations", () => {

it("Recuperer la liste des locations en cours", async () => {
  await axios.get(url + "gestionlocations/locations_encours").then((res) => {
    res.data.forEach((element) => {
     
        expect(element.en_cours).toEqual(true);
      
    });
  });
});

it("Terminer une location", async () => {
      
  await axios.put(
    url + "gestionlocations/end_location/3"
  
  );
  await axios
    .get(
      url +
        "gestionlocations/location/3"
    )
    .then((res) => {
      res.data.forEach((element) => {
         
        expect(element.id_louer).toEqual(3);
      expect(element.en_cours).toEqual(false);
      
    });
     
    
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
      await axios.get(url + "gestionlocations/get_locations_by_locataire/test_locataire").then((res) => {
        res.data.forEach((element) => {
         
            expect(element.en_cours).toEqual(true);
            expect(element.id_locataire).toEqual('test_locataire');
          
        });
      });
    });
   
  
  
    });
   

        