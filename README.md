# Wordle — Projet BTS SIO SLAM

Projet académique réalisé dans le cadre du BTS SIO option SLAM. Il s'agit d'une reproduction du jeu **Wordle** en version web full-stack, avec gestion des utilisateurs, historique des scores et personnalisation.

---

## Description du projet

Wordle est un jeu de devinette de mots. L'objectif est de trouver un mot de 5 lettres en 6 tentatives maximum. Après chaque essai, des indices colorés indiquent si une lettre est correcte, mal placée ou absente du mot.

Cette implémentation propose :

- **Authentification** : inscription, connexion et gestion du profil utilisateur
- **Jeu complet** : grille de jeu, clavier virtuel, affichage des résultats
- **Statistiques** : suivi des scores, nombre de tentatives, durée de chaque partie
- **Classement** : scoreboard avec les meilleurs joueurs
- **Personnalisation** : choix du thème (clair / sombre) et du type de clavier (AZERTY / QWERTY)

---

## Architecture

Le projet est organisé en deux parties distinctes :

```
projet-SLAM/
├── backend/          # API REST — Node.js / Express / TypeScript
│   └── src/
│       ├── server.ts         # Point d'entrée du serveur (port 3000)
│       ├── db.ts             # Connexion au pool MariaDB
│       ├── models/           # Modèles de données (User, Setting, Stat_score)
│       └── routes/           # Routes API (Users, Stats, Settings)
├── frontend/         # Interface — React / TypeScript / Tailwind CSS
│   ├── public/       # Image de l'icon du jeu
│   └── src/
│       ├── App.tsx           # Composant racine
│       └── components/       # Tous les composants React (Jeu, Grille, Clavier…)
└── init_bdd/         # Initialisation de la base de données
    ├── docker-compose.yml    # MariaDB + phpMyAdmin via Docker
    └── wordle_db.sql         # Schéma et données initiales
```

### Stack technique

| Couche | Technologie |
|--------|-------------|
| Frontend | React 19, TypeScript, Tailwind CSS, Vite |
| Backend | Node.js, Express 5, TypeScript, Vite |
| Base de données | MariaDB 12 |
| Sécurité | bcrypt (hachage des mots de passe) |
| ORM / Driver | mariadb (pool de connexions) |
| Conteneurisation | Docker + phpMyAdmin |

---

## Prérequis

Avant d'installer le projet, assurez-vous d'avoir les outils suivants installés sur votre machine :

- [Node.js](https://nodejs.org/) v18 ou supérieur
- [npm](https://www.npmjs.com/) v9 ou supérieur
- [Docker](https://www.docker.com/) et [Docker Compose](https://docs.docker.com/compose/)

---

## Installation et lancement

### Étape 1 — Cloner le projet

```bash
git clone https://github.com/eleapil/projet-SLAM.git
cd wordle/projet-SLAM
```

### Étape 2 — Démarrer la base de données

Depuis le dossier `init_bdd`, lancez MariaDB et phpMyAdmin avec Docker :

```bash
cd init_bdd
docker-compose up -d
```

Cela démarre :
- **MariaDB** sur le port `3306` avec la base `wordle_db` pré-remplie
- **phpMyAdmin** accessible sur [http://localhost:8081] (identifiants : `root` / `root`)

### Étape 3 — Configurer le backend

Dans le dossier `backend`, créez un fichier `.env` pour la connexion à la base de données :

```bash
cd ../backend
```

Se rendre sur le site [https://developer.wordnik.com/] pour se créer un compte afin de demander une clé API
(Il s'agit de l'API utilisé pour récupérer des mots aléatoires)

Créez le fichier `.env` avec le contenu suivant :

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_NAME=wordle_db

VITE_WORDNIK_KEY=votre_clé_personnelle
```

Installez les dépendances :

```bash
npm install
```

Lancez le serveur backend (port 3000) :

```bash
npx tsx src/server.ts
```

Le serveur est accessible sur [http://localhost:3000].

### Étape 4 — Lancer le frontend

Ouvrez un nouveau terminal, puis depuis le dossier `frontend` :

```bash
cd ../frontend
npm install
npm run dev
```

L'interface est accessible sur [http://localhost:5173].

---

## API — Endpoints disponibles

| Méthode | Route | Description |
|---------|-------|-------------|
| `GET` | `/api/users` | Liste de tous les utilisateurs |
| `POST` | `/api/users` | Inscription d'un nouvel utilisateur |
| `GET` | `/api/users/:id` | Récupérer un utilisateur par ID |
| `POST` | `/api/users/login` | Connexion (retourne les infos du joueur) |
| `PUT` | `/api/users/update-profile` | Modifier le profil utilisateur |
| `GET` | `/api/stats` | Récupérer les statistiques de jeu |
| `GET` | `/api/settings` | Récupérer les paramètres d'un utilisateur |

---

## Base de données

La base `wordle_db` contient trois tables :

- **`users`** : id, nom, prénom, email, pseudo, mot de passe (haché avec bcrypt)
- **`stats_score`** : id, users_id, tentatives, durée, is_win, mot deviné, résultat
- **`settings`** : id, users_id, thème (light/dark), type de clavier (azerty/qwerty)

Le fichier `init_bdd/wordle_db.sql` est automatiquement exécuté au premier démarrage du conteneur Docker.

---

Eléa Pilliod -- Lucas Marchasson

Projet réalisé dans le cadre du BTS SIO — option SLAM.
