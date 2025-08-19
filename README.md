- Dans les settings, ajouter un input pour les réseaux sociaux et le photo de profil
- Dans la navbar, faire en sorte de mettre en avant l'onglet en cours
- Faire une passe sur le mobile du funnel
- Voir comment mettre en prod sur appwrite
- Améliorer la page summary
- Mettre l'email en 1ère étape ? => faire un petit widget, pour faire en sorte de récupérer le mail indépendamment du formulaire (un widget alternative, prise de rendez vous) => le conceptualiser.
- Mettre en place les réseaux sociaux (twitter, autres)
- Pour le bouton précédent dans le funnel, faire en sorte de le rendre moins gras
- Comme on va faire des ads, j'aimerais bien faire en sorte de tracké les utilisateurs. Je pense utiliser le système de session de appwrite

Vendredi 15 aout

- Retravailler la page summary
- Commencer à intégrer le travaille de lovable, pour le studio (juste une liste de projet, ainsi qu'un partage d'url)
- Ajouter les réseaux sociaux en accès rapide dans les infos du studios

Pas la prio mais cool

- Mise en place du hover qui charge pour afficher des aides complémentaires (s'inspirer du lovable)
- Faire une logique, client déjà existant => email ou session appwrite, (pas d'étape contact, et redirection après la dernière étape, vers la page du dashboard du projet)
- Essayer de mettre les infos du studio au dessus des questions réponses plutôt qu'à gauche

Pas sur ou à réfléchir

- Réfléchir à un moyen de mettre en avant le studio: par exemple, on pourrait faire un carousel en bas de la page, qui suivant la longueur de la page affiche 1 à 4, projets (% width, 150px), avec un titre du projet. Ce serait bien je pense d'afficher ça en fonction du type choisi ainsi que de l'objectif => cette idée je pense n'est pas essentielle pour l'instant. Mais je pense que ça permettrait à l'utilisateur de visualiser au mieux les capacités du studio
- Amélioration des sections (au niveau du titre etc)
- Réfléchir à la partie technique

Done :

- Ajouter un overlay style modal, quand l'utilisateur consulte les informations du studios (voir mantine, overlay) ==> mettre du blut ?
- A partir de cette Id, récupérer tous les projets d'un studio
- Retravailler le hover des cartes
- Mettre un Id de studio statique pour l'instant
- Faire une belle logique, pour créer le client s'il y en a besoin, et l'utilisateur
- Mise en place d'un système de sélection de réponse rapide
- Bouton Skip
- Création des composants inputs et de leurs hover
- Rechercher un effet visuel pour transitionner entre les étapes
- Dans les titres mettre en valeur les mots clés importants pour l'étape (italic, gradient, couleur primaire)
