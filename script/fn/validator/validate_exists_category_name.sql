/**
 * Name: Validar si el nombre de la categoria existe en la base de datos
 * Creator: Francisco Díaz
 * Description: Validar si el nombre de la categoria existe en la base de datos
 * Create: 17-01-2024
 * Last Update: **-**-****
 * select * from validate_exists_category_name('Procesadores');
 */


CREATE OR REPLACE FUNCTION validate_exists_category_name(cat_name varchar)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$

BEGIN
	
	if(exists(select cat."name" from category cat where lower(cat.name) = lower(cat_name)))then 
		return true;
	end if;

	return false;

	EXCEPTION
		WHEN OTHERS THEN
			RAISE;
END;
$function$
;