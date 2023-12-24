/**
 * Name:Crear un producto
 * Creator: Hesllar Linzmayer
 * Description: Crea un nuevo registro de producto en la base de datos
 * Create: 22-12-2023
 * Last Update: **-**-****
 * select * from create_product ('Frac', '', 750, 'in_stock', 30, 3, 3, 'https://image.com');
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