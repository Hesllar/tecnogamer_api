/**
 * Name:Crear un producto
 * Creator: Francisco Diaz
 * Description: Crea un nuevo registro de producto en la base de datos
 * Create: 13-12-2023
 * Last Update: **-**-****
 * select * from create_product ('Frac', 750, 'in_stock', 30, 3, 3);
 */


CREATE OR REPLACE FUNCTION create_product(
	p_name 			varchar,
	p_price 		int,
	p_status 		"product_status",
	p_stock			int,
	p_category_id	int,
	p_brand_id		int
)
 RETURNS TABLE(
 	id				int,
 	"name" 			varchar,
 	price 			int,
 	status			"product_status",
 	stock 			int,
 	category_id 	int,
 	brand_id 		int
 )
 LANGUAGE plpgsql
AS $function$
declare
v_new_product product%ROWTYPE;
begin
	
	if(exists(select p."name" from product p where p."name" = p_name)) then
		raise exception 'El nombre de producto % ya esta registrado', p_name;
	elsif(not exists(select cat.id from category cat where cat.id = p_category_id)) then
		raise exception 'La categoria ingresada no se encuentra registrada';
	elsif(not exists(select bra.id from brand bra where bra.id = p_brand_id)) then
		raise exception 'La marca ingresada no se encuentra registrada';
	end if;
	
	
	insert into product("name", price, status, stock, category_id, brand_id)
	values (p_name, p_price, p_status, p_stock, p_category_id, p_brand_id) returning * into v_new_product;

	RETURN QUERY
		SELECT v_new_product.id, v_new_product."name", v_new_product.price, v_new_product.status, v_new_product.stock, 
				v_new_product.category_id, v_new_product.brand_id;
	EXCEPTION
		WHEN OTHERS THEN
			RAISE;
END;
$function$
;