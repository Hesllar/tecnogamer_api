/**
 * Name: Elimina un producto identificado por el parámetro "id"
 * Creator: Hesllar Linzmayer
 * Description: Elimina un producto identificado por el parámetro "id"
 * Create: 26-12-2023
 * Last Update: 09-01-2024
 * select * from delete_product_by_id(1);
 */

CREATE OR REPLACE FUNCTION delete_product_by_id(p_id int)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$

begin
	
	if((select validate_exists_product_id(p_id)) is false)then
		raise exception 'El id del producto enviado no esta registrado';
	end if;

	delete from product p where p.id = p_id;

	return true;

	EXCEPTION
		WHEN OTHERS THEN
			RAISE;
END;
$function$
;
