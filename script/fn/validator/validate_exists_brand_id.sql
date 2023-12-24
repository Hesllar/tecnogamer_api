/**
 * Name: Validar si el id de la marca existe en la base de datos
 * Creator: Hesllar Linzmayer
 * Description: Validar si el id de la marca existe en la base de datos
 * Create: 24-12-2023
 * Last Update: **-**-****
 * select * from validate_exists_brand_id(1);
 */


CREATE OR REPLACE FUNCTION validate_exists_brand_id(p_id int)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$

BEGIN
	
	if(exists(select b.id from brand b where b.id = p_id))then 
		return true;
	end if;

	return false;

	EXCEPTION
		WHEN OTHERS THEN
			RAISE;
END;
$function$
;