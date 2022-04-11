// Declaration de variables
const pool = require("../config/config_pool");
const log = require("../config/Logger");

// Recuperer la liste des véhicules de la flotte
const getVehicles = async (request, response) => {
  pool.query(
    `SELECT v.numero_chassis,v.marque,v.modele,v.couleur,v.image_vehicule,
        v.id_am,am.nom,am.prenom,am.email,am.mot_de_passe,am.numero_telephone,am.numero_telephone,
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

// Recuperer un véhicule avec son numéro de chassis
const getVehicleByChassisNum = async (request, response) => {
    let num = request.params.num;
    pool.query(
      `SELECT v.numero_chassis,v.marque,v.modele,v.couleur,v.image_vehicule,
      v.id_am,am.nom,am.prenom,am.email,am.mot_de_passe,am.numero_telephone,am.numero_telephone,
      v.id_type_vehicule,tv.libelle,tv.tarification
  FROM vehicule v inner join am  ON am.id_am = v.id_am inner join typevehicule tv ON tv.id_type_vehicule = v.id_type_vehicule
  WHERE v.numero_chassis=$1;`,
      [num],
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
  getVehicleByChassisNum
};