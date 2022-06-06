// Declaration de variables
const pool = require("../config/config_pool");
const log = require("../config/Logger");

//Ajouter une pannef
const addPanne = async (request, response, data) => {
  let body = request.body;
  pool.query(
    "INSERT INTO public.tache(objet, descriptif, etat, date_debut, date_fin, id_am, etat_avancement, type_tache) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id_tache;",
    [
      body.objet,
      body.descriptif,
      body.etat,
      body.date_debut,
      body.date_fin,
      body.id_am,
      body.etat_avancement,
      body.type_tache,
    ],
    (error, results) => {
      if (error) {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.statusCode = 500;
      } else {
        let id = results.rows[0].id_tache;
        pool.query(
          "INSERT INTO public.panne(numero_chassis, id_tache) VALUES ($1, $2);",
          [body.numero_chassis, id],
          (error, results) => {
            if (error) {
              log.loggerConsole.error(error);
              log.loggerFile.error(error);
              response.statusCode = 500;
            } else {
              response.statusCode = 200;
            }
          }
        );
      }
    }
  );
};

// Recuperer la liste des pannes
const getPannes = async (request, response) => {
  pool.query(
    `Select t.id_tache, t.objet, t.descriptif, t.etat, t.date_debut, t.date_fin, t.id_am, t.etat_avancement, t.type_tache, p.id_panne, p.numero_chassis, v.numero_chassis,v.marque,v.modele,v.couleur,v.image_vehicule from panne p  inner join tache t  ON t.id_tache = p.id_tache inner join vehicule v ON v.numero_chassis = p.numero_chassis`,
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

const getPanneById = async (request, response) => {
  let id = request.params.id;
  pool.query(
    `SELECT *
      FROM panne 
      WHERE id_panne = $1;`,
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

//Exporter les fonctions de facture
module.exports = {
  addPanne,
  getPannes,
  getPanneById,
};
