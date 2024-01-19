/**
 * Name: Registrar una nueva cmarca
 * Creator: Francisco Díaz
 * Description: Registrar una nueva marca de producto en la BD
 * Create: 15-01-2023
 * Last Update: **-**-****
 * select * from create_brand('NVIDIA', '', '');
 */


CREATE OR REPLACE FUNCTION create_brand(
  	p_brand_name          varchar,
  	p_brand_description   text
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
v_new_brand brand%ROWTYPE;
begin
	
	if((select validate_exists_brand_name(p_brand_name)) is true)then
		raise exception 'El nombre de la marca ingresada ya esta registrado';
	end if;
	
	insert into brand("name", description, created_at)
	values (p_brand_name, p_brand_description, now()) returning * into v_new_brand;

	RETURN QUERY
		SELECT 	v_new_brand.id, v_new_brand."name", v_new_brand.description, v_new_brand.created_at::date;
	EXCEPTION
		WHEN OTHERS THEN
			RAISE;
END;
$function$
;