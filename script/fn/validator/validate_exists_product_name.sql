/**
 * Name: Validar si el nombre del producto existe en la base de datos
 * Creator: Hesllar Linzmayer
 * Description: Validar si el nombre del producto existe en la base de datos
 * Create: 24-12-2023
 * Last Update: **-**-****
 * select * from validate_exists_product_name('Logitech x');
 */


CREATE OR REPLACE FUNCTION validate_exists_product_name(p_name varchar)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$

BEGIN
	
	if(exists(select p."name" from product p where lower(p.name) = lower(p_name)))then 
		return true;
	end if;

	return false;

	EXCEPTION
		WHEN OTHERS THEN
			RAISE;
END;
$function$
;