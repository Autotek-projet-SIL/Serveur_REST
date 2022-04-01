process.env.NODE_ENV = "test_unitaire"
const app = require("../config/server_test")
const axios = require("axios");
const url = "http://localhost:4000/"

describe("Tester le service GestionComptes", () => {

    it("Tester l'ajout d'un décideur", async() => {
        let data = {
            "token": "avPraesPu0hkkvlsRaHhcGx3VSph2",
            "id": "idajoute",
            "nom": "Mehar",
            "prenom": "Khaoula",
            "email": "ik_mehar@esi.dz",
            "mot_de_passe": "kjl28vcn",
            "numero_telephone": "0645321321",
            "photo_decideur": "photo"         
        }
    
     await axios.post(url + 'gestioncomptes/ajouter_decideur/', data
        )
            .then(res1 => {
                expect(res1.status).toEqual(200)

         
        });
        
            
         await   axios
                .get(url + 'authentification_web/decideur_connexion/ik_mehar@esi.dz')
                .then(res1 => {

                
                
                        expect(res1.data[0].email).toEqual("ik_mehar@esi.dz")
                        expect(res1.data[0].id_decideur).toEqual("idajoute")
                   
               
        });
    });
    it("Tester l'ajout d'un ATC", async() => {
        let data = {
            "token": "avPraesPu0hkkvlsRaHhcGx3VSph2",
            "id": "idajoute",
            "nom": "Mechouar",
            "prenom": "MANEL",
            "email": "im_mehouar@esi.dz",
            "mot_de_passe": "kjl28vcn",
            "numero_telephone": "0645321321",
            "est_root": false,
            "photo_atc": "photo"           
        }
    
     await axios.post(url + 'gestioncomptes/ajouter_atc/', data
        )
            .then(res1 => {
                expect(res1.status).toEqual(200)

         
        });
        
            
         await   axios
                .get(url + 'authentification_web/atc_connexion/im_mehouar@esi.dz')
                .then(res1 => {

                
                
                        expect(res1.data[0].email).toEqual("im_mehouar@esi.dz")
                        expect(res1.data[0].id_atc).toEqual("idajoute")
                   
               
        });
    });

    it("Tester l'ajout d'un AM", async() => {
        let data = {
            "token": "avPraesPu0hkkvlsRaHhcGx3VSph2",
            "id": "idajoute",
            "nom": "Brahimi",
            "prenom": "Amina",
            "email": "brahimi@gmail.com",
            "mot_de_passe": "kjl28vcn",
            "numero_telephone": "0645321321",
            "photo_am": "ppppp"              
        }
    
     await axios.post(url + 'gestioncomptes/ajouter_am/', data
        )
            .then(res1 => {
                expect(res1.status).toEqual(200)

         
        });
        
            
         await   axios
                .get(url + 'authentification_mobile/am_connexion/brahimi@gmail.com')
                .then(res1 => {

                
                
                        expect(res1.data[0].email).toEqual("brahimi@gmail.com")
                        expect(res1.data[0].id_am).toEqual("idajoute")
                   
               
        });
    });

    it("Tester la suppression d'un décideur", async() => {
       
    
     await    axios.delete(url + 'gestioncomptes/supprimer_decideur/idajoute'
     )
         .then(res => {
             expect(res.status).toEqual(200)
     });
        
            
         await   axios
                .get(url + 'authentification_web/decideur_connexion/ik_mehar@esi.dz')
                .then(res => {

                
                
                    expect(res.data[0]).not.toBeDefined();
                   
               
        });
    });
  
    it("Tester la suppression d'un ATC", async() => {
       
    
        await    axios.delete(url + 'gestioncomptes/supprimer_atc/idajoute'
        )
            .then(res => {
                expect(res.status).toEqual(200)
        });
           
               
            await   axios
                   .get(url + 'authentification_web/atc_connexion/im_mehouar@esi.dz')
                   .then(res => {
   
                   
                   
                       expect(res.data[0]).not.toBeDefined();
                      
                  
           });
       });
     
       it("Tester la suppression d'un AM", async() => {
       
    
        await    axios.delete(url + 'gestioncomptes/supprimer_am/idajoute'
        )
            .then(res => {
                expect(res.status).toEqual(200)
        });
           
               
            await   axios
                   .get(url + 'authentification_mobile/am_connexion/brahimi@gmail.com')
                   .then(res => {
   
                   
                   
                       expect(res.data[0]).not.toBeDefined();
                      
                  
           });
       });


       it("Tester la suppression d'un locataire", async() => {
        let data = {
            "token": "avPraesPu0hkkvlsRaHhcGx3VSph2",
            "id": "idajoute",
            "nom": "Madani",
            "prenom": "Nassim",
            "email": "madaninassim@gmail.com",
            "mot_de_passe": "kjl28vcn",
            "numero_telephone": "0645321321",
            "photo_identite_recto": "nassim_photo",
            "photo_identite_verso": "nassim_photo",
            "photo_selfie": "nassim_photo",
            "statut_compte": "false",
            "statut": "en attente",
            "date_inscription": "2022-03-30"
        }
     await   axios.post(url + 'authentification_mobile/locataire_inscription/', data
        )
            .then(res => {
                expect(res.status).toEqual(200)
            })
    
        await    axios.delete(url + 'gestioncomptes/supprimer_locataire/idajoute'
        )
            .then(res => {
                expect(res.status).toEqual(200)
        });
           
               
            await   axios
                   .get(url + 'authentification_mobile/locataire_connexion/madaninassim@gmail.com')
                   .then(res => {
   
                   
                   
                       expect(res.data[0]).not.toBeDefined();
                      
                  
           });
       });

    });