/**
 * Name: Obtiene todas las marcas de productos registradas
 * Creator: Francisco Díaz
 * Description: Obtiene todas las marcas de productos registradas en la BD
 * Create: 13-01-2024
 * Last Update: **-**-****
 * select * from get_brands();
 */

 CREATE OR REPLACE FUNCTION get_brands()
 RETURNS TABLE(
	"id" int,
  	"name" varchar,
  	"description" text,
  	"created_at" date,
  	"updated_at" date
 )
 LANGUAGE plpgsql
AS $function$
begin
	
	RETURN QUERY
		select 
			 bran.id, bran."name", bran.description, bran.created_at::date, bran.updated_at::date  
		from brand bran; 
	EXCEPTION
		WHEN OTHERS THEN
			RAISE;
END;
$function$
;