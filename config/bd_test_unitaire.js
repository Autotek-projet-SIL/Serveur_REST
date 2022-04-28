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
        id_louer serial,
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
        date_debut date ,
        heure_debut time without time zone ,
        heure_fin time without time zone ,
        status_demande_location character varying(50) NOT NULL,
        id_locataire character varying(28) NOT NULL,
        region character varying(28),
        numero_chassis character varying(10) NOT NULL,
        id_trajet serial,
        id_louer serial,
        en_cours boolean
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
        id_trajet serial,
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
        image_vehicule character varying(255) NOT NULL,
        disponible boolean DEFAULT true
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
        INSERT INTO public.am(id_am, nom, prenom, numero_telephone, email, mot_de_passe, photo_am)
        VALUES ('123456','test_am', 'test_am', '0541251311', 'test_am@gmail.com', 'test_am','test_am');
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

pool.query(
  `
    INSERT INTO public.typevehicule(
      id_type_vehicule, libelle, tarification)
        VALUES ('1','test_libelle1', '3500'), ('2','test_libelle2', '4100');`
);
pool.query(
  `
  INSERT INTO public.region(
    id_region, libelle)
    VALUES (1,'alger');
  `
);

pool.query(
  `
    INSERT INTO public.vehicule(
      numero_chassis, marque, modele, couleur, id_type_vehicule, id_am, image_vehicule)
        VALUES ('test_v1','test_marque1', 'test_modele1', 'test_couleur1', '1', 'test_am','test_img1'), ('test_v2','test_marque2', 'test_modele2', 'test_couleur2', '2', 'test_am','test_img2');
  `
);

pool.query(
  `
  INSERT INTO public.region(
    id_region, libelle)
    VALUES (1,'alger');
  `
);

pool.query(
  ` INSERT INTO public.facture(
    id_facture, date_facture, montant, heure, tva,id_louer)
    VALUES (1, '2022-03-30', 14000, '08:00', 500,3);
    `
);

pool.query(
  `
  INSERT INTO public.typevehicule(
    id_type_vehicule, libelle, tarification)
    VALUES (1, 'crossovers', 4000);
  `
);
pool.query(
  `
INSERT INTO public.vehicule(
	numero_chassis, marque, modele, couleur, id_type_vehicule, id_am, image_vehicule)
	VALUES ('1111', 'Dacia', 'standard', 'noir',1 , '123456', 'image');
  `
);

pool.query(
  `
INSERT INTO public.trajet(
	id_trajet, point_depart, point_arrive)
	VALUES (1, 'alger', 'oran');
  `
);

pool.query(
  `
   INSERT INTO public.facture(
    id_facture, date_facture, montant, heure, tva)
    VALUES (1, '2022-03-30', 4000, '03:00', 5000);
   `
);

pool.query(
  `
  INSERT INTO public.louer(
   date_debut,   status_demande_location, id_locataire, region, numero_chassis,id_trajet, en_cours, id_louer)
   VALUES ('2022-03-29','accepte', 'test_locataire', 'alger', '1111', 1, true, 3);
  `
);


module.exports = pool;
