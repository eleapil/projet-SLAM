-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Hôte : db
-- Généré le : mar. 05 mai 2026 à 06:39
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
  `theme` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Déchargement des données de la table `settings`
--

INSERT INTO `settings` (`id`, `users_id`, `theme`) VALUES
(1, NULL, 1);

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
(2, NULL, 5, 4.23, 0, 'palace', 25);

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
-- Index pour les tables déchargées
--

--
-- Index pour la table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`),
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `stats_score`
--
ALTER TABLE `stats_score`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

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
