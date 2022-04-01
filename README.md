# Mise en oeuvre du REST API

## C'est quoi un REST API
REST est un ensemble de contraintes architecturales. Il ne s'agit ni d'un protocole, ni d'une norme. Les développeurs d'API peuvent mettre en œuvre REST de nombreuses manières.

Lorsqu'un client émet une requête par le biais d'une API RESTful, celle-ci transfère une représentation de l'état de la ressource au demandeur ou point de terminaison. Cette information, ou représentation, est fournie via le protocole HTTP dans l'un des formats suivants : JSON (JavaScript Object Notation), HTML, XLT, Python, PHP ou texte brut. Le langage de programmation le plus communément utilisé est JSON, car, contrairement à ce que son nom indique, il ne dépend pas d'un langage et peut être lu aussi bien par les humains que par les machines. 

Autre point à retenir : les en-têtes et paramètres jouent également un rôle majeur dans les méthodes HTTP d'une requête HTTP d'API RESTful, car ils contiennent des informations d'identification importantes concernant la requête (métadonnées, autorisation, URI, mise en cache, cookies, etc.). Il existe des en-têtes de requête et des en-têtes de réponse. Chacun dispose de ses propres informations de connexion HTTP et codes d'état.

Une API RESTful doit remplir les critères suivants :

1. Une architecture client-serveur constituée de clients, de serveurs et de ressources, avec des requêtes gérées via HTTP

2. Des communications client-serveur stateless, c'est-à-dire que les informations du client ne sont jamais stockées entre les requêtes GET, qui doivent être traitées séparément, de manière totalement indépendante
3. La possibilité de mettre en cache des données afin de rationaliser les interactions client-serveur

4. Un système à couches, invisible pour le client, qui permet de hiérarchiser les différents types de serveurs (pour la sécurité, l'équilibrage de charge, etc.) impliqués dans la récupération des informations demandées
Du code à la demande (facultatif), c'est-à-dire la possibilité d'envoyer du code exécutable depuis le serveur vers le client (lorsqu'il le demande) afin d'étendre les fonctionnalités d'un client

Bien que l'API REST doive répondre à l'ensemble de ces critères, elle est considérée comme étant plus simple à utiliser qu'un protocole tel que SOAP (Simple Object Access Protocol), qui est soumis à des contraintes spécifiques, dont la messagerie XML, la sécurité intégrée et la conformité des transactions, ce qui le rend plus lourd et moins rapide. 

Puisque REST est un ensemble de directives mises en œuvre à la demande, les API REST sont plus rapides et légères, et offrent une évolutivité accrue. Elles sont donc idéales pour l'IoT (Internet des objets) et le développement d'applications mobiles. 

## Architecture générale du REST API

Notre REST API suit l'architecture suivante :
![Architecture du REST API](https://www.coreycleary.me/_next/static/media/Express-REST-API-Struc.aa7ecaa0c41dbb7344c70665a5f5e259.png)

## Technologies utilisées:

- NodeJs pour la logique du REST API.
- PostgresSQL comme SGBD.
- Azure database for postgresql heberger la base de données dans le cloud.
- Heroku pour heberger le REST API dans le cloud.
