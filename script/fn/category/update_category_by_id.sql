/**
 * Name: Actualiza el registro de una categoria existente identificada por el parametro "id"
 * Creator: Francisco Díaz
 * Description: Actualiza el registro de una categoria existente identificada por el parametro "id" en la BD
 * Create: 14-01-2023
 * Last Update: **-**-****
 * select * from update_category_by_id(2, 'Teclados', 'Teclado Gamer', '');
 */


CREATE OR REPLACE FUNCTION update_category_by_id(
    p_cat_id            int,
  	p_cat_name          varchar,
  	p_cat_description   text
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
	
	if((select validate_exists_category_id(p_cat_id)) is false)then
		raise exception 'El id de la categoria ingresada no esta registrado';
		elsif((select validate_exists_category_name(p_cat_name)) is true)then
		raise exception 'El nombre de la categoria ingresado ya esta registrado';
	end if;
	
	update category cat
    set
 	    "name" =         p_cat_name,
  	    "description" =  p_cat_description,
        "updated_at" =   now()
        where cat.id =   p_cat_id;

	RETURN QUERY
		SELECT 	p_cat_id, p_cat_name, p_cat_description, now()::date;
	EXCEPTION
		WHEN OTHERS THEN
			RAISE;
END;
$function$
;