/**
 * Name: Elimina un producto identificado por el parámetro "id"
 * Creator: Hesllar Linzmayer
 * Description: Elimina un producto identificado por el parámetro "id"
 * Create: 26-12-2023
 * Last Update: **-**-****
 * select * from delete_product_by_id(1);
 */

CREATE OR REPLACE FUNCTION delete_product_by_id(p_id int)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$

BEGIN
	
	delete from product p where p.id = p_id;

	return true;

	EXCEPTION
		WHEN OTHERS THEN
			RAISE;
END;
$function$
;
