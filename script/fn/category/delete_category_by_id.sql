/**
 * Name: Elimina una categoria de producto identificada por el parámetro "id"
 * Creator: Francisco Díaz
 * Description: Elimina una categoria de producto identificada por el parámetro "id" de los registros de la BD
 * Create: 13-01-2024
 * Last Update: **-**-****
 * select * from delete_category_by_id(13);
 */

CREATE OR REPLACE FUNCTION delete_category_by_id(cat_id int)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$

begin
	
	if((select validate_exists_category_id(cat_id)) is false)then
		raise exception 'El id de la categoria ingresado no esta registrado';
	end if;

	delete from category cat where cat.id = cat_id;

	return true;

	EXCEPTION
		WHEN OTHERS THEN
			RAISE;
END;
$function$
;