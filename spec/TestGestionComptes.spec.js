process.env.NODE_ENV = "test_unitaire"
const app = require("../config/server_test")
const axios = require("axios");
const url = "http://localhost:4000/"

describe("Tester le service GestionComptes", () => {
    describe("Tester l'ajout d'un décideur", () => {
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
     beforeAll(() => {
        axios.post(url + 'gestioncomptes/ajouter_decideur/', data
        )
            .then(res1 => {
                expect(res1.status).toEqual(200)

            }); 
        });
        it("Si le decideur a été inseré le test passe", () => {
            
            axios
                .get(url + 'authentification_web/decideur_connexion/ik_mehar@esi.dz')
                .then(res1 => {

                   if(res1.data.length != 0)
                   {
                        expect(res1.data[0].email).toEqual("ik_mehar@esi.dz")
                        expect(res1.data[0].id_decideur).toEqual("idajoute")
                    }  
                    else{
                        throw new Error("\n **** Probleme lors de l'insertion du decideur ****")
                    }

                })
        });
    
    });

   describe("Tester l'ajout d'un ATC", () => {
        let data = {
            "token": "avPraesPu0hkkvlsRaHhcGx3VSph2",
            "id": "idajoute",
            "nom": "Mechouar",
            "prenom": "MANEL",
            "email": "im_mechouar@esi.dz",
            "mot_de_passe": "kjl28vcn",
            "numero_telephone": "0645321321",
            "est_root": false,
            "photo_atc": "photo"         
        }
       beforeAll(() => {
        axios.post(url + 'gestioncomptes/ajouter_atc/', data
        )
            .then(res => {
                expect(res.status).toEqual(200)
            });     
        });
        it("Si l'atc a été inseré le test passe", () => {
            
                axios.get(url + 'authentification_web/atc_connexion/im_mechouar@esi.dz')
                .then(res => {
                    if (res.data.length !== 0) {
                        expect(res.data[0].email).toEqual("im_mechouar@esi.dz")
                        expect(res.data[0].id_atc).toEqual("idajoute")
                    } else {
                        throw new Error("\n **** Probleme lors de l'insertion de l'atc ****")
                    }

               
          
        });
    }) ;

});
  describe("Tester l'ajout d'un AM", () => {
        let data = {
            "token": "avPraesPu0hkkvlsRaHhcGx3VSph2",
            "id": "idajoute",
            "nom": "Mehar",
            "prenom": "Khaoula",
            "email": "ik_mehar@esi.dz",
            "mot_de_passe": "kjl28vcn",
            "numero_telephone": "0645321321",
            "photo_am": "ppppp"         
        }
      beforeAll(() => {
        axios.post(url + 'gestioncomptes/ajouter_am/', data
        )
            .then(res => {
                expect(res.status).toEqual(200)
            }) 
        });
      it("Si l'Am a été inseré le test passe", () => {
          
                axios 
                    .get(url + 'authentification_mobile/am_connexion/ik_mehar@esi.dz')
                    .then(res => {
                        if (res.data.length !== 0) {
                            expect(res.data[0].email).toEqual("ik_mehar@esi.dz")
                            expect(res.data[0].id_am).toEqual("idajoute")
                        } else {
                            throw new Error("\n **** Probleme lors de l'insertion de l'AM ****")
                        }
    
                    })
          
        });
    }) ;

   describe("Tester la suppression d'un am", () => {
        let data = {
            "token": "avPraesPu0hkkvlsRaHhcGx3VSph2",
            "id": "idsupprime",
            "nom": "Mehar",
            "prenom": "Khaoula",
            "email": "ik_mehar@esi.dz",
            "mot_de_passe": "kjl28vcn",
            "numero_telephone": "0645321321",
            "photo_am": "ppppp"         
        }
        beforeAll(() => {
            axios.post(url + 'gestioncomptes/ajouter_am', data
            ).then(res => {
                expect(res.status).toEqual(200)
            });
            axios.delete(url + 'gestioncomptes/supprimer_am/idsupprime'
            )
                .then(res => {
                    expect(res.status).toEqual(200)
            }) ;
       
            });



        it("Si l'Am a été supprimé le test passe", () => {
         
             

               
        
        
        
            axios
                .get(url + 'authentification_mobile/am_connexion/ik_mehar@esi.dz')
                .then(res => {
                    if (res.data.length == 0) {
                     expect(res.data[0]).not.toBeDefined(); ;
                      
                    } else {
                        throw new Error("\n **** Probleme lors de la suppression de l'AM ****")
                    }

                })
        });
    
    
    });

  describe("Tester la suppression d'un decideur", () => {

        let data = {
            "token": "avPraesPu0hkkvlsRaHhcGx3VSph2",
            "id": "idsupprime",
            "nom": "Mehar",
            "prenom": "Khaoula",
            "email": "ik_mehar@esi.dz",
            "mot_de_passe": "kjl28vcn",
            "numero_telephone": "0645321321",
            "photo_decideur": "photo"         
        }
        beforeAll(() => {
            axios.post(url + 'gestioncomptes/ajouter_decideur', data
            ).then(res => {
                expect(res.status).toEqual(200)
            });
              

                axios.delete(url + 'gestioncomptes/supprimer_decideur/idsupprime'
                )
                    .then(res => {
                        expect(res.status).toEqual(200)
                });
       
           
            });
        it("Si le decideur a été supprimé le test passe", () => {
           
            axios
                .get(url + 'authentification_web/decideur_connexion/ik_mehar@esi.dz')
                .then(res => {
                    if (res.data.length == 0) {
                     expect(res.data[0]).not.toBeDefined(); 
                      
                    } else {
                        throw new Error("\n **** Probleme lors de la suppression du decideur ****")
                    }

                })
        });
    
    
    
    })


    describe("Tester la suppression d'un atc", () => {
        let data = {
            "token": "avPraesPu0hkkvlsRaHhcGx3VSph2",
            "id": "idsupprime",
            "nom": "Mehar",
            "prenom": "Khaoula",
            "email": "ik_mehar@esi.dz",
            "mot_de_passe": "kjl28vcn",
            "numero_telephone": "0645321321",
            "est_root": true,
            "photo_atc": "ppppp"         
        }
        beforeAll(() => {
            axios.post(url + 'gestioncomptes/ajouter_atc', data
            )
                .then(res => {
                    expect(res.status).toEqual(200)
                })

                axios.delete(url + 'gestioncomptes/supprimer_atc/idsupprime'
                )
                    .then(res => {
                        expect(res.status).toEqual(200)
                })
        } );
        
        it("Si l'atc a été supprimé le test passe", () => {
         
            axios
                .get(url + 'authentification_web/atc_connexion/ik_mehar@esi.dz')
                .then(res => {
                    if (res.data.length == 0) {
                     expect(res.data[0]).not.toBeDefined(); ;
                      
                    } else {
                        throw new Error("\n **** Probleme lors de la suppression d'un atc ****")
                    }

                })
        });
    
    
    
    })



   describe("Tester la suppression d'un locataire", () => {
        let data = {
            "token": "avPraesPu0hkkvlsRaHhcGx3VSph2",
            "id": "KWPhaKsPu0hkkhsRaHhcGx3V",
            "nom": "Mehar",
            "prenom": "Khaoula",
            "email": "ik_mehar@esi.dz",
            "mot_de_passe": "kjl28vcn",
            "numero_telephone": "0645321321",
            "photo_identite_recto": "Khaoula_photo",
            "photo_identite_verso": "Khaoula_photo",
            "photo_selfie": "Khaoula_photo",
            "statut_compte": "false",
            "statut": "en attente",
            "date_inscription": "2022-03-30"      
        }
        beforeAll(() => {
            axios.post(url + 'authentification_mobile/locataire_inscription/', data
            )
                .then(res => {
                    expect(res.status).toEqual(200)
                })

                axios.delete(url + 'gestioncomptes/supprimer_locataire/KWPhaKsPu0hkkhsRaHhcGx3V'
                )
                    .then(res => {
                        expect(res.status).toEqual(200)
                })
        }
        
        
        );
        
        it("Si le locataire a été supprimé le test passe", () => {
            axios
                .get(url + 'authentification_mobile/locataire_connexion/ik_mehar@esi.dz')
                .then(res => {
                    if (res.data.length == 0) {
                     expect(res.data[0]).not.toBeDefined(); ;
                      
                    } else {
                        throw new Error("\n **** Probleme lors de la suppression d'un locataire ****")
                    }

                })
        });
    
    
    
    })


    

    

    












})