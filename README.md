# Mise en oeuvre du Serveur REST API

## C'est quoi la technologie REST

Le protocole REST (REpresentational State Transfer) constitue un style architectural et un mode de communication fréquemment utilisé dans le développement de services Web. Le recours à REST est souvent privilégié par rapport au style SOAP, plus lourd, car REST ne consomme pas autant de bande passante, ce qui rend son utilisation plus pratique sur Internet.

Alliant architecture découplée et communications légères entre producteur et consommateur, REST est un mode apprécié de création d'interfaces de programmation d'applications (API) dans le Cloud, du type de celles que fournissent Amazon, Microsoft et Google. Les services Web qui utilisent l'architecture REST sont appelés API RESTful ou API REST.

L'architecture REST, généralement exécutée sur le protocole HTTP, obéit à plusieurs contraintes :

1. Elle dissocie les consommateurs des producteurs.
2. Elle est sans état.
3. Elle peut tirer parti d'un cache.
4. Elle utilise un système de couches.
5. Son interface est uniforme.

Dans le style REST, les interactions entre clients et services sont améliorées par le recours à un nombre limité d'opérations. L'affectation aux ressources (noms) de leurs propres identifiants URI (Universal Resource Identifiers) uniques autorise une grande souplesse. Etant donné que chaque operation possède une signification spéciale (GET, POST, PUT et DELETE), REST permet d'éviter toute ambiguïté.

## Avantages

1. Les services Web RESTful sont faciles à exploiter à l'aide de la plupart des outils, y compris ceux qui sont gratuits ou peu onéreux. REST s'impose peu à peu comme standard en matière d'interaction entre systèmes. En particulier, la plupart des services Web RESTful constituent le modèle retenu par les fournisseurs de Cloud pour externaliser leurs services en Cloud.
2. REST utilise un format de message plus petit que SOAP. SOAP emprunte le langage XML pour tous les messages, ce qui augmente leur taille et diminue donc leur efficacité. Autrement dit, le protocole REST associe des performances supérieures à un coût moindre à long terme. De plus, comme il ne requiert aucun traitement intensif, il s'avère bien plus rapide que le protocole SOAP traditionnel.
3. REST est conçu pour une utilisation sur un Internet/Web ouvert. Il constitue un meilleur choix pour les applications Web et à plus forte raison pour les plateformes en Cloud

## Inconvenients

1. REST n'impose pas des contraintes en termes de securite comme SOAP ce qui peut la rendre vunérable aux attaques externes.
2. Le manque de normes et de spécifications formelles ajoutent des défis aux tâches périphériques pour la maintenance des systèmes et des services (découverte, recherche, composition, évolution, adaptation).
3. Les fonctionnalités plus complexes ne sont pas toujours disponibles.
4. Il faut une organisation des données.

## Architecture générale du REST API

Dans ce projet le serveur REST API suit l'architecture suivante :

![Architecture du REST API](https://www.coreycleary.me/_next/static/media/Express-REST-API-Struc.aa7ecaa0c41dbb7344c70665a5f5e259.png)



## Types de requetes http:

- **GET :** La méthode GET demande une représentation de la ressource spécifiée. Les requêtes GET doivent uniquement être utilisées afin de récupérer des données.

- **POST :** La méthode POST est utilisée pour envoyer une entité vers la ressource indiquée. Cela entraîne généralement un changement d'état ou des effets de bord sur le serveur.

- **PUT :** La méthode PUT remplace toutes les représentations actuelles de la ressource visée par le contenu de la requête.

- **DELETE :** La méthode DELETE supprime la ressource indiquée.

## Technologies utilisées:

1. **NodeJs :** Node.js est une plateforme logicielle libre en JavaScript, orientée vers les applications réseau évènementielles hautement concurrentes qui doivent pouvoir monter en charge.
2. **PostgresSQL :** PostgreSQL est un système de gestion de base de données relationnelle orienté objet puissant et open source qui est capable de prendre en charge en toute sécurité les charges de travail de données les plus complexes. Alors que MySQL donne la priorité à l'évolutivité et aux performances, Postgres donne la priorité à la conformité et à l'extensibilité SQL.
3. **Azure database for postgresql:** est un service de base de données relationnelle basé sur le moteur de base de données Postgres open source. Il s’agit d’une base de données en tant que service entièrement gérée qui peut gérer des charges de travail critiques avec des performances prévisibles, une sécurité, une haute disponibilité et une évolutivité dynamique. Dans le cas de notre projet on se servira de ce service pour heberger notre base de données dans le cloud.
4. **Heroku :** Heroku est une plateforme cloud en tant que service (PaaS) axée sur les conteneurs. La plateforme est élégante, flexible et facile à utiliser, offrant ainsi un moyen simple et rapide de mettre en œuvre des applications. Heroku est entièrement géré, ce qui permet aux développeurs de se concentrer sur le produit principal, sans avoir à maintenir l'infrastructure des applications. Les outils, services et flux de travail intégrés sont tous méticuleusement conçus pour optimiser la productivité des individus comme des équipes.
5. **Firebase :** Firebase est le nom d’une plateforme mobile de Google qui facilite la création de back-end à la fois scalable et performant. En d’autres termes, il s’agit d’une plateforme qui permet de développer rapidement des applications pour mobile et pour le web.
6. **Npm :** est le gestionnaire de paquets par défaut pour l'environnement d'exécution JavaScript Node.js.

## Prerequis

1. Il faut installer la derniere version de NodeJs. NodeJs est disponible en telechargement gratuit via le lien suivant: [https://nodejs.org/en/](https://nodejs.org/en/download/)
2. Il faut installer la derniere version de PostgreSQL. PostgreSQL est disponible en telechargement gratuit via le lien suivant: [https://nodejs.org/en/](https://www.postgresql.org/download/)

## Setup

1. Cloner le code du repository:
```
git clone https://github.com/Autotek-projet-SIL/Serveur_REST.git
```
2. Installer toute les dependances du projet:
 ```
npm i
```
3. Demarrer le serveur:
```
nodemon index.js
```
**Remarque:** Avant de demarrer le serveur, il faut s'assurer qu'aucune application occupe le port 3000, car le serveur demarre sur le port 3000.

## Tests

1. Il faut s'assurer que toutes les dependances sont bien installées:
```
npm i
```
2. Lancer les tests unitaires:
 ```
npm run test
```
3. Consulter la couverture du code: Pour connaitre la couverture du code, il faut se rendre dans le repertoire /converage et ouvrir le fichier index.html avec votre navigateur par défaut.

**Remarque:** Avant de lancer les tests unitaires, il faut s'assurer qu'aucune application occupe le port 4000, car le serveur de test demarre sur le port 4000.
