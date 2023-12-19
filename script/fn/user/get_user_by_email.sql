/**
 * Name:Obtener usuario identificado por su correo
 * Creator: Hesllar Linzmayer
 * Description:Obtener usuario identificado por su correo
 * Create: 18-12-2023
 * Last Update: **-**-****
 * select * from get_user_by_email('hesllar2@gmail.com');
 */



CREATE OR REPLACE FUNCTION get_user_by_email(p_email varchar)
 RETURNS table(
 	id int,
 	email varchar,
 	"name" varchar,
 	"password" varchar,
 	description text,
 	role_user_id int,
 	created_at date,
 	updated_at date
 )
 LANGUAGE plpgsql
AS $function$

BEGIN
	
	

	return query
		select 
			u.id, u.email, u."name", u."password", 
			u.description, u.role_user_id, u.created_at::date, u.updated_at::date 
		from "user" u where u.email = p_email;
		

	EXCEPTION
		WHEN OTHERS THEN
			RAISE;
END;
$function$
;