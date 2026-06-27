-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Hôte : db
-- Généré le : ven. 26 juin 2026 à 17:12
-- Version du serveur : 12.2.2-MariaDB-ubu2404
-- Version de PHP : 8.3.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `wordle_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `users_id` int(11) DEFAULT NULL,
  `theme` varchar(10) DEFAULT NULL,
  `clavier` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Déchargement des données de la table `settings`
--

INSERT INTO `settings` (`id`, `users_id`, `theme`, `clavier`) VALUES
(1, NULL, '1', NULL),
(2, 4, 'dark', 'azerty'),
(5, 5, 'dark', 'qwerty'),
(7, 6, 'dark', 'qwerty'),
(11, 7, 'dark', 'qwerty'),
(13, 8, 'light', 'qwerty'),
(14, 9, 'light', 'qwerty');

-- --------------------------------------------------------

--
-- Structure de la table `stats_score`
--

CREATE TABLE `stats_score` (
  `id` int(11) NOT NULL,
  `users_id` int(11) DEFAULT NULL,
  `tentatives` int(11) DEFAULT NULL,
  `duree` decimal(11,2) DEFAULT NULL,
  `is_win` tinyint(1) DEFAULT NULL,
  `guess` varchar(100) DEFAULT NULL,
  `resultat` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Déchargement des données de la table `stats_score`
--

INSERT INTO `stats_score` (`id`, `users_id`, `tentatives`, `duree`, `is_win`, `guess`, `resultat`) VALUES
(1, NULL, 3, 11.20, 1, 'trouver', 100),
(2, NULL, 5, 4.23, 0, 'palace', 25),
(3, NULL, 1, 1.85, 1, 'RAITA', 1490),
(4, 3, 1, 2.68, 1, 'SHEEL', 1486),
(5, 3, 1, 2.06, 1, 'BINAL', 1489),
(6, 3, 1, 1.68, 1, 'DULLS', 1491),
(7, 4, 1, 2.27, 1, 'DIOTA', 1488),
(8, 6, 6, 21.39, 0, 'UPLAY', 893),
(9, 6, 6, 21.39, 0, 'UPLAY', 893),
(10, 6, 1, 24.23, 1, 'SPECT', 1378),
(11, 6, 2, 8.28, 1, 'BASYL', 1358),
(12, 6, 1, 23.73, 1, 'CADIE', 1381),
(13, 6, 3, 13.61, 1, 'SUITE', 1231),
(14, 6, 1, 13.10, 1, 'AWOKE', 1434);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `pseudo` varchar(100) NOT NULL,
  `mdp` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `nom`, `prenom`, `email`, `pseudo`, `mdp`) VALUES
(1, 'monchausson', 'lucas', 'lucasmonchausson@gmail.com', 'lucasmeow', 'motdepasse'),
(2, 'p', 'p', 'p@p', 'p', '$2b$10$qv7hKdHV4wI4TCsxcJzvpumsLdD9bXXGamdZocEUcua3SA6kNy0yu'),
(3, 'e', 'e', 'e@e', 'e', '$2b$10$Srlwone62eug0EH3R1qj3u1z0lCcorTmWpQXS/ceyM.ATiGJzpY3K'),
(4, 'y', 'y', 'y@y', 'y', '$2b$10$ygJTu2aPgAqltbfywo/BbucchkZlpuTMB/K.rR9aCrePYQaypEFE2'),
(5, 's', 's', 's@s', 's', '$2b$10$5ycb30MQtxyBmgHgMw0hseA1i9YKSNCK1z.tpU/RWp1RYfD8K.gd.'),
(6, 'c', 'c', 'c@c', 'c', '$2b$10$pehem0MnXTeyWye0.063WuY8H5x6k9xZORWHe6rQP3ttPmfinMuCO'),
(7, 'g', 'g', 'g@g', 'g', '$2b$10$cTeR58m5zAxB6ZxkCblrcuQUOPU.k1HnwDuXbAon1Hgu5Qg7S2fqC'),
(8, 'w', 'w', 'w@w', 'w', '$2b$10$iA7Jc3wMV1aFnliNRPDZS.gVZZ6wWdYGYNde6XqTui5QewYILKJBK'),
(9, 'k', 'k', 'k@k', 'k', '$2b$10$hNaobNyZC0zIQ5Mdleba9.0XLbnfB1.ANz/Yh9dWHYxXQBScT/NUa');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_id_2` (`users_id`),
  ADD KEY `users_id` (`users_id`);

--
-- Index pour la table `stats_score`
--
ALTER TABLE `stats_score`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_id` (`users_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT pour la table `stats_score`
--
ALTER TABLE `stats_score`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `settings`
--
ALTER TABLE `settings`
  ADD CONSTRAINT `1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `stats_score`
--
ALTER TABLE `stats_score`
  ADD CONSTRAINT `1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
