/**
 * Name: Crear un producto
 * Creator: Hesllar Linzmayer
 * Description: Crea un nuevo registro de producto en la base de datos
 * Create: 22-12-2023
 * Last Update: 08-01-2024
 * select * from create_product ('AMD Ryzen 5 3600', '', 230000, 'en_stock', 30, 1, 1, 'https://image.com');
 */


CREATE OR REPLACE FUNCTION create_product(
	p_name 			varchar,
	p_description	text,
	p_price 		int,
	p_status 		"product_status",
	p_stock			int,
	p_category_id	int,
	p_brand_id		int,
	p_image_url		varchar
)
 RETURNS TABLE(
 	id				int,
 	"name" 			varchar,
 	description		text,
 	price 			int,
 	status			"product_status",
 	stock 			int,
 	category_id 	int,
 	brand_id 		int,
 	image_url		varchar
 )
 LANGUAGE plpgsql
AS $function$
declare
v_new_product product%ROWTYPE;
begin
	
	if((select validate_exists_product_name(p_name)) is true)then
		raise exception 'El nombre del producto enviado ya esta registrado';
	elsif((select validate_exists_brand_id(p_brand_id)) is false)then
		raise exception 'La marca del producto enviado no esta registrado';
	elsif((select validate_exists_category_id(p_category_id)) is false)then
		raise exception 'La categoría del producto enviado no esta registrado';
	end if;
	
	insert into product("name", description, price, status, stock, category_id, brand_id, image_url)
	values (p_name, p_description, p_price, p_status, p_stock, p_category_id, p_brand_id, p_image_url) returning * into v_new_product;

	RETURN QUERY
		SELECT 	v_new_product.id, v_new_product."name", v_new_product.description, v_new_product.price, 
				v_new_product.status, v_new_product.stock, v_new_product.category_id, v_new_product.brand_id, v_new_product.image_url;
	EXCEPTION
		WHEN OTHERS THEN
			RAISE;
END;
$function$
;