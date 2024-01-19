/**
 * Name: Elimina una marca de producto identificada por el parámetro "id"
 * Creator: Francisco Díaz
 * Description: Elimina una marca de producto identificada por el parámetro "id" de los registros de la BD. 
 * Create: 13-01-2024
 * Last Update: **-**-****
 * select * from delete_brand_by_id(25);
 */

CREATE OR REPLACE FUNCTION delete_brand_by_id(p_bran_id int)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$

begin
	
	if((select validate_exists_brand_id(p_bran_id)) is false)then
		raise exception 'El id de la marca ingresado no esta registrado';
	end if;

	delete from brand bran where bran.id = p_bran_id;

	return true;

	EXCEPTION
		WHEN OTHERS THEN
			RAISE;
END;
$function$
;