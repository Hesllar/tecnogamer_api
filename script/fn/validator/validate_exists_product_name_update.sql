/**
 * Name: Valida si ya existe el nombre del producta a actualizar en la base de datos
 * Creator: Hesllar Linzmayer
 * Description: Valida si ya existe el nombre del producta a actualizar en la base de datos
 * Create: 26-12-2023
 * Last Update: **-**-****
 * select * from validate_exists_product_name_update(1, 'Logitech G Pro Wireless Gaming Mouse - Black');
 */

CREATE OR REPLACE FUNCTION validate_exists_product_name_update(p_id int, p_name varchar)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$

BEGIN
	
	if(not exists(select p.id from product p where p.id = p_id and lower(p.name) = lower(p_name)))then
		if(exists (select p2.id from product p2 where lower(p2.name) = lower(p_name)))then 
			return true;
		end if;
	end if;

	return false;

	EXCEPTION
		WHEN OTHERS THEN
			RAISE;
END;
$function$
;