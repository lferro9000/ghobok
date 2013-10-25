
CREATE TABLE IF NOT EXISTS `maps` (
  `map_id` smallint(6) NOT NULL AUTO_INCREMENT,
  `map_name` varchar(50) NOT NULL,
  PRIMARY KEY (`map_id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 ;

INSERT INTO maps (map_name) VALUES ('Map number 1');

--
-- Struktura tabulky `materials`
--

CREATE TABLE IF NOT EXISTS `materials` (
  `material_id` smallint(6) NOT NULL AUTO_INCREMENT,
  `texture_image` varchar(50) NOT NULL,
  PRIMARY KEY (`material_id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 ;

INSERT INTO materials (texture_image) VALUES ('wall-rock.png'),('wall-rock2.jpg'),('wall-brick.jpg');

--
-- Struktura tabulky `tiles`
--

CREATE TABLE IF NOT EXISTS `tiles` (
  `tile_id` int(11) NOT NULL AUTO_INCREMENT,
  `map_id` smallint(6) NOT NULL,
  `steps_south` smallint(6) NOT NULL,
  `steps_west` smallint(6) NOT NULL,
  `steps_up` smallint(6) NOT NULL DEFAULT 0,
  `direction` tinyint(4) NOT NULL,
  `tile_type` tinyint(4) NOT NULL,
  `material_id` smallint(6) NOT NULL,
  PRIMARY KEY (`tile_id`),
  KEY `map_id` (`map_id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 ;

INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,6,0,0,0,1);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,5,1,0,0,1);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,5,0,0,0,1);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,4,2,0,0,1);	
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,4,1,0,0,1);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,4,0,0,0,1);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,3,3,0,0,1);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,3,2,0,0,1);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,3,1,0,0,1);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,3,0,0,0,1);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,2,4,0,0,1);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,2,3,0,0,1);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,2,2,0,0,1);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,2,1,0,0,1);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,2,0,0,0,1);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,1,5,0,0,1);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,1,4,0,0,1);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,1,3,0,0,1);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,1,2,0,0,1);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,1,1,0,0,1);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,1,0,0,0,1);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,0,6,0,0,1);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,0,5,0,0,1);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,0,4,0,0,1);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,0,3,0,0,1);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,0,2,0,0,1);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,0,1,0,0,1);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,0,0,0,0,1);

INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,6,0,0,1,3);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,5,1,0,1,3);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,5,0,0,1,3);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,4,2,0,1,3);	
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,4,1,0,1,3);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,4,0,0,1,3);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,3,3,0,1,3);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,3,2,0,1,3);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,3,1,0,1,3);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,3,0,0,1,3);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,2,4,0,1,3);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,2,3,0,1,3);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,2,2,0,1,3);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,2,1,0,1,3);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,2,0,0,1,3);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,1,5,0,1,3);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,1,4,0,1,3);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,1,3,0,1,3);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,1,2,0,1,3);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,1,1,0,1,3);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,1,0,0,1,3);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,0,6,0,1,3);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,0,5,0,1,3);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,0,4,0,1,3);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,0,3,0,1,3);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,0,2,0,1,3);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,0,1,0,1,3);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,0,0,0,1,3);

INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,6,-1,1,2,2);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,5,-1,1,2,2);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,4,-1,1,2,2);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,3,-1,1,2,2);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,2,-1,1,2,2);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,1,-1,1,2,2);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,0,-1,1,2,2);

INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,7,0,0,2,2);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,6,1,0,2,2);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,5,2,0,2,2);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,4,3,0,2,2);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,3,4,0,2,2);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,2,5,0,2,2);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,1,6,0,2,2);

INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,6,1,3,2,2);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,5,2,3,2,2);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,4,3,3,2,2);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,3,4,3,2,2);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,2,5,3,2,2);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,1,6,3,2,2);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,0,7,3,2,2);

INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,-1,6,2,2,2);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,-1,5,2,2,2);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,-1,4,2,2,2);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,-1,3,2,2,2);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,-1,2,2,2,2);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,-1,1,2,2,2);
INSERT INTO tiles (map_id, steps_south, steps_west, direction, tile_type, material_id)  values (1,-1,0,2,2,2);