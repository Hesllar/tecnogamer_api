/**
 * Name: Validar si el id de la categoría existe en la base de datos
 * Creator: Hesllar Linzmayer
 * Description: Validar si el id de la categoría existe en la base de datos
 * Create: 24-12-2023
 * Last Update: **-**-****
 * select * from validate_exists_category_id(1);
 */


CREATE OR REPLACE FUNCTION validate_exists_category_id(p_id int)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$

BEGIN
	
	if(exists(select c.id from category c where c.id = p_id))then 
		return true;
	end if;

	return false;

	EXCEPTION
		WHEN OTHERS THEN
			RAISE;
END;
$function$
;