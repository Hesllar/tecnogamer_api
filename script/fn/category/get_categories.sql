/**
 * Name: Obtiene todas las categorias de productos registradas
 * Creator: Francisco Díaz
 * Description: Obtiene todas las categorias de productos registradas en la BD
 * Create: 13-01-2024
 * Last Update: **-**-****
 * select * from get_categories();
 */

 CREATE OR REPLACE FUNCTION get_categories()
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
			 cat.id, cat."name", cat.description, cat.created_at::date, cat.updated_at::date  
		from category cat; 
	EXCEPTION
		WHEN OTHERS THEN
			RAISE;
END;
$function$
;