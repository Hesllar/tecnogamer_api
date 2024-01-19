/**
 * Name: Obtiene una categoria identificada por su id
 * Creator: Francisco Díaz
 * Description: Obtiene una categoria de producto identificada por el parámetro "id" de los registros de la BD
 * Create: 13-01-2024
 * Last Update: **-**-****
 * select * from get_category_by_id(1);
 */

 CREATE OR REPLACE FUNCTION get_category_by_id(p_cat_id int)
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

    if((select validate_exists_category_id(p_cat_id)) is false)then
		raise 'El id de la categoria ingresado no esta registrado';
	end if;
	
	RETURN QUERY
		select 
			 cat.id, cat."name", cat.description, cat.created_at::date, cat.updated_at::date  
		from category cat where cat.id = p_cat_id; 
	EXCEPTION
		WHEN OTHERS THEN
			RAISE;
END;
$function$
;