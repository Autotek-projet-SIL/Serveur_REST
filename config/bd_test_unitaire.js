const pg_mem = require("pg-mem");

// Base de données en memoire pour les test unitaires
const pg = pg_mem.newDb().adapters.createPg();

const pool = new pg.Pool();
pool.query(
  `
CREATE TABLE public.am (
  id_am character varying(28)  NOT NULL,
  nom character varying(50)  NOT NULL,
  prenom character varying(50)  NOT NULL,
  numero_telephone character varying(10)  NOT NULL,
  email character varying(50)  NOT NULL,
  mot_de_passe character varying(50)  NOT NULL,
  photo_am character varying(255)  NOT NULL,
  CONSTRAINT am_pkey PRIMARY KEY (id_am),
  CONSTRAINT am_email_key UNIQUE (email)
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
  photo_atc character varying(255) NOT NULL,
  CONSTRAINT atc_pkey PRIMARY KEY (id_atc),
  CONSTRAINT atc_email_key UNIQUE (email)
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
  photo_decideur character varying(255) NOT NULL,
  CONSTRAINT decideur_pkey PRIMARY KEY (id_decideur),
  CONSTRAINT decideur_email_key UNIQUE (email)
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
    photo_identite_verso character varying(255) NOT NULL,
    CONSTRAINT locataire_pkey PRIMARY KEY (id_locataire),
    CONSTRAINT locataire_email_key UNIQUE (email)
    );
    `
);

pool.query(
  `
  CREATE TABLE public.demandeinscription (
  id_demande_inscription serial NOT NULL,
  statut character varying(50) NOT NULL,
  date_inscription date NOT NULL,
  id_locataire character varying(28) NOT NULL,
  email character varying(50),
  CONSTRAINT demandeinscription_pkey PRIMARY KEY (id_demande_inscription),
  CONSTRAINT demandeinscription_id_locataire_fkey FOREIGN KEY (id_locataire)
      REFERENCES public.locataire (id_locataire) MATCH SIMPLE
      ON UPDATE CASCADE
      ON DELETE CASCADE
  );
    `
);

pool.query(
  `
CREATE TABLE public.justificatif (
  id_justificatif serial NOT NULL,
  objet character varying(50) COLLATE pg_catalog."default" NOT NULL,
  descriptif character varying(50) COLLATE pg_catalog."default" NOT NULL,
  id_demande_inscription serial NOT NULL ,
  CONSTRAINT justificatif_pkey PRIMARY KEY (id_justificatif),
  CONSTRAINT justificatif_id_demande_inscription_fkey FOREIGN KEY (id_demande_inscription)
      REFERENCES public.demandeinscription (id_demande_inscription) MATCH SIMPLE
      ON UPDATE CASCADE
      ON DELETE CASCADE
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
    CREATE TABLE public.typevehicule (
      id_type_vehicule serial NOT NULL ,
      libelle character varying(50) NOT NULL,
      tarification real NOT NULL,
      CONSTRAINT typevehicule_pkey PRIMARY KEY (id_type_vehicule),
      CONSTRAINT typevehicule_tarification_check CHECK (tarification >= 0::double precision)
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
      id_type_vehicule serial NOT NULL ,
      id_am character varying(28),
      image_vehicule character varying(255) NOT NULL,
      chemin_image_vehicule character varying(255),
      CONSTRAINT vehicule_pkey PRIMARY KEY (numero_chassis),
      CONSTRAINT vehicule_id_am_fkey FOREIGN KEY (id_am)
          REFERENCES public.am (id_am) MATCH SIMPLE
          ON UPDATE NO ACTION
          ON DELETE NO ACTION,
      CONSTRAINT vehicule_id_type_vehicule_fkey FOREIGN KEY (id_type_vehicule)
          REFERENCES public.typevehicule (id_type_vehicule) MATCH SIMPLE
          ON UPDATE NO ACTION
          ON DELETE NO ACTION
    );
    `
);
pool.query(
  `
    CREATE TABLE public.tache (
      id_tache serial NOT NULL ,
      objet character varying(50)  NOT NULL,
      descriptif character varying(255)  NOT NULL,
      etat character varying(50)  NOT NULL,
      date_debut date NOT NULL,
      date_fin date NOT NULL,
      id_am character varying(28)  NOT NULL,
      etat_avancement real NOT NULL,
      type_tache character varying(28)  NOT NULL,
      CONSTRAINT tache_pkey PRIMARY KEY (id_tache),
      CONSTRAINT tache_id_am_fkey FOREIGN KEY (id_am)
          REFERENCES public.am (id_am) MATCH SIMPLE
          ON UPDATE CASCADE
          ON DELETE CASCADE
    );
    `
);
pool.query(
  `
    CREATE TABLE public.panne (
      id_panne serial NOT NULL,
      numero_chassis character varying(10) COLLATE pg_catalog."default" NOT NULL,
      id_tache serial NOT NULL,
      CONSTRAINT panne_pkey PRIMARY KEY (id_panne),
      CONSTRAINT panne_id_tache_fkey FOREIGN KEY (id_tache)
          REFERENCES public.tache (id_tache) MATCH SIMPLE
          ON UPDATE CASCADE
          ON DELETE SET NULL,
      CONSTRAINT panne_numero_chassis_fkey FOREIGN KEY (numero_chassis)
          REFERENCES public.vehicule (numero_chassis) MATCH SIMPLE
          ON UPDATE CASCADE
          ON DELETE CASCADE
    );
    `
);
pool.query(
  `
  CREATE TABLE IF NOT EXISTS public.louer
  (
      status_demande_location character varying(50) NOT NULL,
      id_locataire character varying(28) NOT NULL,
      numero_chassis character varying(10),
      id_louer serial NOT NULL ,
      en_cours boolean,
      heure_debut time without time zone,
      heure_fin time without time zone,
      region character varying(50) NOT NULL,
      date_debut date NOT NULL,
      latitude_depart real NOT NULL,
      longitude_depart real NOT NULL,
      latitude_arrive real NOT NULL,
      longitude_arrive real NOT NULL,
      suivi_location character varying(50),
      CONSTRAINT louer_pkey PRIMARY KEY (id_louer),
      CONSTRAINT louer_id_locataire_fkey FOREIGN KEY (id_locataire)
          REFERENCES public.locataire (id_locataire) MATCH SIMPLE
          ON UPDATE NO ACTION
          ON DELETE NO ACTION,
      CONSTRAINT louer_numero_chassis_fkey FOREIGN KEY (numero_chassis)
          REFERENCES public.vehicule (numero_chassis) MATCH SIMPLE
          ON UPDATE NO ACTION
          ON DELETE NO ACTION
  )
    `
);

pool.query(
  `
  CREATE TABLE IF NOT EXISTS public.payer
  (
      id_locataire character varying(28) NOT NULL,
      type_paiement character varying(50) NOT NULL,
      heure_paiement time without time zone NOT NULL,
      date_paiement date NOT NULL,
      id_payer serial NOT NULL ,
      CONSTRAINT payer_pkey PRIMARY KEY (id_payer),
      CONSTRAINT payer_id_locataire_fkey FOREIGN KEY (id_locataire)
          REFERENCES public.locataire (id_locataire) MATCH SIMPLE
          ON UPDATE NO ACTION
          ON DELETE NO ACTION
  );
    `
);
pool.query(
  `
  CREATE TABLE public.facture (
  id_facture serial NOT NULL ,
  date_facture date NOT NULL,
  montant real NOT NULL,
  id_payer serial NOT NULL,
  heure time without time zone NOT NULL,
  tva real NOT NULL,
  id_louer serial NOT NULL ,
  CONSTRAINT facture_pkey PRIMARY KEY (id_facture),
  CONSTRAINT payer_id_facture_fkey FOREIGN KEY (id_payer)
  REFERENCES public.payer (id_payer) MATCH SIMPLE
  ON UPDATE NO ACTION
  ON DELETE NO ACTION,
  CONSTRAINT id_louer FOREIGN KEY (id_louer)
      REFERENCES public.louer (id_louer) MATCH SIMPLE
      ON UPDATE CASCADE
      ON DELETE CASCADE,
  CONSTRAINT facture_montant_check CHECK (montant > 0::double precision),
  CONSTRAINT facture_tva_check CHECK (tva > 0::double precision)
  )
    `
);

pool.query(
  `
  CREATE TABLE public.demandesupport(
  id_demande_support serial NOT NULL,
  objet character varying(50) NOT NULL,
  descriptif character varying(255) NOT NULL,
  reponse character varying(255),
  email character varying(50) NOT NULL,
  id_louer serial NOT NULL ,
  CONSTRAINT demandesupport_pkey PRIMARY KEY (id_demande_support),
  CONSTRAINT demandesupport_id_louer_fkey FOREIGN KEY (id_louer)
      REFERENCES public.louer (id_louer) MATCH SIMPLE
      ON UPDATE CASCADE
      ON DELETE CASCADE    
  );
`
);
pool.query(
  `
CREATE TABLE IF NOT EXISTS public.marque
(
    id_marque serial NOT NULL ,
    libelle character varying(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT id_marque_pkey PRIMARY KEY (id_marque)
)
`
);
pool.query(
  `
  CREATE TABLE IF NOT EXISTS public.modele
  (
      id_modele serial NOT NULL,
      id_marque serial NOT NULL,
      libelle character varying(50)  NOT NULL,
      CONSTRAINT modele_pkey PRIMARY KEY (id_modele),
      CONSTRAINT modele_id_marque_fkey FOREIGN KEY (id_marque)
          REFERENCES public.marque (id_marque) MATCH SIMPLE
          ON UPDATE CASCADE
          ON DELETE CASCADE
  )
`
);

pool.query(
  `
    INSERT INTO public.locataire(
        id_locataire, nom, prenom, numero_telephone, email, mot_de_passe, statut_compte, photo_identite_recto, photo_selfie, photo_identite_verso)
        VALUES ('test_locataire1','test_locataire1', 'test_locataire1', '0541251311', 'test_locataire1@gmail.com', 'test_locataire1', 'f', 'test_locataire1', 'test_locataire1', 'test_locataire1');
        VALUES ('test_locataire2','test_locataire1', 'test_locataire1', '0541251311', 'test_locataire1@gmail.com', 'test_locataire1', 'f', 'test_locataire1', 'test_locataire1', 'test_locataire1');
        `
);
pool.query(
  `
    INSERT INTO public.demandeinscription(
    statut, date_inscription, id_locataire, email)
    VALUES ('en attente','2022-03-30','test_locataire1','test_locataire1@gmail.com');
   `
);
pool.query(
  `
        INSERT INTO public.decideur(id_decideur, nom, prenom, numero_telephone, email, mot_de_passe, photo_decideur)
        VALUES ('test_decideur1','test_decideur1', 'test_decideur1', '0541251311', 'test_decideur1@gmail.com', 'test_decideur1','test_decideur1');
    `
);
pool.query(
  `
        INSERT INTO public.atc(id_atc, nom, prenom, numero_telephone, email, mot_de_passe,est_root, photo_atc)
        VALUES ('test_atc1','test_atc1', 'test_atc1', '0541251311', 'test_atc1@gmail.com', 'test_atc1','f','test_atc1');
    `
);
pool.query(
  `
        INSERT INTO public.am(id_am, nom, prenom, numero_telephone, email, mot_de_passe, photo_am)
       VALUES ('test_am1','test_am1', 'test_am1', '0541251311', 'test_am1@gmail.com', 'test_am1','test_am1'),('test_am2','test_am2', 'test_am2', '0541251311', 'test_am2@gmail.com', 'test_am2','test_am2');
    `
);

pool.query(
  `
    INSERT INTO public.typevehicule
    (id_type_vehicule, libelle, tarification)
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
      numero_chassis, marque, modele, couleur, id_type_vehicule, id_am, image_vehicule, chemin_image_vehicule)
        VALUES ('test_v1','test_marque1', 'test_modele1', 'test_couleur1', '1', 'test_am1','test_img1','test_chemin_img1'), ('test_v2','test_marque2', 'test_modele2', 'test_couleur2', '2', 'test_am2','test_img2','test_chemin_img2');
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
  `
  INSERT INTO public.louer(
   date_debut,   status_demande_location, id_locataire, region, numero_chassis, en_cours,latitude_depart,longitude_depart,latitude_arrive,longitude_arrive)
   VALUES ('2022-03-29','accepte', 'test_locataire1', 'alger', 'test_v1','true',0,0,1,1),
   ('2022-03-02','accepte', 'test_locataire1', 'alger', 'test_v2','false',0,0,1,1);
  `
);
pool.query(
  ` INSERT INTO public.payer(
    id_locataire, type_paiement, heure_paiement, date_paiement,id_payer)
    VALUES ('test_locataire1', 'stripe', '08:00:00', '2022-09-02',1);
    `
);
pool.query(
  ` INSERT INTO public.facture(
    date_facture, montant, heure, tva, id_louer,id_payer)
    VALUES ('2022-03-30', 14000, '08:00', '17', 1,1);
    `
);
pool.query(
  `INSERT INTO public.demandesupport(
    objet, descriptif, reponse, email, id_louer )
    VALUES ('demandeSupport', 'ceci est un exemple de demande de support', 'Ceci est une reponse', 'email@gmail.com', 1 );  
`
);
pool.query(
  ` INSERT INTO public.tache(
     objet, descriptif, etat, date_debut, date_fin, id_am, etat_avancement, type_tache)
    VALUES ( 'test_objet1', 'descriptif1', 'en cours' , '2022-03-30', '2021-03-30', 'test_am1', 40 , 'type_tache1');
    `
);

pool.query(
  ` INSERT INTO public.panne(
    numero_chassis, id_tache)
    VALUES ( 'test_v1', 1 );
    `
);
module.exports = pool;
