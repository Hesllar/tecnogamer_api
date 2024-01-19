/**
 * Name: Registrar una nueva categoria
 * Creator: Francisco Díaz
 * Description: Registrar una nueva categoria de producto en la BD
 * Create: 14-01-2023
 * Last Update: **-**-****
 * select * from create_category('Teclados', 'Teclado Gamer', '');
 */


CREATE OR REPLACE FUNCTION create_category(
  	p_cat_name          varchar,
  	p_cat_description   text
)
 RETURNS TABLE(
 	id				  int,
 	"name"            varchar,
  	"description"     text,
    "created_at"      date
 )
 LANGUAGE plpgsql
AS $function$
declare
v_new_category category%ROWTYPE;
begin
	
	if((select validate_exists_category_name(cat_name)) is true)then
		raise exception 'El nombre de la categoria ingresada ya esta registrado';
	end if;
	
	insert into category("name", description, created_at)
	values (p_cat_name, p_cat_description, now()) returning * into v_new_category;

	RETURN QUERY
		SELECT 	v_new_category.id, v_new_category."name", v_new_category.description, v_new_category.created_at;
	EXCEPTION
		WHEN OTHERS THEN
			RAISE;
END;
$function$
;