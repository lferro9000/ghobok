-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Počítač: 127.0.0.1
-- Vygenerováno: Ned 27. říj 2013, 20:16
-- Verze MySQL: 5.5.27
-- Verze PHP: 5.4.7

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Databáze: `ghobok`
--

-- --------------------------------------------------------

--
-- Struktura tabulky `maps`
--

CREATE TABLE IF NOT EXISTS `maps` (
  `map_id` smallint(6) NOT NULL AUTO_INCREMENT,
  `map_name` varchar(50) NOT NULL,
  PRIMARY KEY (`map_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=ascii AUTO_INCREMENT=2 ;

--
-- Vypisuji data pro tabulku `maps`
--

INSERT INTO `maps` (`map_id`, `map_name`) VALUES
(1, 'Map number 1');

-- --------------------------------------------------------

--
-- Struktura tabulky `materials`
--

CREATE TABLE IF NOT EXISTS `materials` (
  `material_id` smallint(6) NOT NULL AUTO_INCREMENT,
  `texture_image` varchar(50) NOT NULL,
  `material_category_id` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`material_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=ascii AUTO_INCREMENT=14 ;

--
-- Vypisuji data pro tabulku `materials`
--

INSERT INTO `materials` (`material_id`, `texture_image`, `material_category_id`) VALUES
(1, 'wall-rock.png', NULL),
(2, 'wall-rock2.jpg', NULL),
(3, 'wall-brick.jpg', 1),
(4, 'wall-rock3.jpg', NULL),
(5, 'floor-grass1.jpg', NULL),
(6, 'wall-rock4.jpg', NULL),
(7, 'floor-lava1.jpg', NULL),
(8, 'floor-rock1.jpg', NULL),
(9, 'wall-mossyrock1.jpg', NULL),
(10, 'wall-mossyrock2.jpg', NULL),
(11, 'exit-forest1.jpg', NULL),
(12, 'floor-water.gif', NULL),
(13, 'floor-sand1.jpg', NULL);

-- --------------------------------------------------------

--
-- Struktura tabulky `material_categories`
--

CREATE TABLE IF NOT EXISTS `material_categories` (
  `material_category_id` smallint(6) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(200) NOT NULL,
  PRIMARY KEY (`material_category_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=ascii AUTO_INCREMENT=3 ;

--
-- Vypisuji data pro tabulku `material_categories`
--

INSERT INTO `material_categories` (`material_category_id`, `category_name`) VALUES
(1, 'Floors - Grass'),
(2, 'Walls - Rock');

-- --------------------------------------------------------

--
-- Struktura tabulky `tiles`
--

CREATE TABLE IF NOT EXISTS `tiles` (
  `tile_id` int(11) NOT NULL AUTO_INCREMENT,
  `map_id` smallint(6) NOT NULL,
  `steps_south` smallint(6) NOT NULL,
  `steps_west` smallint(6) NOT NULL,
  `steps_up` smallint(6) NOT NULL DEFAULT '0',
  `direction` tinyint(4) NOT NULL,
  `tile_type` tinyint(4) NOT NULL,
  `material_id` smallint(6) NOT NULL,
  PRIMARY KEY (`tile_id`),
  KEY `map_id` (`map_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=ascii AUTO_INCREMENT=366 ;

--
-- Vypisuji data pro tabulku `tiles`
--

INSERT INTO `tiles` (`tile_id`, `map_id`, `steps_south`, `steps_west`, `steps_up`, `direction`, `tile_type`, `material_id`) VALUES
(313, 1, 5, 4, 0, 0, 0, 1),
(284, 1, 0, -5, 0, 1, 0, 1),
(283, 1, 0, -4, 0, 1, 0, 1),
(206, 1, 0, -2, 0, 1, 1, 4),
(303, 1, 4, 0, 0, 2, 0, 1),
(364, 1, 6, -7, 0, 2, 0, 11),
(305, 1, 7, 1, 0, 3, 0, 1),
(8, 1, 3, 2, 0, 0, 0, 1),
(9, 1, 3, 1, 0, 0, 0, 1),
(255, 1, 0, 0, 0, 1, 0, 1),
(11, 1, 2, 4, 0, 0, 0, 1),
(12, 1, 2, 3, 0, 0, 0, 1),
(13, 1, 2, 2, 0, 0, 0, 1),
(14, 1, 2, 1, 0, 0, 0, 1),
(311, 1, 6, 2, 0, 3, 0, 1),
(16, 1, 1, 5, 0, 0, 0, 1),
(17, 1, 1, 4, 0, 0, 0, 1),
(18, 1, 1, 3, 0, 0, 0, 1),
(19, 1, 1, 2, 0, 0, 0, 1),
(20, 1, 1, 1, 0, 0, 0, 1),
(312, 1, 6, 4, 0, 3, 0, 1),
(341, 1, 6, 5, 0, 2, 2, 4),
(324, 1, 7, 3, 0, 2, 2, 4),
(282, 1, 0, -3, 0, 1, 0, 1),
(285, 1, 0, -6, 0, 1, 0, 1),
(290, 1, 0, 3, 0, 3, 1, 4),
(27, 1, 0, 1, 0, 0, 0, 1),
(207, 1, 0, -3, 0, 1, 1, 4),
(210, 1, 0, -6, 0, 1, 1, 4),
(220, 1, 0, -4, 0, 2, 2, 4),
(208, 1, 0, -4, 0, 1, 1, 4),
(168, 1, 6, 0, 0, 1, 2, 4),
(167, 1, 5, 0, 0, 1, 2, 4),
(256, 1, 1, 0, 0, 2, 0, 1),
(300, 1, 1, 0, 0, 2, 1, 4),
(296, 1, 2, 3, 0, 0, 1, 4),
(294, 1, 3, 2, 0, 3, 1, 4),
(203, 1, 5, 0, 0, 2, 1, 4),
(165, 1, 3, 0, 0, 1, 2, 4),
(297, 1, 2, 2, 0, 1, 1, 4),
(293, 1, 3, 1, 0, 3, 1, 4),
(288, 1, 1, 4, 0, 3, 1, 4),
(162, 1, 1, 0, 0, 1, 2, 4),
(289, 1, 0, 4, 0, 3, 1, 4),
(299, 1, 0, 0, 0, 2, 1, 4),
(259, 1, 3, 1, 0, 2, 2, 4),
(164, 1, 2, 0, 0, 1, 2, 4),
(166, 1, 4, 0, 0, 1, 2, 4),
(295, 1, 3, 3, 0, 3, 1, 4),
(281, 1, 0, -2, 0, 1, 0, 1),
(260, 1, 3, 2, 0, 2, 2, 4),
(298, 1, 2, 1, 0, 1, 1, 4),
(286, 1, 3, 3, 0, 2, 0, 1),
(287, 1, 1, 5, 0, 3, 1, 4),
(291, 1, 0, 2, 0, 3, 1, 4),
(292, 1, 0, 1, 0, 3, 1, 4),
(226, 1, 0, -5, 0, 0, 2, 4),
(307, 1, 7, 3, 0, 3, 0, 1),
(306, 1, 7, 2, 0, 3, 0, 1),
(309, 1, 5, 3, 0, 0, 0, 1),
(308, 1, 6, 3, 0, 0, 0, 1),
(365, 1, 6, -6, 0, 0, 0, 11),
(362, 1, 5, -6, 0, 0, 0, 11),
(209, 1, 0, -5, 0, 1, 1, 4),
(222, 1, 0, -2, 0, 2, 2, 4),
(223, 1, 0, -2, 0, 0, 2, 4),
(205, 1, 0, -1, 0, 1, 1, 4),
(262, 1, 3, 3, 0, 3, 2, 4),
(245, 1, 4, 0, 0, 3, 2, 4),
(263, 1, 2, 4, 0, 2, 2, 4),
(243, 1, 0, -1, 0, 2, 2, 4),
(221, 1, 0, -3, 0, 2, 2, 4),
(204, 1, 6, 0, 0, 2, 1, 4),
(261, 1, 3, 3, 0, 2, 2, 4),
(244, 1, 0, -1, 0, 0, 2, 4),
(265, 1, 1, 5, 0, 2, 2, 4),
(267, 1, 1, 5, 0, 0, 2, 4),
(322, 1, 6, 4, 0, 2, 2, 4),
(323, 1, 7, 3, 0, 3, 2, 4),
(269, 1, 0, 4, 0, 0, 2, 4),
(270, 1, 0, 3, 0, 0, 2, 4),
(271, 1, 0, 2, 0, 0, 2, 4),
(272, 1, 0, 1, 0, 0, 2, 4),
(316, 1, 5, 2, 0, 1, 2, 4),
(339, 1, 6, 5, 0, 3, 0, 7),
(338, 1, 7, 0, 0, 1, 1, 4),
(217, 1, 0, -6, 0, 0, 2, 4),
(218, 1, 0, -6, 0, 2, 2, 4),
(278, 1, 1, 3, 0, 1, 1, 4),
(276, 1, 1, 1, 0, 1, 1, 4),
(279, 1, 2, 4, 0, 1, 1, 4),
(277, 1, 1, 2, 0, 1, 1, 4),
(280, 1, 0, -1, 0, 1, 0, 1),
(320, 1, 5, 4, 0, 3, 2, 4),
(319, 1, 5, 4, 0, 0, 2, 4),
(329, 1, 5, 2, 0, 0, 1, 4),
(334, 1, 7, 3, 0, 2, 1, 4),
(333, 1, 6, 3, 0, 2, 1, 4),
(330, 1, 5, 3, 0, 3, 1, 4),
(332, 1, 6, 4, 0, 2, 1, 4),
(331, 1, 5, 4, 0, 3, 1, 4),
(327, 1, 7, 0, 0, 2, 2, 4),
(335, 1, 7, 2, 0, 1, 1, 4),
(342, 1, 6, 6, 0, 2, 2, 4),
(264, 1, 2, 4, 0, 3, 2, 4),
(343, 1, 6, 6, 0, 3, 2, 4),
(304, 1, 7, 0, 0, 2, 0, 1),
(252, 1, 0, 2, 0, 3, 0, 1),
(273, 1, 0, 0, 0, 0, 2, 4),
(274, 1, 3, 0, 0, 2, 1, 4),
(275, 1, 2, 0, 0, 2, 1, 4),
(302, 1, 5, 0, 0, 2, 0, 1),
(328, 1, 7, 0, 0, 1, 2, 4),
(268, 1, 0, 4, 0, 3, 2, 4),
(301, 1, 6, 0, 0, 2, 0, 1),
(317, 1, 5, 2, 0, 0, 2, 4),
(246, 1, 5, 0, 0, 3, 2, 4),
(253, 1, 0, 3, 0, 3, 0, 1),
(340, 1, 6, 6, 0, 3, 0, 7),
(337, 1, 7, 1, 0, 1, 1, 4),
(247, 1, 6, 0, 0, 3, 2, 4),
(202, 1, 4, 0, 0, 2, 1, 4),
(346, 1, 6, 5, 0, 3, 1, 4),
(344, 1, 6, 6, 0, 0, 2, 4),
(347, 1, 6, 6, 0, 3, 1, 4),
(345, 1, 6, 5, 0, 0, 2, 4),
(325, 1, 7, 2, 0, 2, 2, 4),
(266, 1, 1, 5, 0, 3, 2, 4),
(326, 1, 7, 1, 0, 2, 2, 4),
(318, 1, 5, 3, 0, 0, 2, 4),
(363, 1, 4, -6, 0, 0, 0, 11),
(349, 1, 1, -7, 0, 0, 1, 4),
(350, 1, 2, -7, 0, 0, 1, 4),
(348, 1, 0, -7, 0, 3, 1, 4),
(336, 1, 6, 2, 0, 0, 1, 4),
(254, 1, 0, 4, 0, 3, 0, 1),
(258, 1, 3, 0, 0, 2, 0, 1),
(257, 1, 2, 0, 0, 2, 0, 1),
(224, 1, 0, -3, 0, 0, 2, 4),
(353, 1, 0, -7, 0, 0, 2, 4),
(219, 1, 0, -5, 0, 2, 2, 4),
(351, 1, 2, -7, 0, 3, 2, 4),
(355, 1, 1, -7, 0, 1, 2, 4),
(352, 1, 1, -7, 0, 3, 2, 4),
(354, 1, 0, -7, 0, 1, 2, 4),
(357, 1, 0, -7, 0, 0, 0, 1),
(356, 1, 2, -7, 0, 1, 2, 4),
(359, 1, 2, -7, 0, 0, 0, 1),
(358, 1, 1, -7, 0, 0, 0, 1),
(315, 1, 6, 2, 0, 1, 2, 4),
(314, 1, 7, 1, 0, 0, 2, 4),
(310, 1, 5, 2, 0, 1, 0, 1),
(225, 1, 0, -4, 0, 0, 2, 4);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
