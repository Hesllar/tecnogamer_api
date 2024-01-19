/**
 * Name:Obtiene un producto identificado por el parámetro "id"
 * Creator: Hesllar Linzmayer
 * Description: Obtiene un producto identificado por el parámetro "id"
 * Create: 26-12-2023
 * Last Update: 08-01-2024
 * select * from get_product_by_id(1);
 */


CREATE OR REPLACE FUNCTION get_product_by_id(p_id int)
 RETURNS TABLE(
 	id				int,
 	"name" 			varchar,
 	price 			int,
 	status			"product_status",
 	stock 			int,
 	category_id 	int,
 	brand_id 		int,
 	created_at		date,
 	updated_at		date,
 	image_url		varchar,
 	description		text
 )
 LANGUAGE plpgsql
AS $function$
begin
	
	if((select validate_exists_product_id(p_id)) is false)then
		raise 'El id del producto ingresado no esta registrado';
	end if;

	RETURN QUERY
		select 
			 p.id, p."name", p.price, p.status, p.stock, p.category_id,
			 p.brand_id, p.created_at::date, p.updated_at::date, p.image_url, p.description  
		from product p where p.id = p_id; 
	EXCEPTION
		WHEN OTHERS THEN
			RAISE;
END;
$function$
;

