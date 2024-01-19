/**
 * Name:Actualizar un producto identificado por el parámetro "id"
 * Creator: Hesllar Linzmayer
 * Description: Actualizar un producto identificado por el parámetro "id"
 * Create: 26-12-2023
 * Last Update: 09-01-2024
 * select * from update_product_by_id (1, 'AMD Ryzen 5 3900', '', 7180000, 'sin_stock', 30, 1, 1, 'https://image.com');
 */


CREATE OR REPLACE FUNCTION update_product_by_id(
	p_id 			int,
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
 	image_url		varchar,
 	updated_at		date
 )
 LANGUAGE plpgsql
AS $function$
begin
	
	if((select validate_exists_product_id(p_id)) is false)then
		raise exception 'El id del producto enviado no esta registrado';
	elsif((select validate_exists_brand_id(p_brand_id)) is false)then
		raise exception 'El id de la marca enviado no esta registrado';
	elsif((select validate_exists_category_id(p_category_id)) is false)then
		raise exception 'El id de la categoría enviado no esta registrado';
	elsif((select validate_exists_product_name_update(p_id, p_name)) is true)then
		raise exception 'El nombre del producto enviado, ya pertenece a otro producto';
	end if;
	
	update product p
	set
		"name" = 		p_name,
		description = 	p_description,
		price = 		p_price,
		status = 		p_status,
		stock = 		p_stock,
		category_id = 	p_category_id,
		brand_id = 		p_brand_id,
		image_url = 	p_image_url,
		updated_at = 	now()
		where p.id = p_id;

	RETURN QUERY
		SELECT 	p_id, p_name, p_description, p_price, p_status, p_stock, p_category_id, 
				p_brand_id, p_image_url, now()::date;
	EXCEPTION
		WHEN OTHERS THEN
			RAISE;
END;
$function$
;