/**
 * Name:Obtener listado de usuarios
 * Creator: Hesllar Linzmayer
 * Description: Obtener listado de usuarios
 * Create: 28-12-2023
 * Last Update: **-**-****
 * select * from get_users();
 */


CREATE OR REPLACE FUNCTION get_users()
 RETURNS TABLE(
 	id 				int,
 	email 			varchar,
 	"name" 			varchar,
 	description 	text,
 	role_user_id 	int,
 	created_at 		date,
 	updated_at 		date
 )
 LANGUAGE plpgsql
AS $function$
BEGIN
	
	

	RETURN QUERY
		select 
			u.id, u.email, u."name", u.description,
			u.role_user_id, u.created_at::date, u.updated_at::date  
		from "user" u;
	EXCEPTION
		WHEN OTHERS THEN
			RAISE;
END;
$function$
;

