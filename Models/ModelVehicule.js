// Declaration de variables
const pool = require("../config/config_pool");
const log = require("../config/Logger");

// Recuperer la liste des véhicules de la flotte
const getVehicles = async (request, response) => {
  pool.query(
    `SELECT v.numero_chassis,v.marque,v.modele,v.couleur,v.image_vehicule,
        v.id_am,am.nom,am.prenom,am.email,am.numero_telephone,
        v.id_type_vehicule,tv.libelle,tv.tarification
        FROM vehicule v inner join am  ON am.id_am = v.id_am inner join typevehicule tv ON tv.id_type_vehicule = v.id_type_vehicule;`,
    (error, results) => {
      if (error) {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.sendStatus(500);
      } else {
        response.status(200).json(results.rows);
      }
    }
  );
};

// Recuperer la liste des véhicules affectés à un AM
const getVehiclesByAmID = async (request, response) => {
  let id_am = request.params.id;
  pool.query(
    `SELECT v.numero_chassis,v.marque,v.modele,v.couleur,v.image_vehicule,
      v.id_am,am.nom,am.prenom,am.email,am.numero_telephone,
      v.id_type_vehicule,tv.libelle,tv.tarification
      FROM vehicule v inner join am  ON am.id_am = v.id_am inner join typevehicule tv ON tv.id_type_vehicule = v.id_type_vehicule
      WHERE v.id_am = $1;`,[id_am],
    (error, results) => {
      if (error) {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.sendStatus(500);
      } else {
        response.status(200).json(results.rows);
      }
    }
  );
};

// Recuperer un véhicule avec son numéro de chassis
const getVehicleByChassisNum = async (request, response,result) => {
  vehicule = {}
  let num_chassis = request.params.num_chassis;
  pool.query(
    `SELECT v.numero_chassis,v.marque,v.modele,v.couleur,v.image_vehicule,
      v.id_am,am.nom,am.prenom,am.email,am.mot_de_passe,am.numero_telephone,am.numero_telephone,
      v.id_type_vehicule,tv.libelle,tv.tarification
  FROM vehicule v inner join am  ON am.id_am = v.id_am inner join typevehicule tv ON tv.id_type_vehicule = v.id_type_vehicule
  WHERE v.numero_chassis=$1;`,
    [num_chassis],
    (error, results) => {
      if (error) {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.sendStatus(500);
      } else {
        vehicule = results.rows
        if(result !== undefined){
          vehicule[0].batterie=result.batterie
          vehicule[0].destination=result.destination
          vehicule[0].kilometrage=result.kilometrage
          vehicule[0].latitude=result.latitude
          vehicule[0].longitude=result.longitude
          vehicule[0].temperature=result.temperature
        }
        response.status(200).json(vehicule);
      }
    }
  );
};

  // Recuperer la liste des types des véhicules
const getVehiclesTypes = async (request, response) => {
    pool.query(
      `SELECT * FROM typevehicule;`,
      (error, results) => {
        if (error) {
          log.loggerConsole.error(error);
          log.loggerFile.error(error);
          response.sendStatus(500);
        } else {
          response.status(200).json(results.rows);
        }
      }
    );
  };

  // Recuperer la liste des marques des véhicules
const getVehiclesMarques = async (request, response) => {
  pool.query(
    `SELECT DISTINCT UPPER(marque) AS marque FROM vehicule;`,
    (error, results) => {
      if (error) {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.sendStatus(500);
      } else {
        response.status(200).json(results.rows);
      }
    }
  );
};
 // Recuperer les modeles des véhicules pour une marque
 const getVehiclesModelsByMarque = async (request, response) => {
  pool.query(
    `SELECT DISTINCT UPPER(modele) FROM vehicule where UPPER(marque)=UPPER($1);`
    ,[request.params.marque],(error, results) => {
      if (error) {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.sendStatus(500);
      } else {
        response.status(200).json(results.rows);
      }
    }
  );
};

 // Ajouter un véhicule
const addVehicle= async (request, response) => {
    let body = request.body;
    pool.query(
      "INSERT INTO vehicule(numero_chassis, marque, modele, couleur, id_type_vehicule, id_am, image_vehicule,disponible) VALUES ($1, $2, $3, $4, $5, $6, $7,$8);",
      [
        body.num_chassis,
        body.marque,
        body.modele,
        body.couleur,
        body.id_type_vehicule,
        body.id_am,
        body.image_vehicule,
        body.disponible,
      ],
      (error, results) => {
        if (error) {
          log.loggerConsole.error(error);
          log.loggerFile.error(error);
          response.sendStatus(500);
        } else {
          response.sendStatus(200);
        }
      }
    );
  };

  // Ajouter un type de véhicule
const addVehicleType= async (request, response) => {
    let body = request.body;
    pool.query(
      "INSERT INTO public.typevehicule(id_type_vehicule, libelle, tarification) VALUES ($1, $2, $3);",
      [
        body.id_type_vehicule,
        body.libelle,
        body.tarification,
      ],
      (error, results) => {
        if (error) {
          log.loggerConsole.error(error);
          log.loggerFile.error(error);
          response.sendStatus(500);
        } else {
          response.sendStatus(200);
        }
      }
    );
  };

  // Mettre a jour les informations d'un véhicule
const updateVehicle= async (request, response) => {
    let num_chassis = request.params.num;
    let body = request.body;
    pool.query(
      "UPDATE vehicule SET numero_chassis=$8, marque=$2, modele=$3, couleur=$4, id_type_vehicule=$5, id_am=$6, image_vehicule=$7 WHERE numero_chassis=$1;",
      [
        num_chassis,
        body.marque,
        body.modele,
        body.couleur,
        body.id_type_vehicule,
        body.id_am,
        body.image_vehicule,
        body.num_chassis,
      ],
      (error, results) => {
        if (error) {
          log.loggerConsole.error(error);
          log.loggerFile.error(error);
          response.sendStatus(500);
        } else {
          response.sendStatus(200);
        }
      }
    );
  };

    // Mettre a jour la disponibilte d'un véhicule
const updateVehicleAvaible= async (request, response) => {
  let num_chassis = request.params.num;
  
  pool.query(
    "UPDATE vehicule	SET disponible=not(disponible) WHERE numero_chassis=$1;",
    [
      num_chassis,
    ],
    (error, results) => {
      if (error) {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.sendStatus(500);
      } else {
        response.sendStatus(200);
      }
    }
  );
};

 // Affecter am à un véhicule
 const updateVehicleAM= async (request, response) => {
  let num_chassis = request.params.num;  
  pool.query(
    "UPDATE vehicule	SET id_am=$2 WHERE numero_chassis=$1;",
    [
      num_chassis,
      request.body.id_am
    ],
    (error, results) => {
      if (error) {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.sendStatus(500);
      } else {
        response.sendStatus(200);
      }
    }
  );
};

    // Modifier l'image d'un vehicule
    const updateVehicleImage= async (request, response) => {
      let num_chassis = request.params.num;
      
      pool.query(
        "UPDATE vehicule	SET image_vehicule=$2 WHERE numero_chassis=$1;",
        [
          num_chassis,
          request.body.image_vehicule
        ],
        (error, results) => {
          if (error) {
            log.loggerConsole.error(error);
            log.loggerFile.error(error);
            response.sendStatus(500);
          } else {
            response.sendStatus(200);
          }
        }
      );
    };
  // Mettre a jour les informations d'un type de véhicule
const updateVehicleType= async (request, response) => {
    let id_type_vehicule = request.params.id;
    let body = request.body;
    pool.query(
      "UPDATE typevehicule SET libelle=$2, tarification=$3 WHERE id_type_vehicule=$1;",
      [
        id_type_vehicule,
        body.libelle,
        body.tarification
      ],
      (error, results) => {
        if (error) {
          log.loggerConsole.error(error);
          log.loggerFile.error(error);
          response.sendStatus(500);
        } else {
          response.sendStatus(200);
        }
      }
    );
  };

  // Supprimer un véhicule
const deleteVehicule = async (request, response) => {
    let num_chassis = request.params.num;
    pool.query("DELETE FROM vehicule WHERE numero_chassis=$1", [num_chassis], (error, results) => {
      if (error) {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.sendStatus(500);
      } else {
        response.sendStatus(200);
      }
    });
  };

  // Supprimer un type de véhicule
  const deleteVehiculeType = async (request, response) => {
    let id_type_vehicule = request.params.id;
    pool.query("DELETE FROM typevehicule WHERE id_type_vehicule=$1", [id_type_vehicule], (error, results) => {
      if (error) {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.sendStatus(500);
      } else {
        response.sendStatus(200);
      }
    });
  };

//Recuperer la liste des marques de vehicules
const getMarques = async (request, response) => {
  pool.query(
    `SELECT * from marque;`,
    (error, results) => {
      if (error) {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.sendStatus(500);
      } else {
        response.status(200).json(results.rows);
      }
    }
  );
};
  
//Recuperer la liste des modeles d'une marque par id de marque
const getModelsByIdMarque = async (request, response) => {
  let id = request.params.id;
  pool.query(
    `SELECT * from modele where id_marque=$1;`,
    [
      id,
    ],
    (error, results) => {
      if (error) {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.sendStatus(500);
      } else {
        response.status(200).json(results.rows);
      }
    }
  );
};

//Exporter les fonctions CRUD de l'agent de maintenance
module.exports = {
  getVehicles,
  getVehiclesByAmID,
  getVehicleByChassisNum,
  getVehiclesTypes,
  getVehiclesMarques,
  getVehiclesModelsByMarque,
  addVehicle,
  addVehicleType,
  updateVehicle,
  updateVehicleAvaible,
  updateVehicleAM,
  updateVehicleImage,
  updateVehicleType,
  deleteVehicule,
  deleteVehiculeType,
  getModelsByIdMarque,
  getMarques
};
