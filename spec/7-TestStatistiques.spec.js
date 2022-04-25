
const axios = require("axios");
const url = "http://localhost:4000/";

describe("Tester le service Statististiques", () => {
  describe("Recuperer la liste des factures", () => {
    it("Recuperer la liste des factures", async () => {
      await axios.get(url + "statistiques/getFactures").then((res) => {
          
        res.data.forEach((element) => {
         
            expect(element.id_facture).toEqual(1);
       
        });
      });
    });

    it("Recuperer la liste des demandes d'inscription", async () => {
        await axios.get(url + "statistiques/getDemandeInscription").then((res) => {
            
          res.data.forEach((element) => {
              if(element.date_inscription==='2022-03-03')
              expect(element.statut).toEqual('refusee');
         
          });
        });
      });

      
    it("Recuperer la liste des locations", async () => {
        await axios.get(url + "statistiques/get_locations").then((res) => {       
            res.data.forEach((element) => {
              expect(element.status_demande_location).toEqual('accepte');
          })
        });
      });
    

    

});
});
