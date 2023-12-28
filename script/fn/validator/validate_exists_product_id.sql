/**
 * Name: Validar si el id del producto existe en la base de datos
 * Creator: Hesllar Linzmayer
 * Description: Validar si el id del producto existe en la base de datos
 * Create: 26-12-2023
 * Last Update: **-**-****
 * select * from validate_exists_product_id(1);
 */


CREATE OR REPLACE FUNCTION validate_exists_product_id(p_id int)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$

BEGIN
	
	if(exists(select p.id from product p where p.id = p_id))then 
		return true;
	end if;

	return false;

	EXCEPTION
		WHEN OTHERS THEN
			RAISE;
END;
$function$
;
