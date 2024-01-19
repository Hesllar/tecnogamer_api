/**
 * Name: Actualiza el registro de una cmarca existente identificada por el parametro "id"
 * Creator: Francisco Díaz
 * Description: Actualiza el registro de una marca existente identificada por el parametro "id" en la BD
 * Create: 15-01-2023
 * Last Update: **-**-****
 * select * from update_brand_by_id(2, 'AMD', '', '');
 */


CREATE OR REPLACE FUNCTION update_brand_by_id(
    p_bran_id            int,
  	p_bran_name          varchar,
  	p_bran_description   text
)
 RETURNS TABLE(
 	id				  int,
 	"name"            varchar,
  	"description"     text,
    "updated_at"      date
 )
 LANGUAGE plpgsql
AS $function$
begin
	
	if((select validate_exists_brand_id(p_bran_id)) is false)then
		raise exception 'El id de la marca ingresada no esta registrado';
		elsif((select validate_exists_category_name(p_bran_name)) is true)then
		raise exception 'El nombre de la marca ingresado ya esta registrado';
	end if;
	
	update brand bran
    set
 	    "name" =         p_bran_name,
  	    "description" =  p_bran_description,
        "updated_at" =   now()
        where bran.id =  p_bran_id;

	RETURN QUERY
		SELECT 	p_bran_id, p_bran_name, p_bran_description, now()::date;
	EXCEPTION
		WHEN OTHERS THEN
			RAISE;
END;
$function$
;