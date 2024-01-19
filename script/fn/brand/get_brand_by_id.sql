/**
 * Name: Obtiene una marca de producto identificada por el parametro "id"
 * Creator: Francisco Díaz
 * Description: Obtiene una marca de producto identificada por el parametro "id" de los registros de la BD
 * Create: 13-01-2024
 * Last Update: **-**-****
 * select * from get_brand_by_id();
 */

 CREATE OR REPLACE FUNCTION get_brand_by_id(p_bran_id int)
  RETURNS TABLE(
	id              int,
  	"name"          varchar,
  	"description"   text,
  	"created_at"    date,
  	"updated_at"    date
 )
 LANGUAGE plpgsql
AS $function$
begin

    if((select validate_exists_brand_id(p_bran_id)) is false)then
		raise 'El id de la marca ingresado no esta registrado';
	end if;
	
	RETURN QUERY
		select 
			 bran.id, bran."name", bran.description, bran.created_at::date, bran.updated_at::date  
		from brand bran where bran.id = p_bran_id; 
	EXCEPTION
		WHEN OTHERS THEN
			RAISE;
END;
$function$
;