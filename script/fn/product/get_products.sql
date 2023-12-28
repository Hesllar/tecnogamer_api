/**
 * Name:Obtiene todos los productos registrados
 * Creator: Hesllar Linzmayer
 * Description: Obtiene todos los productos registrados
 * Create: 26-12-2023
 * Last Update: **-**-****
 * select * from get_products ();
 */


CREATE OR REPLACE FUNCTION get_products()
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
	


	RETURN QUERY
		select 
			 p.id, p."name", p.price, p.status, p.stock, p.category_id,
			 p.brand_id, p.created_at::date, p.updated_at::date, p.image_url, p.description  
		from product p; 
	EXCEPTION
		WHEN OTHERS THEN
			RAISE;
END;
$function$
;