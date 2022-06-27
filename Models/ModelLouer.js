// Declaration de variables
const pool = require("../config/config_pool");
const log = require("../config/Logger");

//retrieve the list of rentals for the statistics service
const getLocationStatistics = async (request, response) => {
  pool.query(
    "SELECT id_louer, date_debut , status_demande_location, en_cours ,suivi_location,region  FROM louer",
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

// Retrieve the list of all rentals
const getAllLocations = async (request, response) => {
  pool.query(
    `SELECT l.id_louer,l.numero_chassis,l.id_locataire, l.heure_debut, l.heure_fin,l.status_demande_location,l.en_cours,l.suivi_location,tv.id_type_vehicule, libelle, tarification,l.latitude_depart,l.longitude_depart,l.latitude_arrive,l.longitude_arrive,loc.nom,loc.prenom 
    FROM louer l  left join vehicule v ON l.numero_chassis=v.numero_chassis 
            left join locataire loc on l.id_locataire=loc.id_locataire
            full join  typevehicule tv ON tv.id_type_vehicule = v.id_type_vehicule
            where l.id_louer is not NULL`,
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

// Retrieve the list of all regions
const getAllRegions = async (request, response) => {
  pool.query("select distinct region from louer; ", (error, results) => {
    if (error) {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(500);
    } else {
      response.status(200).json(results.rows);
    }
  });
};

// Retrieve the list of current rentals
const getLocationsEnCours = async (request, response) => {
  pool.query(
    `SELECT id_louer,l.numero_chassis, heure_debut, heure_fin,status_demande_location,en_cours,suivi_location,tv.id_type_vehicule, libelle, tarification,latitude_depart,longitude_depart,latitude_arrive,longitude_arrive,en_cours,loc.nom,loc.prenom
    FROM louer l  left join vehicule v ON l.numero_chassis=v.numero_chassis 
            left join locataire loc on l.id_locataire=loc.id_locataire
            full join  typevehicule tv ON tv.id_type_vehicule = v.id_type_vehicule
            where l.id_louer is not NULL and en_cours=true`,
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

// Retrieve the list of current rentals for a tenant
const getLocationsLocataire = async (request, response) => {
  let id = request.params.id;
  pool.query(
    "SELECT * FROM louer l  left join vehicule v ON l.numero_chassis=v.numero_chassis full join  typevehicule tv ON tv.id_type_vehicule = v.id_type_vehicule where l.id_louer is not NULL and en_cours = true and id_locataire =$1",
    [id],
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

// Retrieve the list of completed rentals
const getLocationsTermines = async (request, response) => {
  pool.query(
    "SELECT id_louer, heure_debut, heure_fin,status_demande_location,en_cours,suivi_location,tv.id_type_vehicule, libelle, tarification ,latitude_depart,longitude_depart,latitude_arrive,longitude_arrive,en_cours FROM louer l  left join vehicule v ON l.numero_chassis=v.numero_chassis full join  typevehicule tv ON tv.id_type_vehicule = v.id_type_vehicule WHERE l.id_louer is not NULL and en_cours=false",
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

// Retrieve the list of terminated rentals for a tenant
const getLocationsTerminesByIdLocataire = async (request, response) => {
  let id = request.params.id;
  pool.query(
    `SELECT * FROM louer l left join facture f on f.id_louer=l.id_louer 
    left join vehicule v ON l.numero_chassis=v.numero_chassis full join  typevehicule tv ON tv.id_type_vehicule = v.id_type_vehicule 
    WHERE l.id_louer is not NULL and en_cours=false and id_locataire=$1`,
    [id],
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

// Retrieve the ended rentals of a tenant
const getLocataireByNumeroChassis = async (request, response) => {
  let numero_chassis = request.params.num;
  pool.query(
    "SELECT id_locataire from louer where numero_chassis=$1 order by heure_debut,date_debut asc limit 1;",
    [numero_chassis],
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

// Retrieve the list of rentals accepted for the statistics service
const getLocationsAcceptes = async (request, response) => {
  pool.query(
    "SELECT id_louer, date_debut , status_demande_location, en_cours ,suivi_location,region from louer where status_demande_location='accepte' ",
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

// Retrieve the list of rentals rejected for the statistics service
const getLocationsRejetes = async (request, response) => {
  pool.query(
    "SELECT id_louer, date_debut , status_demande_location, en_cours ,suivi_location,region from louer where status_demande_location='rejete' ",
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

// Modify the follow_location field of a location
const updateLocationSuiviLocation = async (request, response) => {
  let id = request.params.id;
  let date = request.body.suivi_location;
  pool.query(
    "UPDATE louer SET suivi_location=$2 WHERE id_louer=$1",
    [id, date],
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

// Modify the start time field of a rental
const updateLocationHeureDebut = async (request, response) => {
  let id = request.params.id;
  let date = request.body.heure;
  pool.query(
    "UPDATE louer SET heure_debut=$2 WHERE id_louer=$1",
    [id, date],
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

// Modify the end_time field of a rental
const updateLocationHeureFin = async (request, response) => {
  let id = request.params.id;
  let date = request.body.heure;
  pool.query(
    "UPDATE louer SET heure_fin=$2 WHERE id_louer=$1",
    [id, date],
    (error, results) => {
      if (error) {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.statusCode = 500;
      }
    }
  );
};

// End a rental (in_cours => false)
const endLocation = async (request, response) => {
  let id = request.params.id;
  let heure = request.body.heure;
  pool.query(
    "UPDATE louer SET en_cours=false, heure_fin=$2 WHERE id_louer=$1",
    [id, heure],
    (error, results) => {
      if (error) {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.statusCode = 500;
      }
      response.statusCode = 200;
    }
  );
};

// add location
const addLocation = async (request, response) => {
  let body = request.body;
  let latd=body.latitude_depart
  let longd=body.longitude_depart
  let lata=body.latitude_arrive
  let longa=body.longitude_arrive
  if(latd===""){
    latd=0.0
  }
  if(longd===""){
    longd=0.0
  }
  if(lata===""){
    lata=0.0
  }
  if(longa===""){
    longa=0.0
  }
  pool.query(
    "INSERT INTO louer(date_debut,status_demande_location, id_locataire,region,numero_chassis,suivi_location,en_cours,latitude_depart,longitude_depart,latitude_arrive,longitude_arrive)VALUES ($1, $2, $3, $4, $5, $6,$7,$8,$9,$10,$11) RETURNING id_louer",
    [
      body.date_debut,
      body.status_demande_location,
      body.id_locataire,
      body.region,
      body.numero_chassis,
      body.suivi_location,
      body.en_cours,
      latd,
      longd,
      lata,
      longa,
    ],
    (error, results) => {
      if (error) {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.statusCode = 500;
      }else{
        response.status(200).json(results.rows);
      }
    }
  );
};

/// Retrieve a location with an identifier
const getLocationById = async (request, response) => {
  let id_louer = request.params.id;
  pool.query(
    `SELECT l.*,loc.nom,loc.prenom,tv.id_type_vehicule, libelle, tarification ,f.date_facture,f.montant,f.heure,f.tva
    FROM louer l  inner join locataire loc on l.id_locataire=loc.id_locataire 
    left join vehicule v ON l.numero_chassis=v.numero_chassis 
    full join  typevehicule tv ON tv.id_type_vehicule = v.id_type_vehicule  
    left JOIN facture f  ON l.id_louer=f.id_louer WHERE l.id_louer=$1`,
    [id_louer],
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

//Exporter les fonctions CRUD de location
module.exports = {
  getLocationsEnCours,
  getLocationsTermines,
  addLocation,
  endLocation,
  getLocationById,
  getLocationsLocataire,
  getAllLocations,
  updateLocationHeureDebut,
  getLocationStatistics,
  updateLocationHeureFin,
  getLocationsAcceptes,
  getLocationsRejetes,
  getLocationsTerminesByIdLocataire,
  updateLocationSuiviLocation,
  getAllRegions,
  getLocataireByNumeroChassis,
};
