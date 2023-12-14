/**
 * Name:Crear un usuario
 * Creator: Hesllar Linzmayer
 * Description: Crea un nuevo usuario en la base de datos
 * Create: 13-12-2023
 * Last Update: **-**-****
 * select * from create_user('hesllar2@gmail.com', 'hesllar', '123', '', 1);
 */


CREATE OR REPLACE FUNCTION create_user(
	p_email 		varchar,
	p_name 			varchar,
	p_password 		varchar,
	p_description 	text,
	p_role_user_id 	int
)
 RETURNS TABLE(
 	id 				int,
 	email 			varchar,
 	"name"			varchar,
 	description 	text,
 	role_user_id 	int,
 	created_at 		date
 )
 LANGUAGE plpgsql
AS $function$
declare
v_new_user "user"%ROWTYPE;
BEGIN
	
	
	if(exists(select u.email  from "user" u where u.email = p_email))then 
		raise exception  'El correo % ya esta registrado', p_email;
	elsif(not exists(select * from role_user ru where ru.id = p_role_user_id))then 
		raise exception  'El rol % no es valido', p_role_user_id;
	end if;
	
	insert into "user"(email, "name", "password", description, role_user_id)
	values(p_email, p_name, p_password, p_description, p_role_user_id)returning * into v_new_user;

	RETURN QUERY
		SELECT v_new_user.id, v_new_user.email, v_new_user."name", v_new_user.description, v_new_user.role_user_id, v_new_user.created_at::date ;
	EXCEPTION
		WHEN OTHERS THEN
			RAISE;
END;
$function$
;