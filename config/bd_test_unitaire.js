const pg_mem = require("pg-mem");

const pg = pg_mem.newDb().adapters.createPg();

const pool = new pg.Pool();
pool.query(
  `
CREATE TABLE public.am (
    id_am character varying(28) NOT NULL,
    nom character varying(50) NOT NULL,
    prenom character varying(50) NOT NULL,
    numero_telephone character varying(10) NOT NULL,
    email character varying(50) NOT NULL,
    mot_de_passe character varying(50) NOT NULL,
    photo_am character varying(255) NOT NULL
);
    `
);
pool.query(
  `
CREATE TABLE public.atc (
    id_atc character varying(28) NOT NULL,
    nom character varying(50) NOT NULL,
    prenom character varying(50) NOT NULL,
    numero_telephone character varying(10) NOT NULL,
    email character varying(50) NOT NULL,
    mot_de_passe character varying(50) NOT NULL,
    est_root boolean NOT NULL,
    photo_atc character varying(255) NOT NULL
);
    `
);

pool.query(
  `
    CREATE TABLE public.cartepaiement (
        numero_carte_paiement character varying(16) NOT NULL,
        solde real NOT NULL,
        code character varying(3) NOT NULL,
        date_expiration date NOT NULL,
        id_locataire character varying(28) NOT NULL,
        CONSTRAINT cartepaiement_solde_check CHECK ((solde >= (0)::double precision))
    );
    `
);

pool.query(
  `
CREATE TABLE public.decideur (
    id_decideur character varying(28) NOT NULL,
    nom character varying(50) NOT NULL,
    prenom character varying(50) NOT NULL,
    numero_telephone character varying(10) NOT NULL,
    email character varying(50) NOT NULL,
    mot_de_passe character varying(50) NOT NULL,
    photo_decideur character varying(255) NOT NULL
);
    `
);

pool.query(
  `
    CREATE TABLE public.demandeinscription (
        id_demande_inscription serial,
        statut character varying(50) NOT NULL,
        date_inscription date NOT NULL,
        id_locataire character varying(28),
        email character varying(50)
    );
    `
);

pool.query(
  `
    CREATE TABLE public.demandesupport (
        id_demande_support serial,
        objet character varying(50) NOT NULL,
        descriptif character varying(255) NOT NULL,
        reponse character varying(255),
        id_locataire character varying(28) NOT NULL
    );    
`
);

pool.query(
  `
    CREATE TABLE public.facture (
        id_facture serial,
        date_facture date NOT NULL,
        montant real NOT NULL,
        heure time without time zone NOT NULL,
        tva real NOT NULL,
        CONSTRAINT facture_montant_check CHECK ((montant > (0)::double precision)),
        CONSTRAINT facture_tva_check CHECK ((tva > (0)::double precision))
    );
    `
);

pool.query(
  `
CREATE TABLE public.justificatif (
    id_justificatif serial,
    objet character varying(50) NOT NULL,
    descriptif character varying(50) NOT NULL,
    id_demande_inscription integer NOT NULL
);
    `
);

pool.query(
  `
    CREATE TABLE public.locataire (
        id_locataire character varying(28) NOT NULL,
        nom character varying(50) NOT NULL,
        prenom character varying(50) NOT NULL,
        numero_telephone character varying(10) NOT NULL,
        email character varying(50) NOT NULL,
        mot_de_passe character varying(50) NOT NULL,
        statut_compte boolean NOT NULL,
        photo_identite_recto character varying(255) NOT NULL,
        photo_selfie character varying(255) NOT NULL,
        photo_identite_verso character varying(255) NOT NULL
    );
    `
);

pool.query(
  `
    CREATE TABLE public.louer (
        date_debut date NOT NULL,
        date_fin date NOT NULL,
        heure_debut time without time zone NOT NULL,
        heure_fin time without time zone NOT NULL,
        status_demande_location character varying(50) NOT NULL,
        id_locataire character varying(28) NOT NULL,
        id_region serial,
        numero_chassis character varying(10) NOT NULL,
        id_facture serial,
        id_trajet serial
    );
    `
);

pool.query(
  `
    CREATE TABLE public.panne (
        id_panne integer NOT NULL,
        objet character varying(50) NOT NULL,
        descriptif character varying(255) NOT NULL,
        numero_chassis character varying(10) NOT NULL,
        id_tache integer NOT NULL
    );
    `
);

pool.query(
  `
    CREATE TABLE public.payer (
        numero_carte_paiement character varying(16) NOT NULL,
        id_locataire character varying(28) NOT NULL,
        id_facture serial,
        date_paiement date NOT NULL,
        heure_paiement time without time zone NOT NULL,
        montant_paiement real NOT NULL,
        type_paiement character varying(50) NOT NULL,
        CONSTRAINT payer_montant_paiement_check CHECK ((montant_paiement >= (0)::double precision))
    );
    `
);

pool.query(
  `
    CREATE TABLE public.region (
        id_region integer NOT NULL,
        libelle character varying(50) NOT NULL
    );
    `
);

pool.query(
  `
    CREATE TABLE public.tache (
        id_tache serial,
        objet character varying(50) NOT NULL,
        descriptif character varying(255) NOT NULL,
        etat character varying(50) NOT NULL,
        date_debut date NOT NULL,
        date_fin date NOT NULL,
        id_am character varying(28) NOT NULL
    );
    `
);

pool.query(
  `
    CREATE TABLE public.trajet (
        id_trajet integer NOT NULL,
        point_depart character varying(50) NOT NULL,
        point_arrive character varying(50) NOT NULL
    );
    `
);

pool.query(
  `
    CREATE TABLE public.typevehicule (
        id_type_vehicule integer NOT NULL,
        libelle character varying(50) NOT NULL,
        tarification real NOT NULL,
        CONSTRAINT typevehicule_tarification_check CHECK ((tarification >= (0)::double precision))
    );
    `
);

pool.query(
  `
    CREATE TABLE public.vehicule (
        numero_chassis character varying(10) NOT NULL,
        marque character varying(50) NOT NULL,
        modele character varying(50) NOT NULL,
        couleur character varying(50) NOT NULL,
        id_type_vehicule integer NOT NULL,
        id_am character varying(28) NOT NULL,
        image_vehicule character varying(255) NOT NULL
    );
    `
);

pool.query(
  `
    INSERT INTO public.locataire(
        id_locataire, nom, prenom, numero_telephone, email, mot_de_passe, statut_compte, photo_identite_recto, photo_selfie, photo_identite_verso)
        VALUES ('test_locataire','test_locataire', 'test_locataire', '0541251311', 'test_locataire@gmail.com', 'test_locataire', 'false', 'test_locataire', 'test_locataire', 'test_locataire');
    `
);

pool.query(
  `
        INSERT INTO public.am(id_am, nom, prenom, numero_telephone, email, mot_de_passe, photo_am)
        VALUES ('test_am','test_am', 'test_am', '0541251311', 'test_am@gmail.com', 'test_am','test_am');
    `
);
pool.query(
  `
        INSERT INTO public.decideur(id_decideur, nom, prenom, numero_telephone, email, mot_de_passe, photo_decideur)
        VALUES ('test_decideur','test_decideur', 'test_decideur', '0541251311', 'test_decideur@gmail.com', 'test_decideur','test_decideur');
    `
);
pool.query(
  `
        INSERT INTO public.atc(id_atc, nom, prenom, numero_telephone, email, mot_de_passe,est_root, photo_atc)
        VALUES ('test_atc','test_atc', 'test_atc', '0541251311', 'test_atc@gmail.com', 'test_atc','false','test_atc');
    `
);
pool.query(
  `
    INSERT INTO public.demandeinscription(
    statut, date_inscription, id_locataire, email)
    VALUES ('en attente','2022-03-30','test_locataire','test_locataire@gmail.com');
   `
);

module.exports = pool;
