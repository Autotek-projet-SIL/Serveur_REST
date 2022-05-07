// Declaration de variables
const pool = require("../config/config_pool");
const log = require("../config/Logger");

//Ajouter une facture
const addFacture = async (request, response) => {
  let body = request.body;
  pool.query(
    "INSERT INTO facture(date_facture, montant, heure, tva)VALUES ($1, $2, $3, $4)",
    [body.date_facture, body.montant, body.heure, body.tva],
    (error, results) => {
      if (error) {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.statusCode = 500;
      }

      //  response.sendStatus(response.statusCode);
    }
  );
};

// Recuperer le détail d'une facture
async function getFactureDetailByID(request, response){
  let id_facture = request.params.id_facture;
  try{     
         let Results= await pool.query(`SELECT f.id_facture,to_char(f.date_facture, 'DD-MM-YYYY') as date_facture,f.montant,f.heure,f.tva,
         to_char(l.date_debut, 'DD-MM-YYYY') as date_debut,l.heure_debut,l.heure_fin,l.region,l.numero_chassis,v.modele,v.marque,
         lo.nom,lo.prenom,lo.email,
         tr.point_depart,tr.point_arrive
         FROM facture f LEFT JOIN louer l ON  f.id_louer = l.id_louer LEFT JOIN locataire lo ON l.id_locataire = lo.id_locataire LEFT JOIN trajet tr ON l.id_trajet=tr.id_trajet
		 LEFT JOIN vehicule v ON l.numero_chassis = v.numero_chassis
         WHERE f.id_facture=$1`, [id_facture]);
          response.status(200).json(Results.rows)
         return Results.rows[0];
      }
      catch(error){
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.sendStatus(500);
        }
}

// Mettre a jour les informations d'un facture
const updateFacture = async (request, response) => {
  let id_facture = request.params.id_facture;
  let body = request.body;
  pool.query(
    "UPDATE facture SET date_facture=$2, montant=$3, heure=$4 ,tva=$5  WHERE id_facture=$1",
    [id_facture, body.date_facture, body.montant, body.heure, body.tva],
    (error, results) => {
      if (error) {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.statusCode == 500;
      } else {
      }
    }
  );
};

//Exporter les fonctions CRUD de la demande d'inscription
module.exports = {
  addFacture,
  getFactureDetailByID,
  updateFacture,
};
