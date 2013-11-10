/* find duplicate tiles */

SELECT * FROM tiles t1
JOIN tiles t2 ON (t1.steps_up = t2.steps_up AND t1.steps_east = t2.steps_east AND t1.steps_south = t2.steps_south AND t1.tile_type = t2.tile_type AND t1.direction = t2.direction)
WHERE t1.tile_id > t2.tile_id
